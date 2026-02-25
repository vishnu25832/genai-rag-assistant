export function buildPrompt(TOP_MATCHES, question) {
    const bestContext =
        TOP_MATCHES.length > 0 ? TOP_MATCHES[0].content : "";

    return `
You are a grounded AI assistant.

Rules:
- Answer ONLY using the provided context.
- Give SHORT and DIRECT answer.
- Never include unrelated policies.
- If answer not present say:
"I don't have enough information."

CONTEXT:
${bestContext}

USER QUESTION:
${question}
`;
}