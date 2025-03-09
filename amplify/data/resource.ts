import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
    BedrockResponse: a.customType({
        body: a.string().required(),
        error: a.string(), // Remove .nullable()
    }),

    askPalmetto: a
        .query()
        .arguments({ question: a.string().required() })
        .returns(a.ref('BedrockResponse'))
        .authorization((allow) => [
            allow.publicApiKey(), // Use publicApiKey instead of empty array
        ])
        .handler(a.handler.custom({
            entry: "bedrock.js",
            dataSource: "bedrockDS"
        })),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: "apiKey",
        apiKeyAuthorizationMode: {
            expiresInDays: 30,
        },
    },
});
