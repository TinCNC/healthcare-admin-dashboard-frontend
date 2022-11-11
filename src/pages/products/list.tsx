import React, { useState, useEffect } from "react";
import {
  useTranslate,
  useMany,
  CrudFilters,
  // useTable,
} from "@pankod/refine-core";
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  Stack,
  ShowButton,
  EditButton,
  DeleteButton,
  Divider,
  Paper,
  InputBase,
  IconButton,
} from "@pankod/refine-mui";

import { IProduct, ICategory } from "interfaces";
import { Search } from "@mui/icons-material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  // regular,
  // brands,
  // icon,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

export const ProductList: React.FC = () => {
  const t = useTranslate();

  const { dataGridProps, setFilters } = useDataGrid<IProduct>();

  const categoryIds = dataGridProps.rows.map((item: IProduct) => item.category);
  const { data: categoriesData, isLoading } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  // const { tableQueryResult, setFilters: setFilters2 } = useTable<IPatient>();

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
        field: "name",
        operator: "contains",
        value: userNameSearch,
      },
      // {
      //   field: "first_name",
      //   operator: "contains",
      //   value: firstNameSearch,
      // },
      // {
      //   field: "last_name",
      //   operator: "contains",
      //   value: lastNameSearch,
      // },
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

  const columns: GridColumns<IProduct> = [
    {
      field: "id",
      headerName: t("products.fields.id"),
      type: "number",
      minWidth: 50,
      maxWidth: 50,
      flex: 1,
    },
    {
      field: "name",
      headerName: t("products.fields.name"),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "category",
      headerName: t("products.fields.category"),
      // type: "number",
      minWidth: 100,
      flex: 1,
      renderCell: ({ row }) => {
        if (isLoading) {
          return "Loading...";
        }
        const category = categoriesData?.data.find(
          (item) => item.id === row.id
        );
        return category?.title;
      },
    },
    {
      field: "manufacturing_cost",
      headerName: t("products.fields.manufacturing_cost"),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "sale_price",
      headerName: t("products.fields.sale_price"),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "created_at",
      headerName: t("products.fields.createdAt"),
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
      </Paper>
      <List
        title={
          <React.Fragment>
            <FontAwesomeIcon icon={solid("bone")} />
            &nbsp;{t("products.titles.list")}
          </React.Fragment>
        }
      >
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
