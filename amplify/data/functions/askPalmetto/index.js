exports.handler = async (event) => {
    try {
        const question = event.arguments.question;

        return {
            body: `Received question: ${question}`,
            error: null
        };
    } catch (error) {
        return {
            body: null,
            error: error.message
        };
    }
};
