import React, { useState, useEffect } from "react";
import {
  useTranslate,
  CrudFilters,
  useList,
  // CrudFilter,
} from "@refinedev/core";
import {
  useDataGrid,
  EditButton,
  DeleteButton,
  ShowButton,
} from "@refinedev/mui";
import {
  Stack,
  Divider,
  IconButton,
  InputBase,
  Paper,
  FormControl,
  Autocomplete,
  Chip,
  TextField,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { List } from "components/crud/list";

import { IClinic, IMedicine } from "interfaces";

import { Search } from "@mui/icons-material";

export const MedicineList: React.FC = () => {
  const t = useTranslate();

  const { dataGridProps, setFilters } = useDataGrid<IMedicine>();

  const [nameSearch, setNameSearch] = useState<string>("");

  const [brandSearch, setBrandSearch] = useState<string>("");

  const [minQuantitySearch, setMinQuantitySearch] = useState<
    number | undefined
  >();

  const [maxQuantitySearch, setMaxQuantitySearch] = useState<
    number | undefined
  >();

  // const [phoneSearch, setPhoneSearch] = useState<string>("");

  // const [emailSearch, setEmailSearch] = useState<string>("");

  const clinicsListQueryResult = useList<IClinic>({
    resource: "clinics",
  });

  const [selectClinics, setSelectClinics] = useState<IClinic[]>([]);

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
      {
        field: "brand",
        operator: "contains",
        value: brandSearch,
      },
      {
        field: "quantity",
        operator: "gte",
        value: minQuantitySearch,
      },
      {
        field: "quantity",
        operator: "lte",
        value: maxQuantitySearch,
      },
    ];

    if (selectClinics !== undefined && selectClinics.length !== 0) {
      filter.push({
        field: "clinic",
        operator: "in",
        value: selectClinics.map((item) => {
          return item.id;
        }),
      });
    }

    setFilters(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    nameSearch,
    brandSearch,
    minQuantitySearch,
    maxQuantitySearch,
    selectClinics,
  ]);

  const columns = React.useMemo<GridColDef<IMedicine>[]>(
    () => [
      {
        field: "id",
        headerName: t("medicines.fields.id"),
        type: "number",
        width: 50,
      },
      {
        field: "name",
        headerName: t("medicines.fields.name"),
        minWidth: 300,
        // flex: 100,
      },
      {
        field: "brand",
        headerName: t("medicines.fields.brand"),
        minWidth: 200,
        // flex: 100,
      },
      {
        field: "quantity",
        headerName: t("medicines.fields.quantity"),
        width: 100,
        headerAlign: "left",
        align: "left",
        // flex: 100,
      },
      {
        field: "clinic",
        headerName: t("medicines.fields.clinic"),
        minWidth: 300,
        flex: 1,
        renderCell: ({ row }) => {
          if (
            clinicsListQueryResult.isFetching ||
            clinicsListQueryResult.isLoading
          ) {
            return "Loading...";
          }

          const clinic =
            clinicsListQueryResult.data !== undefined
              ? clinicsListQueryResult?.data?.data.find(
                  (item) => item.id === row.clinic
                )?.name
              : "";
          return clinic;
        },
      },
      {
        field: "price",
        headerName: t("medicines.fields.price"),
        width: 100,
        // flex: 100,
      },
      // {
      //   field: "brand",
      //   headerName: t("medicines.fields.brand"),
      //   type: "number",
      //   headerAlign: "left",
      //   align: "left",
      //   minWidth: 400,
      //   // flex: 150,
      // },
      // {
      //   field: "phone",
      //   headerName: t("medicines.fields.phone"),
      //   headerAlign: "left",
      //   align: "left",
      //   minWidth: 200,
      //   maxWidth: 200,
      // },
      {
        field: "created_at",
        headerName: t("medicines.fields.createdAt"),
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
    [
      clinicsListQueryResult.data,
      clinicsListQueryResult.isFetching,
      clinicsListQueryResult.isLoading,
      t,
    ]
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
          placeholder="Search Brand"
          value={brandSearch}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setBrandSearch(event.target.value);
          }}
          inputProps={{ "aria-label": "search brand" }}
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
            multiple
            // id=""
            options={
              clinicsListQueryResult.data !== undefined
                ? clinicsListQueryResult?.data?.data?.map((item) => item)
                : ([] as IClinic[])
            }
            getOptionLabel={(option) => (option as IClinic).name ?? option}
            value={selectClinics}
            onChange={(_event, value) => {
              setSelectClinics(value as IClinic[]);
            }}
            // defaultValue={[top100Films[13].title]}
            freeSolo
            renderTags={(value: readonly IClinic[], getTagProps) =>
              value.map((option: IClinic, index: number) => (
                <Chip
                  variant="outlined"
                  label={option.name}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Clinics"
                placeholder="Clinics"
              />
            )}
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
            placeholder="Min Quantity"
            type="number"
            value={minQuantitySearch}
            onChange={(
              event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              setMinQuantitySearch(parseInt(event.target.value) || undefined);
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
            placeholder="Max Quantity"
            type="number"
            value={maxQuantitySearch}
            onChange={(
              event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              setMaxQuantitySearch(parseInt(event.target.value) || undefined);
            }}
            inputProps={{ "aria-label": "max capacity" }}
          />
        </FormControl>
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
