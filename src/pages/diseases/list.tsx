import React, { useState, useEffect } from "react";
import { useTranslate, CrudFilters } from "@refinedev/core";
import {
  useDataGrid,
  ShowButton,
  EditButton,
  DeleteButton,
} from "@refinedev/mui";

import {
  Stack,
  Autocomplete,
  Divider,
  FormControl,
  IconButton,
  InputBase,
  Paper,
  TextField,
} from "@mui/material";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { List } from "components/crud/list";

import { IDisease } from "interfaces";

import { Search } from "@mui/icons-material";

export const DiseaseList: React.FC = () => {
  const t = useTranslate();

  const { dataGridProps, setFilters } = useDataGrid<IDisease>();

  const [nameSearch, setNameSearch] = useState<string>("");

  const [classificationSearch, setClassificationSearch] = useState<string>("");

  const [severitySearch, setSeveritySearch] = useState<string>("");

  // const categoryIds = dataGridProps.rows.map((item) => item.category.id);
  // const { data: categoriesData, isLoading } = useMany<ICategory>({
  //   resource: "categories",
  //   ids: categoryIds,
  //   queryOptions: {
  //     enabled: categoryIds.length > 0,
  //   },
  // });

  useEffect(() => {
    // console.log(selectHospitals);
    const filter: CrudFilters = [
      {
        field: "name",
        operator: "contains",
        value: nameSearch,
      },
      {
        field: "classification",
        operator: "contains",
        value: classificationSearch,
      },
      // {
      //   field: "type",
      //   operator: "eq",
      //   value: typeSearch,
      // },
    ];
    if (severitySearch !== undefined && severitySearch.length !== 0) {
      filter.push({
        field: "severity",
        operator: "eq",
        value: severitySearch,
      });
    }
    setFilters(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameSearch, classificationSearch, severitySearch]);

  const columns: GridColDef<IDisease>[] = [
    // {
    //   field: "id",
    //   headerName: t("diseases.fields.id"),
    //   type: "number",
    //   width: 50,
    // },
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
      renderCell: ({ row }) => {
        return (
          <Stack direction="row" spacing={1}>
            <ShowButton size="small" hideText recordItemId={row._id} />
            <EditButton size="small" hideText recordItemId={row._id} />
            <DeleteButton size="small" hideText recordItemId={row._id} />
          </Stack>
        );
      },
      align: "center",
      headerAlign: "center",
      minWidth: 80,
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
          placeholder="Search Classification"
          value={classificationSearch}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setClassificationSearch(event.target.value);
          }}
          inputProps={{ "aria-label": "search classification" }}
        />
        <Divider
          sx={{
            color: "text.secondary",
            borderColor: "text.secondary",
          }}
          orientation="vertical"
          flexItem
        />
        <FormControl sx={{ minWidth: 320 }}>
          <Autocomplete
            sx={{ ml: 1, flex: 1 }}
            options={["Low", "Medium", "High"]}
            onChange={(event, value) => {
              setSeveritySearch(value || "");
            }}
            value={severitySearch}
            isOptionEqualToValue={(option, value) =>
              value === undefined || option.toString() === value.toString()
            }
            renderInput={(params) => (
              <TextField
                {...params}
                // sx={{ width: "100px" }}
                placeholder={t("diseases.fields.severity")}
                // margin="normal"
                variant="standard"
              />
            )}
          />
          {/* <Select
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
          </Select> */}
        </FormControl>
      </Paper>
      <List>
        <DataGrid
          {...dataGridProps}
          getRowId={(row) => row._id}
          columns={columns}
          filterModel={undefined}
          disableColumnFilter={true}
          autoHeight
        />
      </List>
    </Stack>
  );
};
