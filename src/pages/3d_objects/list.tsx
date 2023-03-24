import React, { useState, useEffect } from "react";
import {
  useTranslate,
  useMany,
  CrudFilters,
  useList,
} from "@pankod/refine-core";
import {
  useDataGrid,
  DataGrid,
  GridColumns,
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

import { List } from "components/crud/list";

import { I3DObject, ITechnician } from "interfaces";
import { Search } from "@mui/icons-material";

import { AddShoppingCart } from "@mui/icons-material";

import { OrderEditorDialog } from "../../components/order-dialog";
import { useModalForm } from "@pankod/refine-react-hook-form";

export const _3DObjectList: React.FC = () => {
  const t = useTranslate();

  const createModalFormReturnValues = useModalForm({
    refineCoreProps: {
      action: "create",
      resource: "orders",
      redirect: false,
    },
  });

  const editModalFormReturnValues = useModalForm({
    refineCoreProps: {
      action: "edit",
      resource: "orders",
      redirect: false,
    },
  });

  const {
    setValue,
    modal: { show: showCreateModal },
  } = createModalFormReturnValues;

  const {
    // setValue,
    modal: { show: showEditModal },
  } = editModalFormReturnValues;

  const { dataGridProps, setFilters } = useDataGrid<I3DObject>();

  const designerIds = dataGridProps.rows.map(
    (item: I3DObject) => item.designer
  );
  const { data: designersData, isLoading } = useMany<ITechnician>({
    resource: "technicians",
    ids: designerIds,
    queryOptions: {
      enabled: designerIds.length > 0,
    },
  });

  // const { tableQueryResult, setFilters: setFilters2 } = useTable<IPatient>();

  const [nameSearch, setNameSearch] = useState<string>("");

  // const [minManufacturingCost, setMinManufacturingCost] = useState<
  //   number | undefined
  // >();

  // const [maxManufacturingCost, setMaxManufacturingCost] = useState<
  //   number | undefined
  // >();

  const [selectDesigners, setSelectDesigners] = useState<number[]>([]);

  const designersListQueryResult = useList<ITechnician>({
    resource: "technicians",
  });

  useEffect(() => {
    const filter: CrudFilters = [
      {
        field: "name",
        operator: "contains",
        value: nameSearch,
      },
      // {
      //   field: "manufacturing_cost",
      //   operator: "gte",
      //   value: minManufacturingCost,
      // },
      // {
      //   field: "manufacturing_cost",
      //   operator: "lte",
      //   value: maxManufacturingCost,
      // },
    ];
    if (selectDesigners !== undefined && selectDesigners.length !== 0) {
      filter.push({
        field: "designer",
        operator: "in",
        value: selectDesigners,
      });
    }
    setFilters(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    nameSearch,
    selectDesigners,
    // minManufacturingCost,
    // maxManufacturingCost
  ]);

  const columns: GridColumns<I3DObject> = [
    {
      field: "id",
      headerName: t("3d_objects.fields.id"),
      type: "number",
      minWidth: 50,
      maxWidth: 50,
      flex: 1,
    },
    {
      field: "name",
      headerName: t("3d_objects.fields.name"),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "main_file",
      headerName: t("3d_objects.fields.main_file"),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "size_x_mm",
      headerName: t("3d_objects.fields.size"),
      minWidth: 100,
      flex: 1,
      renderCell: ({ row }) => {
        return row.size_x_mm + "x" + row.size_y_mm + "x" + row.size_z_mm;
      },
    },
    {
      field: "designer",
      headerName: t("3d_objects.fields.designer"),
      // type: "number",
      minWidth: 100,
      flex: 1,
      renderCell: ({ row }) => {
        if (isLoading) {
          return "Loading...";
        }
        const designer = designersData?.data.find(
          (item) => item.id === row.designer
        );
        return designer?.first_name + " " + designer?.last_name;
      },
    },
    {
      field: "created_at",
      headerName: t("3d_objects.fields.created_at"),
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
                onClick={() => {
                  setValue("product_id", row.id);
                  showCreateModal();
                }}
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
      <OrderEditorDialog
        submitButtonText={t("orders.titles.create")}
        {...createModalFormReturnValues}
      />
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
          <InputLabel>Select Designers</InputLabel>
          <Select
            sx={{ ml: 1, flex: 1 }}
            multiple
            variant="standard"
            value={selectDesigners}
            onChange={(
              event: SelectChangeEvent<number[]>,
              child: React.ReactNode
            ) => {
              setSelectDesigners(event.target.value as number[]);
            }}
          >
            {designersListQueryResult.data !== undefined &&
              designersListQueryResult.data.total > 0 &&
              designersListQueryResult.data.data.map((row, index) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.first_name + " " + row.last_name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {/* <Divider
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
        </FormControl> */}
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
