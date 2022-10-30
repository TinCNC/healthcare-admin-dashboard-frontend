import React from "react";
import { useTranslate, useMany } from "@pankod/refine-core";
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  Stack,
  ShowButton,
  EditButton,
  DeleteButton,
} from "@pankod/refine-mui";

import { IPatient } from "interfaces";

export const PatientList: React.FC = () => {
  const t = useTranslate();

  const { dataGridProps } = useDataGrid<IPatient>();

  // const categoryIds = dataGridProps.rows.map((item) => item.category.id);
  // const { data: categoriesData, isLoading } = useMany<ICategory>({
  //   resource: "categories",
  //   ids: categoryIds,
  //   queryOptions: {
  //     enabled: categoryIds.length > 0,
  //   },
  // });

  const columns: GridColumns<IPatient> = [
    {
      field: "id",
      headerName: t("patients.fields.id"),
      type: "number",
      minWidth: 30,
      maxWidth: 30,
      flex: 1,
    },
    {
      field: "username",
      headerName: t("patients.fields.username"),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "first_name",
      headerName: t("patients.fields.firstName"),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "last_name",
      headerName: t("patients.fields.lastName"),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "created_at",
      headerName: t("patients.fields.createdAt"),
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        return new Date(row.created_at).toLocaleString();
      },
    },
    // {
    //   field: "updated_at",
    //   headerName: t("patients.fields.updatedAt"),
    //   minWidth: 400,
    //   flex: 1,
    //   renderCell: ({ row }) => {
    //     return new Date(row.created_at).toLocaleString();
    //   },
    // },
    {
      field: "actions",
      type: "actions",
      headerName: t("table.actions"),
      renderCell: function render({ row }) {
        return (
          <Stack direction="row" spacing={1}>
            <ShowButton hideText recordItemId={row.id} />
            <EditButton size="small" hideText recordItemId={row.id} />
            <DeleteButton size="small" hideText recordItemId={row.id} />
          </Stack>
        );
      },
      align: "center",
      headerAlign: "center",
      minWidth: 120,
      // flex: 1,
    },
  ];

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
