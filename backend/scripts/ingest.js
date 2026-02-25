import fs from "fs";
import { chunkText } from "../utils/chunker.js";
import { createEmbedding } from "../services/embeddingService.js";

async function ingest() {

    const docs = JSON.parse(
        fs.readFileSync("./data/docs.json")
    );

    const vectorStore = [];

    for (const doc of docs) {

        const chunks = chunkText(doc.content);

        for (const chunk of chunks) {

            console.log("Embedding:", chunk);

            const embedding = await createEmbedding(chunk);

            vectorStore.push({
                title: doc.title,
                content: chunk,
                embedding
            });
        }
    }

    fs.writeFileSync(
        "./data/vector_store.json",
        JSON.stringify(vectorStore, null, 2)
    );

    console.log("✅ vector_store.json created");
}

ingest();