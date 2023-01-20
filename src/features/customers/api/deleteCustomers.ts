import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useTranslation } from "react-i18next";
import client, { BaseException } from "~/libs/graphql-client";
import { notify } from "~/libs/notify";
import { Customer } from "../types";

export type DeleteCustomersVariables = {
  ids: string[];
};

type DeleteCustomersResponse = {
  deleteCustomers: Customer;
};

const DeleteCustomers = gql`
  mutation RemoveCustomers($ids: [String!]!) {
    removeCustomers(ids: $ids)
  }
`;

const deleteCustomers = (variables: DeleteCustomersVariables) =>
  client
    .request<DeleteCustomersResponse, DeleteCustomersVariables>(
      DeleteCustomers,
      variables
    )
    .then((data) => data.deleteCustomers);

export const useDeleteCustomers = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(["customers", "common"]);

  return useMutation<Customer, BaseException, DeleteCustomersVariables>(
    deleteCustomers,
    {
      onSuccess: (data, variables) => {
        notify.success({
          title: t("common:dictionary.customers"),
          message: t("customers:@deleteCustomers.notification.success"),
        });
        queryClient.invalidateQueries(["customers"]);
      },
    }
  );
};
