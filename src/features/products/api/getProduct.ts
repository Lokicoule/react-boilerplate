import { useQuery, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import client, { BaseException } from "~/libs/graphql-client";
import { Product } from "../types";

export type GetProductVariables = {
  id: string;
};

type GetProductResponse = {
  product: Product;
};

const GetProduct = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      code
      id
      createdAt
      label
      updatedAt
    }
  }
`;

export const getProduct = (variables: GetProductVariables): Promise<Product> =>
  client
    .request<GetProductResponse, GetProductVariables>(GetProduct, variables)
    .then((data) => data.product);

export const useGetProduct = (variables: GetProductVariables) => {
  const queryClient = useQueryClient();
  return useQuery<Product, BaseException>(
    ["product", variables],
    () => getProduct(variables),
    {
      enabled: !!variables.id,
      placeholderData: () => {
        return queryClient
          .getQueryData<Product[]>(["products"])
          ?.find((product) => product.id === variables.id);
      },
      useErrorBoundary: (error) => error.useBoundary,
    }
  );
};
