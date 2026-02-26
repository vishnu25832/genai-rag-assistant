import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

console.log("Using API KEY:", process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
});

export async function callLLM(prompt) {
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return {
            reply: text,
            tokensUsed: 0,
        };
    } catch (error) {
        console.log("⚠️ Gemini quota or API error:", error.message);

        // ❌ Return null so RAG fallback triggers
        return {
            reply: null,
            tokensUsed: 0,
        };
    }
}
