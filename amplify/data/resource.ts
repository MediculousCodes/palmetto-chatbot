import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
    BedrockResponse: a.customType({
        body: a.string().required(),
        error: a.string().nullable(),
    }),

    askPalmetto: a
        .query()
        .arguments({ question: a.string().required() })
        .returns(a.ref('BedrockResponse'))
        .authorization([])
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
