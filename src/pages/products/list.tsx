import React, { useState, useEffect } from "react";
import {
  useTranslate,
  useMany,
  CrudFilters,
  useList,
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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
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

import { AddShoppingCart } from "@mui/icons-material";

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

  const [nameSearch, setNameSearch] = useState<string>("");

  const [minManufacturingCost, setMinManufacturingCost] = useState<
    number | undefined
  >();

  const [maxManufacturingCost, setMaxManufacturingCost] = useState<
    number | undefined
  >();

  const [selectCategories, setSelectCategories] = useState<number[]>([]);

  const categoriesListQueryResult = useList<ICategory>({
    resource: "categories",
  });

  useEffect(() => {
    const filter: CrudFilters = [
      {
        field: "name",
        operator: "contains",
        value: nameSearch,
      },
      {
        field: "manufacturing_cost",
        operator: "gte",
        value: minManufacturingCost,
      },
      {
        field: "manufacturing_cost",
        operator: "lte",
        value: maxManufacturingCost,
      },
    ];
    if (selectCategories !== undefined && selectCategories.length !== 0) {
      filter.push({
        field: "category",
        operator: "in",
        value: selectCategories,
      });
    }
    setFilters(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    nameSearch,
    selectCategories,
    minManufacturingCost,
    maxManufacturingCost,
  ]);

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
          (item) => item.id === row.category
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
            <Tooltip title="Add to order cart">
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                size="small"
              >
                <AddShoppingCart fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="View Product Details">
              <ShowButton size="small" hideText recordItemId={row.id} />
            </Tooltip>
            <Tooltip title="Edit Product information">
              <EditButton size="small" hideText recordItemId={row.id} />
            </Tooltip>
            <Tooltip title="Delete Product">
              <DeleteButton size="small" hideText recordItemId={row.id} />
            </Tooltip>
          </Stack>
        );
      },
      align: "center",
      headerAlign: "center",
      minWidth: 200,
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
          placeholder="Search Name"
          value={nameSearch}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setNameSearch(event.target.value);
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
        <FormControl sx={{ minWidth: 320 }}>
          <InputLabel>Select Categories</InputLabel>
          <Select
            sx={{ ml: 1, flex: 1 }}
            multiple
            variant="standard"
            value={selectCategories}
            onChange={(
              event: SelectChangeEvent<number[]>,
              child: React.ReactNode
            ) => {
              setSelectCategories(event.target.value as number[]);
            }}
          >
            {categoriesListQueryResult.data !== undefined &&
              categoriesListQueryResult.data.total > 0 &&
              categoriesListQueryResult.data.data.map((row, index) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.title}
                </MenuItem>
              ))}
          </Select>
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
            placeholder="Min"
            type="number"
            value={minManufacturingCost}
            onChange={(
              event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              setMinManufacturingCost(
                parseInt(event.target.value) || undefined
              );
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
            placeholder="Max"
            type="number"
            value={maxManufacturingCost}
            onChange={(
              event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              setMaxManufacturingCost(
                parseInt(event.target.value) || undefined
              );
            }}
            inputProps={{ "aria-label": "max capacity" }}
          />
        </FormControl>
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
