import React from "react";
import { useTranslate, useMany } from "@pankod/refine-core";
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  Stack,
  EditButton,
  DeleteButton,
} from "@pankod/refine-mui";

import { IClinic } from "interfaces";

export const ClinicList: React.FC = () => {
  const t = useTranslate();

  const { dataGridProps } = useDataGrid<IClinic>();

  // const categoryIds = dataGridProps.rows.map((item) => item.category.id);
  // const { data: categoriesData, isLoading } = useMany<ICategory>({
  //   resource: "categories",
  //   ids: categoryIds,
  //   queryOptions: {
  //     enabled: categoryIds.length > 0,
  //   },
  // });

  const columns: GridColumns<IClinic> = [
    {
      field: "id",
      headerName: t("clinics.fields.id"),
      type: "number",
      width: 50,
    },
    {
      field: "name",
      headerName: t("clinics.fields.name"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "address",
      headerName: t("clinics.fields.address"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "capacity",
      headerName: t("clinics.fields.capacity"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "created_at",
      headerName: t("clinics.fields.createdAt"),
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
  ];

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
