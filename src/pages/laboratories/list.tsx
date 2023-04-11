import React, { useState, useEffect } from "react";
import { useTranslate, CrudFilters } from "@refinedev/core";
import { useDataGrid, EditButton, DeleteButton, ShowButton } from "@refinedev/mui";
import { Stack, Divider, IconButton, InputBase, Paper } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";

import { List } from "components/crud/list";

import { ILaboratory } from "interfaces";

import { Search } from "@mui/icons-material";

export const LaboratoryList: React.FC = () => {
  const t = useTranslate();

  const { dataGridProps, setFilters } = useDataGrid<ILaboratory>();

  const [nameSearch, setNameSearch] = useState<string>("");

  const [addressSearch, setAddressSearch] = useState<string>("");

  const [phoneSearch, setPhoneSearch] = useState<string>("");

  const [emailSearch, setEmailSearch] = useState<string>("");

  // const [selectClinics, setSelectClinics] = useState<number[]>([]);

  // const clinicsListQueryResult = useList<IClinic>({
  //   resource: "clinics",
  // });

  useEffect(() => {
    // console.log(selectClinics);
    const filter: CrudFilters = [
      {
        field: "name",
        operator: "contains",
        value: nameSearch,
      },
      {
        field: "address",
        operator: "contains",
        value: addressSearch,
      },
      {
        field: "email",
        operator: "contains",
        value: emailSearch || null,
      },
      // {
      //   field: "address",
      //   operator: "contains",
      //   value: addressSearch,
      // },
      // {
      //   field: "type",
      //   operator: "eq",
      //   value: typeSearch,
      // },
    ];
    // if (typeSearch !== undefined && typeSearch.length !== 0) {
    //   filter.push({
    //     field: "type",
    //     operator: "eq",
    //     value: typeSearch,
    //   });
    // }
    setFilters(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameSearch, addressSearch, phoneSearch, emailSearch]);

  const columns = React.useMemo<GridColumns<ILaboratory>>(
    () => [
      {
        field: "id",
        headerName: t("laboratories.fields.id"),
        type: "number",
        width: 50,
      },
      {
        field: "name",
        headerName: t("laboratories.fields.name"),
        minWidth: 200,
        // flex: 100,
      },
      {
        field: "address",
        headerName: t("laboratories.fields.address"),
        type: "number",
        headerAlign: "left",
        align: "left",
        minWidth: 400,
        // flex: 150,
      },
      // {
      //   field: "phone",
      //   headerName: t("laboratories.fields.phone"),
      //   headerAlign: "left",
      //   align: "left",
      //   minWidth: 200,
      //   maxWidth: 200,
      // },
      {
        field: "email",
        headerName: t("laboratories.fields.email"),
        headerAlign: "left",
        align: "left",
        minWidth: 300,
        maxWidth: 300,
      },
      {
        field: "workload_capacity",
        headerName: t("laboratories.fields.workload_capacity"),
        headerAlign: "left",
        align: "left",
        minWidth: 150,
        maxWidth: 150,
      },
      {
        field: "created_at",
        headerName: t("laboratories.fields.createdAt"),
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
          // width: 960,
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
        <Divider
          sx={{
            color: "text.secondary",
            borderColor: "text.secondary",
          }}
          orientation="vertical"
          flexItem
        />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Address"
          value={addressSearch}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setAddressSearch(event.target.value);
          }}
          inputProps={{ "aria-label": "search address" }}
        />
        <Divider
          sx={{
            color: "text.secondary",
            borderColor: "text.secondary",
          }}
          orientation="vertical"
          flexItem
        />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Email"
          value={emailSearch}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setEmailSearch(event.target.value);
          }}
          inputProps={{ "aria-label": "search email" }}
        />
        {/* <Divider
          sx={{
            color: "text.secondary",
            borderColor: "text.secondary",
          }}
          orientation="vertical"
          flexItem
        />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Phone"
          value={phoneSearch}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setPhoneSearch(event.target.value);
          }}
          inputProps={{ "aria-label": "search phone" }}
        /> */}
        {/* <FormControl sx={{ minWidth: 320 }}>
          <Autocomplete
            sx={{ ml: 1, flex: 1 }}
            options={["University", "College"]}
            onChange={(event, value) => {
              setTypeSearch(value || "");
            }}
            value={typeSearch}
            isOptionEqualToValue={(option, value) =>
              value === undefined || option.toString() === value.toString()
            }
            renderInput={(params) => (
              <TextField
                {...params}
                // sx={{ width: "100px" }}
                placeholder={t("organizations.fields.type")}
                // margin="normal"
                variant="standard"
              />
            )}
          />
        </FormControl> */}
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
