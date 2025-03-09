import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  BedrockResponse: a.customType({
    body: a.string(),
    error: a.string(),
  }),

  askPalmetto: a
    .query()
    .arguments({ question: a.string() })
    .returns(a.ref("BedrockResponse"))
    .authorization((allow) => [allow.authenticated()])
    .handler(
      a.handler.custom({
        entry: "./bedrock.js",
        dataSource: "bedrockDS",
        // You can add instructions for formatting here in the resolver configuration
        requestMapping: {
          template: {
            question: '$ctx.args.question',
            formatInstructions: `
              Please format your response with:
              - Clear paragraph breaks between sections
              - Bullet points for listing details
              - Numbers clearly highlighted
              - Section headers where appropriate
              - Any technical specifications in a structured format
            `
          }
        }
      })
    ),
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
