import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8081/graphql",
  documents: ["src/**/user/**/*.graphql", "src/**/user/**/*.gql"],
  generates: {
    "src/features/user/graphql/user.client.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
      config: {
        fetcher: {
          func: "../../../libs/graphql-fetcher#fetchData",
        },
        withHooks: true,
      },
    },
  },
};

export default config;
