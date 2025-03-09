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
        .authorization([a.allow.public()])  // Changed authorization syntax
        .code('./functions/askPalmetto')    // Changed to use .code()
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
