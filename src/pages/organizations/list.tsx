import React, { useState, useEffect } from "react";
import { useTranslate, useList, CrudFilters } from "@pankod/refine-core";
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  Stack,
  EditButton,
  DeleteButton,
  ShowButton,
  Divider,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Autocomplete,
  TextField,
} from "@pankod/refine-mui";

import { IOrganization } from "interfaces";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import { Search } from "@mui/icons-material";
import { Controller } from "@pankod/refine-react-hook-form";

export const OrganizationList: React.FC = () => {
  const t = useTranslate();

  const { dataGridProps, setFilters } = useDataGrid<IOrganization>();

  const [nameSearch, setNameSearch] = useState<string>("");

  const [addressSearch, setAddressSearch] = useState<string>("");

  const [typeSearch, setTypeSearch] = useState<string>("");

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
      // {
      //   field: "type",
      //   operator: "eq",
      //   value: typeSearch,
      // },
    ];
    if (typeSearch !== undefined && typeSearch.length !== 0) {
      filter.push({
        field: "type",
        operator: "eq",
        value: typeSearch,
      });
    }
    setFilters(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameSearch, addressSearch, typeSearch]);

  const columns = React.useMemo<GridColumns<IOrganization>>(
    () => [
      {
        field: "id",
        headerName: t("organizations.fields.id"),
        type: "number",
        width: 50,
      },
      {
        field: "name",
        headerName: t("organizations.fields.name"),
        minWidth: 200,
        flex: 100,
      },
      {
        field: "type",
        headerName: t("organizations.fields.type"),
        headerAlign: "left",
        align: "left",
        minWidth: 100,
        maxWidth: 100,
      },
      {
        field: "address",
        headerName: t("organizations.fields.address"),
        type: "number",
        headerAlign: "left",
        align: "left",
        minWidth: 250,
        flex: 250,
      },
      {
        field: "created_at",
        headerName: t("organizations.fields.createdAt"),
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

        <FormControl sx={{ minWidth: 320 }}>
          {/* <InputLabel>Select Clinics</InputLabel> */}
          {/* typeSearch */}
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
                label={t("organizations.fields.type")}
                // margin="normal"
                variant="standard"
                required
              />
            )}
          />
          {/* <Select
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
          </Select> */}
        </FormControl>
      </Paper>
      <List
        title={
          <React.Fragment>
            <FontAwesomeIcon icon={solid("building")} />
            &nbsp;{t("organizations.titles.list")}
          </React.Fragment>
        }
      >
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
