export function chunkText(text, size = 60, overlap = 15) {
    const words = text.split(" ");
    const chunks = [];

    for (let i = 0; i < words.length; i += size - overlap) {
        chunks.push(words.slice(i, i + size).join(" "));
    }

    return chunks;
}