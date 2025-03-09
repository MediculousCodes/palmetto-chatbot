export function request(ctx) {
    // Extract the question from the arguments
    const { question = "" } = ctx.args;

    // Add formatting instructions to the question
    const formattedQuestion = `
Please provide a well-structured response with:
- Clear paragraph breaks
- Bullet points for lists
- Numbers and statistics clearly highlighted
- Section headers where relevant

Question: ${question}`;

    return {
        resourcePath: `/agent-runtime/retrieve-and-generate`,
        method: "POST",
        params: {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                input: {
                    text: formattedQuestion
                },
                retrieveAndGenerateConfiguration: {
                    type: "KNOWLEDGE_BASE",
                    knowledgeBaseConfiguration: {
                        knowledgeBaseId: "palmetto-docs-2",
                        modelArn: "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3.5-sonnet-v2"
                    }
                }
            })
        }
    };
}

export function response(ctx) {
    try {
        const parsedBody = JSON.parse(ctx.result.body);
        return {
            body: parsedBody.output.text,
            error: null
        };
    } catch (error) {
        return {
            body: null,
            error: `Error processing response: ${error.message}`
        };
    }
}
