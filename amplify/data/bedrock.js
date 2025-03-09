exports.handler = async (event) => {
    try {
        const question = event.arguments.question;

        const formattedQuestion = `
Please provide a well-structured response with:
- Clear paragraph breaks
- Bullet points for lists
- Numbers and statistics clearly highlighted
- Section headers where relevant

Question: ${question}`;

        return {
            body: formattedQuestion,
            error: null
        };
    } catch (error) {
        return {
            body: null,
            error: error.message
        };
    }
};
