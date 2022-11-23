import React, { useState, useEffect } from "react";
import { useTranslate, useMany, CrudFilters } from "@pankod/refine-core";
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  Stack,
  ShowButton,
  EditButton,
  DeleteButton,
  Autocomplete,
  Divider,
  FormControl,
  IconButton,
  InputBase,
  Paper,
  TextField,
} from "@pankod/refine-mui";

import { IDiseasesGroup } from "interfaces";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  solid,
  // regular,
  // brands,
  // icon,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import { Search } from "@mui/icons-material";

export const DiseaseGroupList: React.FC = () => {
  const t = useTranslate();

  const { dataGridProps, setFilters } = useDataGrid<IDiseasesGroup>();

  const [nameSearch, setNameSearch] = useState<string>("");

  const [icd10CodeSearch, setIcd10CodeSearch] = useState<string>("");

  const [vnCodeSearch, setVnCodeSearch] = useState<string>("");

  // const [classificationSearch, setClassificationSearch] = useState<string>("");

  // const [severitySearch, setSeveritySearch] = useState<string>("");

  // const categoryIds = dataGridProps.rows.map((item) => item.category.id);
  // const { data: categoriesData, isLoading } = useMany<ICategory>({
  //   resource: "categories",
  //   ids: categoryIds,
  //   queryOptions: {
  //     enabled: categoryIds.length > 0,
  //   },
  // });

  useEffect(() => {
    // console.log(selectClinics);
    const filter: CrudFilters = [
      {
        field: "group_name",
        operator: "contains",
        value: nameSearch,
      },
      {
        field: "icd10_code",
        operator: "contains",
        value: icd10CodeSearch,
      },
      {
        field: "vn_code",
        operator: "contains",
        value: vnCodeSearch,
      },
      // {
      //   field: "type",
      //   operator: "eq",
      //   value: typeSearch,
      // },
    ];
    // if (severitySearch !== undefined && severitySearch.length !== 0) {
    //   filter.push({
    //     field: "severity",
    //     operator: "eq",
    //     value: severitySearch,
    //   });
    // }
    setFilters(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameSearch, icd10CodeSearch, vnCodeSearch]);

  const columns: GridColumns<IDiseasesGroup> = [
    {
      field: "id",
      headerName: t("diseases_groups.fields.id"),
      type: "number",
      width: 50,
    },
    {
      field: "group_name",
      headerName: t("diseases_groups.fields.group_name"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "icd10_code",
      headerName: t("diseases_groups.fields.icd10_code"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "vn_code",
      headerName: t("diseases_groups.fields.vn_code"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: t("diseases_groups.fields.createdAt"),
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
            <ShowButton size="small" hideText recordItemId={row.id} />
            <EditButton size="small" hideText recordItemId={row.id} />
            <DeleteButton size="small" hideText recordItemId={row.id} />
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
          placeholder="Search Group Name"
          value={nameSearch}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setNameSearch(event.target.value);
          }}
          inputProps={{ "aria-label": "search group name" }}
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
          placeholder="Search ICD10 Code"
          value={icd10CodeSearch}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setIcd10CodeSearch(event.target.value);
          }}
          inputProps={{ "aria-label": "search icd10 code" }}
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
          placeholder="Search VN Code"
          value={vnCodeSearch}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setVnCodeSearch(event.target.value);
          }}
          inputProps={{ "aria-label": "search vn code" }}
        />
        {/* <Divider
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
        </FormControl> */}
      </Paper>
      <List
        title={
          <React.Fragment>
            <FontAwesomeIcon icon={solid("viruses")} />
            &nbsp;{t("diseases_groups.titles.list")}
          </React.Fragment>
        }
      >
        <DataGrid
          {...dataGridProps}
          columns={columns}
          filterModel={undefined}
          disableColumnFilter={true}
          autoHeight
        />
      </List>
    </Stack>
  );
};
