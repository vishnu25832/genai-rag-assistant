export async function createEmbedding(text) {

    // FAKE embedding generator 
    // Converts text into numeric vector

    const arr = new Array(128).fill(0);

    for (let i = 0; i < text.length; i++) {
        arr[i % 128] += text.charCodeAt(i) / 1000;
    }

    return arr;
}