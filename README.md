
# 🧠 AI Tools Radar Chatbot

## Overview

Welcome to the **AI Tools Radar Chatbot**, a RAG-powered assistant focused on the latest developments in the LLM ecosystem. This chatbot delivers insights on frameworks like LangChain, LlamaIndex, prompt engineering techniques, vector databases, and tooling updates — using live scraped sources from top blogs and documentation.

It leverages **Retriever-Augmented Generation (RAG)** with **LangChain.js**, **Next.js**, **OpenAI**, and **DataStax Astra DB**, all deployable via **Vercel**.

---

## 🔑 Key Features

- **Live Knowledge Retrieval**: Scrapes trusted AI tool blogs like LangChain, Prompting Guide, and LlamaIndex to stay ahead of GPT’s knowledge cutoff.
- **RAG Architecture**: Combines scraped context with GPT for accurate, recent, and context-aware answers.
- **Vector Search**: Efficiently retrieves info via Astra DB using OpenAI embeddings.
- **Plug-and-Play**: Easy to swap out content domains with just a URL list change.

---

## 📚 Table of Contents

1. [Prerequisites](#prerequisites)  
2. [Tech Stack](#tech-stack)  
3. [Installation](#installation)  
4. [Usage](#usage)  
5. [Features Explained](#features-explained)  
6. [Folder Structure](#folder-structure)  
7. [Deployment](#deployment)  
8. [Credits](#credits)  

---

## ✅ Prerequisites

- Node.js (latest recommended)
- OpenAI API Key → [Get one](https://openai.com/)
- Astra DB account → [Register here](https://www.datastax.com/astra)
- Basic familiarity with React / Next.js

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, JavaScript  
- **Backend**: Node.js  
- **AI Integration**: OpenAI + LangChain.js  
- **Vector DB**: DataStax Astra  
- **Scraping**: Puppeteer  
- **Deployment**: Vercel  

---

## 🚀 Installation

### Clone the repo

```bash
git clone https://github.com/yourusername/ai-tools-radar-chatbot.git
cd ai-tools-radar-chatbot
```

### Install dependencies

```bash
npm install
```

### Set environment variables

Create a `.env` file:

```env
ASTRA_DB_API_ENDPOINT=<Your Astra DB API Endpoint>
ASTRA_DB_APPLICATION_TOKEN=<Your Astra Application Token>
ASTRA_DB_NAMESPACE=default
ASTRA_DB_COLLECTION=AIToolsRadar
OPENAI_API_KEY=<Your OpenAI API Key>
```

### Scrape and seed the database

```bash
npm run seed
```

### Start the dev server

```bash
npm run dev
```

Access the app at `http://localhost:3000`

---

## 💬 Usage

- Type a custom question or choose a suggested prompt.
- The chatbot retrieves relevant info from scraped blog articles and returns a context-rich response.
- Great for comparing tools, understanding new features, or learning best practices.

---

## 🔍 Features Explained

### ✅ What is RAG?

Retriever-Augmented Generation lets the model pull in **real-world content** at runtime, instead of relying solely on GPT’s training data.

### ✅ What Kind of Sources?

The bot scrapes:

- [Prompting Guide](https://www.promptingguide.ai/introduction)  
- [LangChain Blog](https://blog.langchain.dev/)  
- [LlamaIndex Blog](https://llamaindex.ai/blog)  
- [Latent Space](https://www.latent.space/)  
- [Mihail Eric’s LLM Blog](https://www.mihaileric.com/posts/llm-developer-tools/)

### ✅ How It Retrieves Content

- Uses Puppeteer to scrape latest blog content
- Splits and embeds content with OpenAI
- Stores and retrieves from Astra DB using vector similarity

---

## 📁 Folder Structure

```
ai-tools-radar-chatbot/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js routing
│   ├── components/     # Chat UI components
│   ├── scripts/        # Scraping and seeding logic
│   └── styles/         # Global CSS
├── .env                # Secrets and keys
├── package.json        # Project setup
└── README.md           # Project documentation
```

---

## 🌐 Deployment

Deploy to **Vercel**:

1. Push your repo to GitHub  
2. Connect it to Vercel  
3. Add the same environment variables in the Vercel dashboard  
4. Deploy and share the link in your portfolio

---

## 🙏 Credits

Originally inspired by a course by **Ana Kubo** and sponsored by **DataStax**.  
Built on top of “Build and Deploy a RAG Chatbot with JavaScript, LangChain.js, Vercel, OpenAI.”  

---
