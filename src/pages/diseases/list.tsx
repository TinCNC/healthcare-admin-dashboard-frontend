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

import { IDisease } from "interfaces";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

export const DiseaseList: React.FC = () => {
  const t = useTranslate();

  const { dataGridProps } = useDataGrid<IDisease>();

  // const categoryIds = dataGridProps.rows.map((item) => item.category.id);
  // const { data: categoriesData, isLoading } = useMany<ICategory>({
  //   resource: "categories",
  //   ids: categoryIds,
  //   queryOptions: {
  //     enabled: categoryIds.length > 0,
  //   },
  // });

  const columns: GridColumns<IDisease> = [
    {
      field: "id",
      headerName: t("diseases.fields.id"),
      type: "number",
      width: 50,
    },
    {
      field: "name",
      headerName: t("diseases.fields.name"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "classification",
      headerName: t("diseases.fields.classification"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "severity",
      headerName: t("diseases.fields.severity"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "createdAt",
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
      renderCell: ({ row }) => {
        return (
          <Stack direction="row" spacing={1}>
            <ShowButton size="small" hideText recordItemId={row.id} />
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
    <List
      title={
        <React.Fragment>
          <FontAwesomeIcon icon={solid("disease")} />
          &nbsp;{t("diseases.titles.list")}
        </React.Fragment>
      }
    >
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
