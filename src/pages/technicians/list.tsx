import React, { useState, useEffect } from "react";
import { useTranslate, CrudFilters } from "@refinedev/core";
import { useDataGrid, ShowButton, EditButton, DeleteButton } from "@refinedev/mui";
import { Stack, Divider, Paper, InputBase, IconButton } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";

import { List } from "components/crud/list";

import { ITechnician } from "interfaces";
import { Search } from "@mui/icons-material";

export const TechnicianList: React.FC = () => {
  const t = useTranslate();

  const { dataGridProps, setFilters } = useDataGrid<ITechnician>();

  const [userNameSearch, setUserNameSearch] = useState<string>("");

  const [firstNameSearch, setFirstNameSearch] = useState<string>("");

  const [lastNameSearch, setLastNameSearch] = useState<string>("");

  // const [selectClinics, setSelectClinics] = useState<number[]>([]);

  // const clinicsListQueryResult = useList<IClinic>({
  //   resource: "clinics",
  // });

  useEffect(() => {
    const filter: CrudFilters = [
      {
        field: "username",
        operator: "contains",
        value: userNameSearch,
      },
      {
        field: "first_name",
        operator: "contains",
        value: firstNameSearch,
      },
      {
        field: "last_name",
        operator: "contains",
        value: lastNameSearch,
      },
    ];
    // if (selectClinics !== undefined && selectClinics.length !== 0) {
    //   filter.push({
    //     field: "clinic",
    //     operator: "in",
    //     value: selectClinics,
    //   });
    // }
    setFilters(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userNameSearch, firstNameSearch, lastNameSearch]);

  // const categoryIds = dataGridProps.rows.map((item) => item.category.id);
  // const { data: categoriesData, isLoading } = useMany<ICategory>({
  //   resource: "categories",
  //   ids: categoryIds,
  //   queryOptions: {
  //     enabled: categoryIds.length > 0,
  //   },
  // });

  const columns: GridColumns<ITechnician> = [
    {
      field: "id",
      headerName: t("technicians.fields.id"),
      type: "number",
      minWidth: 50,
      maxWidth: 50,
      flex: 1,
    },
    {
      field: "username",
      headerName: t("technicians.fields.username"),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "first_name",
      headerName: t("technicians.fields.firstName"),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "last_name",
      headerName: t("technicians.fields.lastName"),
      minWidth: 100,
      flex: 1,
    },
    // {
    //   field: "clinic",
    //   headerName: t("technicians.fields.clinic"),
    //   minWidth: 100,
    //   flex: 1,
    //   renderCell: ({ row }) => {
    //     if (
    //       clinicsListQueryResult.isFetching ||
    //       clinicsListQueryResult.isLoading
    //     ) {
    //       return "Loading...";
    //     }

    //     const clinic =
    //       clinicsListQueryResult.data !== undefined
    //         ? clinicsListQueryResult?.data?.data.find(
    //             (item) => item.id === row.clinic
    //           )?.name
    //         : "";
    //     return clinic;
    //   },
    // },
    {
      field: "created_at",
      headerName: t("technicians.fields.createdAt"),
      minWidth: 150,
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
          placeholder="Search Username"
          value={userNameSearch}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setUserNameSearch(event.target.value);
          }}
          inputProps={{ "aria-label": "search username" }}
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
          placeholder="Search First Name"
          value={firstNameSearch}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setFirstNameSearch(event.target.value);
          }}
          inputProps={{ "aria-label": "search first name" }}
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
          placeholder="Search Last Name"
          value={lastNameSearch}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setLastNameSearch(event.target.value);
          }}
          inputProps={{ "aria-label": "search last name" }}
        />
        <Divider
          sx={{
            color: "text.secondary",
            borderColor: "text.secondary",
          }}
          orientation="vertical"
          flexItem
        />

        {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton> */}
        {/* <FormControl sx={{ minWidth: 320 }}>
          <InputLabel>Select Clinics</InputLabel>
          <Select
            sx={{ ml: 1, flex: 1 }}
            multiple
            variant="standard"
            value={selectClinics}
            onChange={(
              event: SelectChangeEvent<number[]>,
              child: React.ReactNode
            ) => {
              setSelectClinics(event.target.value as number[]);
            }}
            // onChange={(
            //   event: SelectChangeEvent<number>,
            //   child: React.ReactNode
            // ) => {
            //   setSelectServices(event.target.value);
            // }}
            // label="Select Author"
          >
            {clinicsListQueryResult.data !== undefined &&
              clinicsListQueryResult.data.total > 0 &&
              clinicsListQueryResult.data.data.map((row, index) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl> */}
      </Paper>
      <List>
        <DataGrid
          {...dataGridProps}
          // rows={
          //   tableQueryResult.data !== undefined
          //     ? tableQueryResult.data.data
          //     : []
          // }
          // loading={tableQueryResult.isLoading || tableQueryResult.isFetching}
          filterModel={undefined}
          disableColumnFilter={true}
          // filterModel={}
          columns={columns}
          autoHeight
        />
      </List>
    </Stack>
  );
};
