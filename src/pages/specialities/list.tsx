import React, { useState, useEffect } from "react";
import { useTranslate, CrudFilters } from "@pankod/refine-core";
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  Stack,
  EditButton,
  DeleteButton,
  ShowButton,
  IconButton,
  InputBase,
  Paper,
} from "@pankod/refine-mui";

import { List } from "components/crud/list";

import { IMedicalSpeciality } from "interfaces";

import { Search } from "@mui/icons-material";

export const SpecialityList: React.FC = () => {
  const t = useTranslate();

  const { dataGridProps, setFilters } = useDataGrid<IMedicalSpeciality>();

  const [nameSearch, setNameSearch] = useState<string>("");

  // const [selectClinics, setSelectClinics] = useState<number[]>([]);

  // const clinicsListQueryResult = useList<IClinic>({
  //   resource: "clinics",
  // });

  useEffect(() => {
    const filter: CrudFilters = [
      {
        field: "name",
        operator: "contains",
        value: nameSearch,
      },
    ];
    setFilters(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameSearch]);

  const columns = React.useMemo<GridColumns<IMedicalSpeciality>>(
    () => [
      {
        field: "id",
        headerName: t("medical_specialities.fields.id"),
        type: "number",
        width: 50,
      },
      {
        field: "name",
        headerName: t("medical_specialities.fields.name"),
        minWidth: 200,
        flex: 100,
      },
      {
        field: "description",
        headerName: t("medical_specialities.fields.description"),
        type: "number",
        headerAlign: "left",
        align: "left",
        minWidth: 250,
        flex: 250,
      },
      {
        field: "created_at",
        headerName: t("medical_specialities.fields.createdAt"),
        minWidth: 180,
        flex: 80,
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
              <ShowButton size="small" hideText recordItemId={row.id} />
              <EditButton size="small" hideText recordItemId={row.id} />
              <DeleteButton size="small" hideText recordItemId={row.id} />
            </Stack>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 120,
      },
    ],
    [t]
  );

  return (
    <Stack gap={1}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          width: 320,
        }}
      >
        <IconButton disabled type="button" sx={{ p: "10px" }} aria-label="menu">
          <Search />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Name"
          value={nameSearch}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setNameSearch(event.target.value);
          }}
          inputProps={{ "aria-label": "search name" }}
        />
      </Paper>
      <List>
        <DataGrid
          {...dataGridProps}
          filterModel={undefined}
          disableColumnFilter={true}
          columns={columns}
          autoHeight
        />
      </List>
    </Stack>
  );
};
