import React, { useState, useEffect } from "react";

import {
  useTranslate,
  // useMany,
  // useList,
  // useTable,
  CrudFilters,
} from "@refinedev/core";

import {
  useDataGrid,
  ShowButton,
  EditButton,
  DeleteButton,
} from "@refinedev/mui";

import {
  Stack,
  // FormControl,
  // Select,
  Divider,
  Paper,
  InputBase,
  IconButton,
  // InputLabel,
  // MenuItem,
  // SelectChangeEvent,
} from "@mui/material";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { List } from "components/crud/list";

import { IPatient } from "interfaces";
import { Search } from "@mui/icons-material";

export const PatientList: React.FC = () => {
  const t = useTranslate();

  const { dataGridProps, setFilters } = useDataGrid<IPatient>();

  // const { tableQueryResult, setFilters: setFilters2 } = useTable<IPatient>();

  // const [userNameSearch, setUserNameSearch] = useState<string>("");

  const [firstNameSearch, setFirstNameSearch] = useState<string>("");

  const [lastNameSearch, setLastNameSearch] = useState<string>("");

  // const [selectClinics, setSelectClinics] = useState<number[]>([]);

  // const clinicsListQueryResult = useList<IClinic>({
  //   resource: "clinics",
  // });

  useEffect(() => {
    // console.log(selectClinics);
    const filter: CrudFilters = [
      // {
      //   field: "username",
      //   operator: "contains",
      //   value: userNameSearch,
      // },
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
  }, [firstNameSearch, lastNameSearch]);

  // const categoryIds = dataGridProps.rows.map((item) => item.category.id);
  // const { data: categoriesData, isLoading } = useMany<ICategory>({
  //   resource: "categories",
  //   ids: categoryIds,
  //   queryOptions: {
  //     enabled: categoryIds.length > 0,
  //   },
  // });

  const columns = React.useMemo<GridColDef<IPatient>[]>(
    () => [
      {
        field: "id",
        headerName: t("patients.fields.id"),
        type: "number",
        minWidth: 50,
        maxWidth: 50,
        flex: 1,
      },
      {
        field: "first_name",
        headerName: t("patients.fields.first_name"),
        minWidth: 100,
        flex: 1,
      },
      {
        field: "last_name",
        headerName: t("patients.fields.last_name"),
        minWidth: 100,
        flex: 1,
      },
      {
        field: "dob",
        headerName: t("patients.fields.dob"),
        minWidth: 100,
        flex: 1,
      },
      // {
      //   field: "clinic",
      //   headerName: t("patients.fields.clinic"),
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
    ],

    [
      // clinicsListQueryResult.data,
      // clinicsListQueryResult.isFetching,
      // clinicsListQueryResult.isLoading,
      t,
    ]
  );

  // const columns: GridColDef<IPatient> = [
  //   {
  //     field: "id",
  //     headerName: t("patients.fields.id"),
  //     type: "number",
  //     minWidth: 50,
  //     maxWidth: 50,
  //     flex: 1,
  //   },
  //   {
  //     field: "username",
  //     headerName: t("patients.fields.username"),
  //     minWidth: 100,
  //     flex: 1,
  //   },
  //   {
  //     field: "first_name",
  //     headerName: t("patients.fields.first_name"),
  //     minWidth: 100,
  //     flex: 1,
  //   },
  //   {
  //     field: "last_name",
  //     headerName: t("patients.fields.last_name"),
  //     minWidth: 100,
  //     flex: 1,
  //   },
  //   {
  //     field: "clinic",
  //     headerName: t("patients.fields.clinic"),
  //     minWidth: 100,
  //     flex: 1,
  //     renderCell: ({ row }) => {
  //       if (
  //         clinicsListQueryResult.isFetching ||
  //         clinicsListQueryResult.isLoading
  //       ) {
  //         return "Loading...";
  //       }

  //       const clinic =
  //         clinicsListQueryResult.data !== undefined
  //           ? clinicsListQueryResult?.data?.data.find(
  //               (item) => item.id === row.clinic
  //             )?.name
  //           : "";
  //       return clinic;
  //     },
  //   },
  //   {
  //     field: "created_at",
  //     headerName: t("patients.fields.createdAt"),
  //     minWidth: 150,
  //     flex: 1,
  //     renderCell: ({ row }) => {
  //       return new Date(row.created_at).toLocaleString();
  //     },
  //   },
  //   // {
  //   //   field: "updated_at",
  //   //   headerName: t("patients.fields.updatedAt"),
  //   //   minWidth: 400,
  //   //   flex: 1,
  //   //   renderCell: ({ row }) => {
  //   //     return new Date(row.created_at).toLocaleString();
  //   //   },
  //   // },
  //   {
  //     field: "actions",
  //     type: "actions",
  //     headerName: t("table.actions"),
  //     renderCell: function render({ row }) {
  //       return (
  //         <Stack direction="row" spacing={1}>
  //           <ShowButton hideText recordItemId={row.id} />
  //           <EditButton size="small" hideText recordItemId={row.id} />
  //           <DeleteButton size="small" hideText recordItemId={row.id} />
  //         </Stack>
  //       );
  //     },
  //     align: "center",
  //     headerAlign: "center",
  //     minWidth: 120,
  //     // flex: 1,
  //   },
  // ];

  // console.log(dataGridProps);
  // console.log(tableQueryResult);

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
        {/* <InputBase
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
        /> */}
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
        {/* <Divider
          sx={{
            color: "text.secondary",
            borderColor: "text.secondary",
          }}
          orientation="vertical"
          flexItem
        /> */}

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
              event: SelectChangeEvent<number[]>
              // child: React.ReactNode
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
              clinicsListQueryResult.data.data.map((row) => (
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
