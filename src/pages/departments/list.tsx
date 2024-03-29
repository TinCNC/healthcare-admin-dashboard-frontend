import React from "react";
import { useTranslate } from "@refinedev/core";
import { useDataGrid, EditButton, DeleteButton } from "@refinedev/mui";
import { Stack } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";

import { List } from "components/crud/list";

import { IDepartment } from "interfaces";

export const DepartmentList: React.FC = () => {
  const t = useTranslate();

  const { dataGridProps } = useDataGrid<IDepartment>();

  const columns = React.useMemo<GridColumns<IDepartment>>(
    () => [
      {
        field: "id",
        headerName: t("departments.fields.id"),
        type: "number",
        width: 50,
      },
      {
        field: "name",
        headerName: t("departments.fields.name"),
        minWidth: 400,
        flex: 1,
      },
      {
        field: "description",
        headerName: t("departments.fields.description"),
        type: "number",
        headerAlign: "left",
        align: "left",
        minWidth: 250,
        flex: 0.5,
      },
      {
        field: "created_at",
        headerName: t("departments.fields.createdAt"),
        minWidth: 400,
        flex: 1,
        renderCell: ({ row }) => {
          return new Date(row.created_at).toLocaleString();
        },
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
