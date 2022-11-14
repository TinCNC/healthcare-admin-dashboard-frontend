import React from "react";
import { useTranslate } from "@pankod/refine-core";
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  Stack,
  EditButton,
  DeleteButton,
} from "@pankod/refine-mui";

import { ICategory } from "interfaces";

export const CategoriesList: React.FC = () => {
  const t = useTranslate();

  const { dataGridProps } = useDataGrid<ICategory>();

  const columns = React.useMemo<GridColumns<ICategory>>(
    () => [
      {
        field: "id",
        headerName: t("categories.fields.id"),
        type: "number",
        width: 50,
      },
      {
        field: "title",
        headerName: t("categories.fields.title"),
        minWidth: 400,
        flex: 1,
      },
      {
        field: "actions",
        type: "actions",
        headerName: t("table.actions"),
        renderCell: function render({ row }) {
          return (
            <Stack direction="row" spacing={1}>
              <EditButton size="small" hideText recordItemId={row.id} />
              <DeleteButton size="small" hideText recordItemId={row.id} />
            </Stack>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [t]
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
