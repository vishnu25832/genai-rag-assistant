import fs from "fs";
import { createEmbedding } from "./embeddingService.js";
import { cosineSimilarity } from "../utils/vectorMath.js";
import { buildPrompt } from "../utils/promptBuilder.js";
import { callLLM } from "./llmService.js";

// Load vector store once
const VECTOR_DB = JSON.parse(
    fs.readFileSync("./data/vector_store.json", "utf-8")
);

export async function runRAG(question) {
    try {
        const queryEmbedding = await createEmbedding(question);

        const q = question.toLowerCase();

        const scored = VECTOR_DB.map((doc) => {
            let score = cosineSimilarity(queryEmbedding, doc.embedding);
            const title = doc.title.toLowerCase();

            // 🔥 ULTRA PRO INTENT BOOST (FIXES YOUR BUG)
            if (q.includes("password") && title.includes("password")) score += 0.5;

            if (
                (q.includes("delete") || q.includes("remove")) &&
                (title.includes("delete") || title.includes("deletion"))
            ) score += 0.5;

            if (q.includes("refund") && title.includes("refund")) score += 0.5;

            if (q.includes("subscription") && title.includes("subscription")) score += 0.5;

            return { ...doc, score };
        });

        scored.sort((a, b) => b.score - a.score);

        const TOP_MATCHES = scored.slice(0, 3);

        console.log(
            "Top Matches:",
            TOP_MATCHES.map((m) => ({
                title: m.title,
                score: m.score.toFixed(3),
            }))
        );

        const best = TOP_MATCHES[0];

        // 🚨 STRONG BUT SAFE THRESHOLD
        if (!best || best.score < 0.45) {
            return {
                reply: "I don't have enough information.",
                retrievedChunks: 0,
            };
        }

        const prompt = buildPrompt(TOP_MATCHES, question);
        const llmResponse = await callLLM(prompt);

        // ⚠️ If Gemini fails → LOCAL RAG
        if (!llmResponse.reply) {
            console.log("⚠️ Gemini quota hit — using Local RAG answer");

            return {
                reply: best.content,
                retrievedChunks: TOP_MATCHES.length,
            };
        }

        return {
            reply: llmResponse.reply,
            retrievedChunks: TOP_MATCHES.length,
        };
    } catch (err) {
        console.error("RAG ERROR:", err.message);

        return {
            reply: "I don't have enough information.",
            retrievedChunks: 0,
        };
    }
}