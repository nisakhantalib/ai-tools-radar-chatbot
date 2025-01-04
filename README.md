# F1 GPT RAG Chatbot

## Overview

Welcome to the **F1 GPT RAG Chatbot**, a generative AI-powered chatbot designed to provide the most up-to-date information about Formula 1. This chatbot integrates **Retriever-Augmented Generation (RAG)**, **LangChain.js**, **Next.js**, **OpenAI**, **DataStax Astra Vector Database**, and **Vercel** to create a conversational assistant that is tailored to your data.

### Key Features
- **Custom Data Integration**: Scrapes the web for the latest Formula 1 data, transforming it into vector embeddings.
- **Retriever-Augmented Generation (RAG)**: Combines scraped context with OpenAI's GPT-4 to provide accurate, human-like responses.
- **Scalability**: Built with Next.js and deployable to Vercel for production-ready applications.
- **Vector Database**: Stores embeddings in DataStax Astra DB for efficient retrieval.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Features Explained](#features-explained)
6. [Folder Structure](#folder-structure)
7. [Deployment](#deployment)
8. [Credits](#credits)

---

## Prerequisites
Before setting up the project, ensure you have the following:
- **Node.js (Latest Version)**: Check and update with `node -v`.
- **OpenAI API Key**: Sign up at [OpenAI](https://openai.com) and generate an API key.
- **DataStax Astra DB Account**: Register [here](https://www.datastax.com/astra).
- **Basic Knowledge of Next.js**: The project uses server-side rendering and React.

---

## Tech Stack
- **Frontend**: Next.js, TypeScript
- **Backend**: Node.js
- **AI Integration**: LangChain.js, OpenAI API
- **Database**: DataStax Astra DB
- **Deployment**: Vercel
- **Scraping**: Puppeteer

---

## Installation
Follow these steps to set up the project locally:

### Clone the Repository
```bash
git clone https://github.com/yourusername/f1-gpt-chatbot.git
cd f1-gpt-chatbot
```

### Install Dependencies
```bash
npm install
```

### Set Up Environment Variables
Create a `.env` file in the project root:
```env
ASTRA_DB_API_ENDPOINT=<Your Astra DB API Endpoint>
ASTRA_DB_APPLICATION_TOKEN=<Your Astra Application Token>
ASTRA_DB_NAMESPACE=default
ASTRA_DB_COLLECTION=F1GPT
OPENAI_API_KEY=<Your OpenAI API Key>
```

### Seed the Database
Populate the database with scraped data:
```bash
npm run seed
```

### Start the Development Server
```bash
npm run dev
```
Access the application at `http://localhost:3000`.  

Or, we can do


```bash
# Steps to Set Up and Run the Project

npm install 
npm install react@18 react-dom@18 --legacy-peer-deps
npm audit fix 
npm i puppeteer 
npm fund 
npm run seed        
npm run dev
```
---

## Usage
1. Open the chatbot application.
2. Use pre-defined prompts or type custom questions about Formula 1.
3. The chatbot retrieves the latest context and provides precise answers.

---

## Features Explained

### What is RAG (Retriever-Augmented Generation)?
RAG enhances large language models by providing additional context alongside user queries. This makes responses more accurate and up-to-date without retraining the model.

### Vector Embeddings
Web content is broken into smaller chunks, transformed into vector embeddings using OpenAI, and stored in Astra DB for efficient retrieval.

### Database
The vector database supports similarity search, helping retrieve relevant information quickly.

### Scraping
Web scraping is achieved using Puppeteer to collect up-to-date Formula 1 data from reliable sources.

---

## Folder Structure
```
f1-gpt-chatbot/
├── public/             # Static assets (e.g., images)
├── src/
│   ├── app/            # Next.js application structure
│   ├── components/     # Reusable React components
│   ├── scripts/        # Scripts for scraping and seeding the database
│   └── styles/         # CSS files
├── .env                # Environment variables
├── package.json        # Dependencies and scripts
└── README.md           # Project documentation
```

---

## Deployment
The app is deployable on **Vercel**:
1. Push your repository to GitHub.
2. Connect your GitHub repo to Vercel.
3. Add environment variables in Vercel settings.
4. Deploy the application.

---

## Credits  

This project is based on a course by **Ana Kubo** and sponsored by **DataStax**.
Based on this course "Build and Deploy a RAG Chatbot with JavaScript, LangChain.js, Next.js, Vercel, OpenAI"  
https://www.youtube.com/watch?v=d-VKYF4Zow0

---


