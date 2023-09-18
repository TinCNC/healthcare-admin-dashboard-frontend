import React, { useState, useEffect } from "react";
import { useTranslate, useMany, CrudFilters } from "@refinedev/core";
import { useDataGrid, EditButton, DeleteButton } from "@refinedev/mui";
import {
  Stack,
  Paper,
  Divider,
  FormControl,
  IconButton,
  InputBase,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { List } from "components/crud/list";

import { IHospital } from "interfaces";
import { Search } from "@mui/icons-material";

export const HospitalList: React.FC = () => {
  const t = useTranslate();

  const [nameSearch, setNameSearch] = useState<string>("");

  const [addressSearch, setAddressSearch] = useState<string>("");

  const [minCapacitySearch, setMinCapacitySearch] = useState<
    number | undefined
  >();

  const [maxCapacitySearch, setMaxCapacitySearch] = useState<
    number | undefined
  >();

  // const [selectHospitals, setSelectHospitals] = useState<number[]>([]);

  const { dataGridProps, setFilters } = useDataGrid<IHospital>({
    resource: "buildings",
    filters: {
      permanent: [{ field: "type", operator: "eq", value: "Hospital" }],
    },
  });

  useEffect(() => {
    // console.log(selectHospitals);
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
        field: "capacity",
        operator: "gte",
        value: minCapacitySearch,
      },
      {
        field: "capacity",
        operator: "lte",
        value: maxCapacitySearch,
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
  }, [nameSearch, addressSearch, minCapacitySearch, maxCapacitySearch]);

  // const categoryIds = dataGridProps.rows.map((item) => item.category.id);
  // const { data: categoriesData, isLoading } = useMany<ICategory>({
  //   resource: "categories",
  //   ids: categoryIds,
  //   queryOptions: {
  //     enabled: categoryIds.length > 0,
  //   },
  // });

  const columns = React.useMemo<GridColDef<IHospital>[]>(
    () => [
      // {
      //   field: "id",
      //   headerName: t("hospitals.fields.id"),
      //   type: "number",
      //   width: 50,
      // },
      {
        field: "name",
        headerName: t("hospitals.fields.name"),
        minWidth: 200,
        flex: 1,
      },
      {
        field: "address",
        headerName: t("hospitals.fields.address"),
        minWidth: 200,
        flex: 1,
        valueGetter: (params) => params.row.contact_info.address,
      },
      {
        field: "capacity",
        headerName: t("hospitals.fields.capacity"),
        minWidth: 200,
        flex: 1,
      },
      {
        field: "created_at",
        headerName: t("hospitals.fields.createdAt"),
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
              <EditButton
                // resource="buildings"
                size="small"
                hideText
                recordItemId={row._id}
              />
              <DeleteButton
                // resource="buildings"
                size="small"
                hideText
                recordItemId={row._id}
              />
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
        <FormControl sx={{ width: 120 }}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Min Capacity"
            type="number"
            value={minCapacitySearch}
            onChange={(
              event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              setMinCapacitySearch(parseInt(event.target.value) || undefined);
            }}
            inputProps={{ "aria-label": "min capacity" }}
          />
        </FormControl>
        <Divider
          sx={{
            color: "text.secondary",
            borderColor: "text.secondary",
          }}
          orientation="vertical"
          flexItem
        />
        <FormControl sx={{ width: 120 }}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Max Capacity"
            type="number"
            value={maxCapacitySearch}
            onChange={(
              event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              setMaxCapacitySearch(parseInt(event.target.value) || undefined);
            }}
            inputProps={{ "aria-label": "max capacity" }}
          />
        </FormControl>

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
              event: SelectChangeEvent<number[]>,
              child: React.ReactNode
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
              hospitalsListQueryResult.data.data.map((row, index) => (
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
          getRowId={(row) => row._id}
          filterModel={undefined}
          disableColumnFilter={true}
          columns={columns}
          autoHeight
        />
      </List>
    </Stack>
  );
};
