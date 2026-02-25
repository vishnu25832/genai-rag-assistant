import fs from "fs";
import { createEmbedding } from "../services/embeddingService.js";
import { findRelevantChunks } from "../utils/vectorMath.js";

async function test() {

    const vectorStore = JSON.parse(
        fs.readFileSync("./data/vector_store.json", "utf-8")
    );

    const query = "How do I reset my password?";

    const queryEmbedding = await createEmbedding(query);

    const results = findRelevantChunks(queryEmbedding, vectorStore);

    console.log("Top Results:");
    console.log(results);
}

test();