import { Blender } from "@mui/icons-material";
import { useShow, useTranslate, useOne, useModal } from "@pankod/refine-core";
import { useModalForm } from "@pankod/refine-react-hook-form";
import {
  Stack,
  Typography,
  TagField,
  DataGrid,
  GridColumns,
  ShowButton,
  EditButton,
  DeleteButton,
  useDataGrid,
  Container,
} from "@pankod/refine-mui";

import { SubresourceList } from "components/crud/list-subresource";

import { Show } from "components/crud/show";

import { ILaboratory, IMaterial, ITechnician } from "interfaces";
import { MaterialEditorDialog } from "components/material-dialog";

import React, { useEffect } from "react";

export const LaboratoryShow: React.FC = () => {
  const t = useTranslate();
  const { queryResult } = useShow<ILaboratory>();

  const { queryResult: materialQueryResult, setShowId } = useShow<IMaterial>({
    resource: "materials",
    id: "0",
  });

  const { data: materialData, isLoading: materialLoading } =
    materialQueryResult;

  const {
    show: showDetailModal,
    close: closeDetailModal,
    visible: detailModalVisible,
  } = useModal();

  const createModalFormReturnValues = useModalForm({
    refineCoreProps: {
      action: "create",
      resource: "materials",
      redirect: false,
    },
  });

  const editModalFormReturnValues = useModalForm({
    refineCoreProps: {
      action: "edit",
      resource: "materials",
      redirect: false,
    },
  });

  const {
    setValue,
    modal: {
      show: showCreateModal,
      // close: closeCreateModal,
      // visible: createModalVisible,
    },
  } = createModalFormReturnValues;

  const {
    // setValue,
    modal: {
      show: showEditModal,
      // close: closeCreateModal,
      // visible: createModalVisible,
    },
  } = editModalFormReturnValues;

  const { data, isLoading } = queryResult;
  const record = data?.data;

  useEffect(() => {
    if (!isLoading) {
      console.log("loaded");
      setValue("holder", record?.id);
      // setGetAutocompleteValue(false);
    }
  }, [isLoading, record?.id, setValue]);

  const { data: directorData, isLoading: directorLoading } =
    useOne<ITechnician>({
      resource: "technicians",
      id: record?.director || 0,
      queryOptions: {
        enabled: !!record?.id,
      },
    });

  const materialsColumns = React.useMemo<GridColumns<IMaterial>>(
    () => [
      {
        field: "id",
        headerName: t("materials.fields.id"),
        type: "number",
        width: 50,
      },
      {
        field: "material_name",
        headerName: t("materials.fields.material_name"),
        // minWidth: 600,
        maxWidth: 640,
        flex: 1,
      },
      {
        field: "price",
        headerName: t("materials.fields.price"),
        minWidth: 80,
        maxWidth: 80,
        flex: 1,
      },
      {
        field: "created_at",
        headerName: t("materials.fields.createdAt"),
        minWidth: 220,
        maxWidth: 220,
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
              <ShowButton
                size="small"
                hideText
                onClick={() => {
                  setShowId(row.id);
                  showDetailModal();
                }}
                resourceNameOrRouteName="materials"
                recordItemId={row.id}
              />
              <EditButton
                size="small"
                hideText
                onClick={() => {
                  showEditModal(row.id);
                }}
                resourceNameOrRouteName="materials"
                recordItemId={row.id}
              />
              <DeleteButton
                size="small"
                hideText
                resourceNameOrRouteName="materials"
                recordItemId={row.id}
              />
            </Stack>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 120,
      },
    ],
    [t, setShowId, showDetailModal, showEditModal]
  );

  //   const { data: categoryData } = useOne<ICategory>({
  //     resource: "categories",
  //     id: record?.category.id || "",
  //     queryOptions: {
  //       enabled: !!record?.category.id,
  //     },
  //   });

  const { dataGridProps } = useDataGrid<IMaterial>({
    resource: "materials",
    permanentFilter: [
      { field: "laboratory", value: record?.id, operator: "eq" },
    ],
    queryOptions: {
      enabled: !isLoading,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <MaterialEditorDialog
        submitButtonText={t("materials.titles.create")}
        {...createModalFormReturnValues}
      />
      <MaterialEditorDialog
        submitButtonText={t("materials.titles.edit")}
        {...editModalFormReturnValues}
      />
      {!isLoading && !directorLoading && (
        <React.Fragment>
          <Stack gap={1} padding="12px">
            <Typography variant="body1" fontWeight="bold">
              {t("laboratories.fields.name")}
            </Typography>
            <Typography variant="body2">{record?.name}</Typography>

            <Typography variant="body1" fontWeight="bold">
              {t("laboratories.fields.address")}
            </Typography>
            <Typography variant="body2">{record?.address}</Typography>

            <Typography variant="body1" fontWeight="bold">
              {t("laboratories.fields.director")}
            </Typography>
            <Typography variant="body2">
              {directorData?.data.first_name +
                " " +
                directorData?.data.last_name}
            </Typography>

            <Typography variant="body1" fontWeight="bold">
              {t("laboratories.fields.email")}
            </Typography>
            <Typography variant="body2">{record?.email}</Typography>

            <Typography variant="body1" fontWeight="bold">
              {t("laboratories.fields.phone")}
            </Typography>
            <Typography variant="body2">{record?.phone}</Typography>

            <Typography variant="body1" fontWeight="bold">
              {t("laboratories.fields.website")}
            </Typography>
            <Typography variant="body2">{record?.website}</Typography>

            <Typography variant="body1" fontWeight="bold">
              {t("laboratories.fields.workload_capacity")}
            </Typography>
            <Typography variant="body2">
              <TagField value={record?.workload_capacity} />
            </Typography>
          </Stack>
          <Container>
            <Stack gap={1} marginTop={4} padding="12px">
              <SubresourceList
                resource="materials"
                modalToggle={showCreateModal}
                icon={<Blender sx={{ verticalAlign: "middle" }} />}
                canCreate={true}
              >
                <DataGrid
                  {...dataGridProps}
                  columns={materialsColumns}
                  autoHeight
                />
              </SubresourceList>
            </Stack>
          </Container>
        </React.Fragment>
      )}
    </Show>
  );
};
