import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8084/graphql",
  documents: ["src/**/product/**/*.graphql", "src/**/product/**/*.gql"],
  generates: {
    "src/features/product/api/__generated__/client.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
      config: {
        fetcher: {
          func: "~/libs/graphql-fetcher#requestGraphQL",
        },
        withHooks: true,
      },
    },
  },
};

export default config;