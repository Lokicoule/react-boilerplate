import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  IconButton,
  Stack,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useMemo } from "react";
import { Menu, MenuItem, MenuList } from "~/components/Elements/Menuv2";
import { Table, TableColumn } from "~/components/Tablev2/Table";
import { TableWrapper } from "~/components/Tablev2/TableWrapper";
import dateFormat from "../../../utils/dateFormat";
import { useGetProducts } from "../api/getProducts";
import { Product } from "../types";
import { DeleteProduct } from "./DeleteProduct";
import { UpdateProduct } from "./UpdateProduct";

const MobileActionsButtons = ({ entry }: { entry: Product }) => {
  return (
    <Menu
      triggerButton={
        <Tooltip title={"test"}>
          <IconButton size="medium">
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      }
    >
      {() => (
        <MenuList>
          <MenuItem>
            <UpdateProduct productId={entry.id} />
          </MenuItem>
          <MenuItem>
            <DeleteProduct product={entry} />
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  );
};

const DesktopActionsButtons = ({ entry }: { entry: Product }) => {
  return (
    <Stack flexDirection={"row"} justifyContent={"space-evenly"}>
      <UpdateProduct productId={entry.id} />
      <DeleteProduct product={entry} />
    </Stack>
  );
};

const ResponsiveActionsButtons = ({ entry }: { entry: Product }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return isDesktop ? (
    <DesktopActionsButtons entry={entry} />
  ) : (
    <MobileActionsButtons entry={entry} />
  );
};

export const ProductsList = () => {
  const getProductsQuery = useGetProducts({});

  console.info("ProductsList render");
  console.info(getProductsQuery);

  const columns: TableColumn<Product>[] = useMemo(
    () => [
      {
        title: "Code",
        field: "code",
        options: {
          mobile: true,
        },
      },
      {
        title: "Label",
        field: "label",
        options: {
          mobile: true,
        },
      },
      {
        title: "Created at",
        field: "createdAt",
        Cell: ({ entry }) => <span>{dateFormat(entry.createdAt)}</span>,
        options: {
          mobile: false,
        },
      },
      {
        title: "Updated at",
        field: "updatedAt",
        Cell: ({ entry }) => <span>{dateFormat(entry.updatedAt)}</span>,
        options: {
          mobile: false,
        },
      },
      {
        title: "",
        field: "id",
        Cell: ({ entry }) => <ResponsiveActionsButtons entry={entry} />,
        options: {
          mobile: true,
        },
      },
    ],
    []
  );

  return (
    <TableWrapper<Product>
      data={getProductsQuery.data}
      columns={columns}
      pagination
    />
  );
};