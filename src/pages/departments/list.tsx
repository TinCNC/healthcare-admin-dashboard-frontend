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

import { IDepartment } from "interfaces";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  // regular,
  // brands,
  // icon,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

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
    <List
      title={
        <React.Fragment>
          <FontAwesomeIcon icon={solid("sitemap")} />
          &nbsp;{t("departments.titles.list")}
        </React.Fragment>
      }
    >
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
