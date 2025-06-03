import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { DataAPIClient } from "@datastax/astra-db-ts";
// import { openai2 } from '@ai-sdk/openai';

const {
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
  OPENAI_API_KEY,
} = process.env;

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT, { namespace: ASTRA_DB_NAMESPACE });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const latestMessage = messages[messages?.length - 1]?.content;

    let docContext = "";

    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: latestMessage,
      encoding_format: "float",
    });

    try {
      const collection = await db.collection(ASTRA_DB_COLLECTION);
      const cursor = collection.find(null, {
        sort: {
          $vector: embedding.data[0].embedding,
        },
        limit: 10,
      });

      const documents = await cursor.toArray();

      const docsMap = documents?.map((doc) => doc.text);

      docContext = JSON.stringify(docsMap);
    } catch  {
      return new Response("Internal server error collection", { status: 500 });
    }

  const template = {
  role: "system",
  content: `
    You are an AI assistant focused on cutting-edge tools and practices in the LLM and GenAI ecosystem.
    
    Use the following context to enhance your answers with the most recent and authoritative information from blogs, tool documentation, and developer updates. This context may include details about LangChain, LlamaIndex, prompt engineering techniques, vector databases, embeddings, and LLM application patterns.

    If the context does not contain the exact answer, respond based on your general knowledge — but do not mention anything about context availability or source limitations.

    Your tone should be confident, concise, and technically insightful.
    Focus on delivering:
    - Recent developments (from 2024 or 2025)
    - Known issues or limitations in tools
    - Tactical advice (code, workflows, APIs)
    - Comparisons between tools (e.g., LangChain vs LlamaIndex)

    Format code in Markdown and avoid returning images.

    ---------------------
    START CONTEXT
    ${docContext}
    END CONTEXT
    ---------------------
    QUESTION: ${latestMessage}
    ---------------------
  `,
};



    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [template, ...messages],
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
    // return new streamText.toDataStreamResponse(stream);
  } catch {
    return new Response("Internal server error embedding", { status: 500 });
  }
}
