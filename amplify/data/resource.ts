import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
    BedrockResponse: a.customType({
        body: a.string(),
        error: a.string()
    }),

    askPalmetto: a
        .query()
        .arguments({
            question: a.string().required()
        })
        .returns(a.ref('BedrockResponse'))
        .authorization((allow) => [
            allow.publicApiKey()  // Changed from public() to publicApiKey()
        ])
        .handler(a.handler.custom({  // Changed from function() to handler()
            entry: "functions/askPalmetto/index.js",
            dataSource: "bedrockDS"
        }))
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: "apiKey",
        apiKeyAuthorizationMode: {
            expiresInDays: 30
        }
    }
});
