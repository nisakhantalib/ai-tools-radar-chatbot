import { DataAPIClient } from "@datastax/astra-db-ts";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import OpenAI from "openai";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import "dotenv/config";

type SimilarityMetric = "dot_product" | "cosine" | "euclidean";

// set up environment variables
const {
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
  OPENAI_API_KEY,
} = process.env;

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// define which website to scrape
const aiData = [
      "https://www.promptingguide.ai/introduction",
  "https://blog.langchain.dev/",
  "https://llamaindex.ai/blog",
  "https://www.latent.space/",
  "https://www.mihaileric.com/posts/llm-developer-tools/"
]

// Comment: Not conforming to TS strictness
const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT, { namespace: ASTRA_DB_NAMESPACE });

// set splitter + options
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 512,
  chunkOverlap: 100,
});

// create collection on datastrax from datastax API
const createCollection = async (
  similarityMetric: SimilarityMetric = "dot_product"
) => {
  try {
    const res = await db.createCollection(ASTRA_DB_COLLECTION, {
      vector: {
        dimension: 1536,
        metric: similarityMetric,
      },
    });
    console.log("Collection created successfully:", res);
  } catch (error: any) {
    if (error.message && error.message.includes('already exists')) {
      console.log(`Collection '${ASTRA_DB_COLLECTION}' already exists, skipping creation...`);
    } else {
      console.error("Error creating collection:", error);
      throw error;
    }
  }
};

// load sample data into collection
const loadSampleData = async () => {
  const collection = await db.collection(ASTRA_DB_COLLECTION);
  
  // Check if collection already has data
  const existingDocs = await collection.find({}, { limit: 1 }).toArray();
  if (existingDocs.length > 0) {
    console.log("Collection already contains data. Skipping data loading...");
    console.log("If you want to reload data, please clear the collection first.");
    return;
  }
  
  console.log("Starting to load sample data...");
  
  for await (const url of aiData) {
    try {
      console.log(`Scraping: ${url}`);
      const content = await scrapePage(url);
      const chunks = await splitter.splitText(content);
      
      console.log(`Processing ${chunks.length} chunks from ${url}`);
      
      for await (const chunk of chunks) {
        const embedding = await openai.embeddings.create({
          model: "text-embedding-3-small",
          input: chunk,
          encoding_format: "float",
        });

        const vector = embedding.data[0].embedding;

        const res = await collection.insertOne({
          $vector: vector,
          text: chunk,
          source: url,  // Added source tracking
        });

        console.log(`Inserted chunk: ${res.insertedId}`);
      }
    } catch (error) {
      console.error(`Error processing ${url}:`, error);
      // Continue with next URL instead of failing completely
      continue;
    }
  }
  
  console.log("Data loading completed!");
};

// scrape webpage
const scrapePage = async (url: string) => {
  const loader = new PuppeteerWebBaseLoader(url, {
    launchOptions: {
      headless: true,
    },
    gotoOptions: {
      waitUntil: "domcontentloaded",
    },
    evaluate: async (page, browser) => {
      const result = await page.evaluate(() => document.body.innerHTML);
      await browser.close();
      return result;
    },
  });
  return ( await loader.scrape())?.replace(/<[^>]*>?/gm, "");
};

// Main execution
const main = async () => {
  try {
    await createCollection();
    await loadSampleData();
    console.log("Script completed successfully!");
  } catch (error) {
    console.error("Script failed:", error);
    process.exit(1);
  }
};

main();