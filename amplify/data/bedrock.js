// amplify/data/bedrock.js
exports.handler = async (event) => {
    try {
        // Extract the question from the event arguments
        const question = event.arguments.question;

        // For now, just echo back the question to test the resolver
        return {
            body: question,
            error: null
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            body: null,
            error: error.message
        };
    }
};
