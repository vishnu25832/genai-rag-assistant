import fs from "fs";
import { createEmbedding } from "../services/embeddingService.js";
import { findRelevantChunks } from "../utils/vectorMath.js";
import { buildPrompt } from "../services/ragService.js";
import { callLLM } from "../services/llmService.js";

async function run() {

    const vectorStore = JSON.parse(
        fs.readFileSync("./data/vector_store.json", "utf-8")
    );

    const question = "How can I reset my password?";

    const queryEmbedding = await createEmbedding(question);

    const retrieved = findRelevantChunks(queryEmbedding, vectorStore);

    const prompt = buildPrompt(retrieved, question);

    const reply = await callLLM(prompt);

    console.log("AI Reply:");
    console.log(reply);
}

run();