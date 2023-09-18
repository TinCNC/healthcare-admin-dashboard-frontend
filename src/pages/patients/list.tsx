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

  const { dataGridProps, setFilters } = useDataGrid<IPatient>({});

  // const { tableQueryResult, setFilters: setFilters2 } = useTable<IPatient>();

  // const [userNameSearch, setUserNameSearch] = useState<string>("");

  const [firstNameSearch, setFirstNameSearch] = useState<string>("");

  const [lastNameSearch, setLastNameSearch] = useState<string>("");

  // const [selectHospitals, setSelectHospitals] = useState<number[]>([]);

  // const hospitalsListQueryResult = useList<IHospital>({
  //   resource: "hospitals",
  // });

  useEffect(() => {
    // console.log(selectHospitals);
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
    // if (selectHospitals !== undefined && selectHospitals.length !== 0) {
    //   filter.push({
    //     field: "hospital",
    //     operator: "in",
    //     value: selectHospitals,
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
      // {
      //   field: "id",
      //   headerName: t("patients.fields.id"),
      //   type: "number",
      //   minWidth: 50,
      //   maxWidth: 50,
      //   flex: 1,
      // },
      {
        field: "full_name",
        headerName: t("patients.fields.full_name"),
        minWidth: 100,
        flex: 1,
        valueGetter: (tableData) =>
          tableData.row.user_ref.info.first_name +
          " " +
          tableData.row.user_ref.info.last_name,
        // renderCell: (params) => {
        //   return (
        //     params.value.info.first_name + " " + params.value.info.last_name
        //   );
        // },
      },
      {
        field: "dob",
        headerName: t("patients.fields.dob"),
        minWidth: 100,
        flex: 1,
        valueGetter: (tableData) =>
          new Date(tableData.row.user_ref.info.dob).toLocaleString(),
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
      {
        field: "updated_at",
        headerName: t("patients.fields.updatedAt"),
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
              <ShowButton hideText recordItemId={row._id} />
              <EditButton size="small" hideText recordItemId={row._id} />
              <DeleteButton size="small" hideText recordItemId={row._id} />
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
      // hospitalsListQueryResult.data,
      // hospitalsListQueryResult.isFetching,
      // hospitalsListQueryResult.isLoading,
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
  //     field: "hospital",
  //     headerName: t("patients.fields.hospital"),
  //     minWidth: 100,
  //     flex: 1,
  //     renderCell: ({ row }) => {
  //       if (
  //         hospitalsListQueryResult.isFetching ||
  //         hospitalsListQueryResult.isLoading
  //       ) {
  //         return "Loading...";
  //       }

  //       const hospital =
  //         hospitalsListQueryResult.data !== undefined
  //           ? hospitalsListQueryResult?.data?.data.find(
  //               (item) => item.id === row.hospital
  //             )?.name
  //           : "";
  //       return hospital;
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
          <InputLabel>Select Hospitals</InputLabel>
          <Select
            sx={{ ml: 1, flex: 1 }}
            multiple
            variant="standard"
            value={selectHospitals}
            onChange={(
              event: SelectChangeEvent<number[]>
              // child: React.ReactNode
            ) => {
              setSelectHospitals(event.target.value as number[]);
            }}
            // onChange={(
            //   event: SelectChangeEvent<number>,
            //   child: React.ReactNode
            // ) => {
            //   setSelectServices(event.target.value);
            // }}
            // label="Select Author"
          >
            {hospitalsListQueryResult.data !== undefined &&
              hospitalsListQueryResult.data.total > 0 &&
              hospitalsListQueryResult.data.data.map((row) => (
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
          getRowId={(row) => row._id}
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
