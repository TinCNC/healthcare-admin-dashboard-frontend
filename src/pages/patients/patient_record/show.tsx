import React, { useEffect, useState } from "react";
import {
  useShow,
  useTranslate,
  // useMany,
  useModal,
  // useOne,
  useResource,
} from "@refinedev/core";
import { useModalForm } from "@refinedev/react-hook-form";
import {
  useDataGrid,
  EditButton,
  DeleteButton,
  ShowButton,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography, Avatar, Container } from "@mui/material";

import { Show } from "components/crud/show";

import { CardMembership } from "@mui/icons-material";

import {
  IExaminationRecordView,
  IPatient,
  IPrescriptionView,
} from "interfaces";

import {
  PrecriptionEditorDialog,
  PrescriptionDetailDialog,
} from "@/components/precription-dialog";
import { SubresourceList } from "components/crud/list-subresource";

export const PatientRecord: React.FC = () => {
  const t = useTranslate();

  const test = useResource("patients");

  console.log(test);

  // const { queryResult } = useShow<IExaminationRecordView>({
  //   id: useResource().id,
  //   resource: "examination_records_view",
  // });

  // const { queryResult } = useShow<IPatient>({
  //   id: useResource().id,
  //   resource: "examination_records_view",
  // });

  // const [selectedPrescriptionData, setSelectedPrescriptionData] = useState<
  //   IPrescriptionView | undefined
  // >();

  // console.log(queryResult);

  // const { queryResult: prescriptionQueryResult, setShowId } =
  //   useShow<IPrescriptionView>({
  //     resource: "prescriptions_view",
  //     id: "0",
  //   });

  // const { data: prescriptionData, isLoading: prescriptionLoading } =
  //   prescriptionQueryResult;

  const {
    show: showDetailModal,
    close: closeDetailModal,
    visible: detailModalVisible,
  } = useModal();

  const createModalFormReturnValues = useModalForm({
    refineCoreProps: {
      action: "create",
      resource: "prescriptions",
      redirect: false,
    },
  });

  const editModalFormReturnValues = useModalForm({
    refineCoreProps: {
      action: "edit",
      resource: "prescriptions",
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

  const { dataGridProps } = useDataGrid<IPrescriptionView>({
    resource: "prescriptions_view",

    queryOptions: {
      enabled: !isLoading,
    },

    filters: {
      permanent: [
        {
          field: "examination_record",
          value: record?.id,
          operator: "eq",
        },
      ],
    },
  });

  const prescriptionsColumns = React.useMemo<GridColDef<IPrescriptionView>[]>(
    () => [
      // {
      //   field: "id",
      //   headerName: t("prescriptions.fields.id"),
      //   type: "number",
      //   width: 50,
      // },
      {
        field: "medicine",
        headerName: t("prescriptions.fields.medicine"),
        minWidth: 280,
        maxWidth: 280,
        flex: 1,
      },
      {
        field: "notes",
        headerName: t("prescriptions.fields.notes"),
        minWidth: 150,
        maxWidth: 150,
        flex: 1,
      },
      {
        field: "quantity",
        headerName: t("prescriptions.fields.quantity"),
        minWidth: 100,
        maxWidth: 100,
        flex: 1,
      },
      {
        field: "total_price",
        headerName: t("prescriptions.fields.total_price"),
        minWidth: 100,
        maxWidth: 100,
        flex: 1,
      },
      // {
      //   field: "created_at",
      //   headerName: t("prescriptions.fields.createdAt"),
      //   minWidth: 200,
      //   flex: 1,
      //   renderCell: ({ row }) => {
      //     return new Date(row.created_at).toLocaleString();
      //   },
      // },
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
                  // setShowId(row.id);
                  setSelectedPrescriptionData(row);
                  showDetailModal();
                }}
                resource="prescriptions"
                recordItemId={row.id}
              />
              <EditButton
                size="small"
                hideText
                onClick={() => {
                  showEditModal(row.id);
                }}
                resource="prescriptions"
                recordItemId={row.id}
              />
              <DeleteButton
                size="small"
                hideText
                resource="prescriptions"
                recordItemId={row.id}
              />
            </Stack>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [
      t,
      // medicinesLoading,
      // medicinesData?.data,
      // setShowId,
      showDetailModal,
      showEditModal,
    ]
  );

  return (
    <Show isLoading={isLoading}>
      <PrecriptionEditorDialog
        submitButtonText={t("medicine.titles.create")}
        {...createModalFormReturnValues}
      />
      <PrecriptionEditorDialog
        submitButtonText={t("medicine.titles.edit")}
        {...editModalFormReturnValues}
      />
      <PrescriptionDetailDialog
        // loading={prescriptionLoading}
        data={selectedPrescriptionData}
        close={closeDetailModal}
        visible={detailModalVisible}
      />
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        {/* <Stack gap={1}>
          <Avatar
            alt={record?.username}
            src={record?.image}
            sx={{ width: 192, height: 192 }}
          />
        </Stack> */}
        <Stack gap={1}>
          <Typography variant="body1" fontWeight="bold">
            {t("patients.fields.full_name")}
          </Typography>
          <Typography variant="body2">{record?.patient_name}</Typography>
          <Typography variant="body1" fontWeight="bold">
            {t("examination_records.fields.symptom")}
          </Typography>
          <Typography variant="body2">{record?.name}</Typography>
          <Typography variant="body1" fontWeight="bold">
            {t("examination_records.fields.disease")}
          </Typography>
          <Typography variant="body2">{record?.disease_name}</Typography>
        </Stack>
        <Stack gap={1}>
          <Typography variant="body1" fontWeight="bold">
            {t("examination_records.fields.examinedAt")}
          </Typography>
          <Typography variant="body2">
            {!isLoading
              ? record !== undefined
                ? new Date(record?.examined_at).toLocaleString()
                : null
              : "Loading..."}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {t("examination_records.fields.reexamineAt")}
          </Typography>
          <Typography variant="body2">
            {!isLoading
              ? record !== undefined
                ? new Date(record?.reexamine_at).toLocaleString()
                : null
              : "Loading..."}
          </Typography>
        </Stack>
      </Stack>
      <Container maxWidth="md">
        <Stack gap={1} marginTop={4} padding="12px">
          <SubresourceList
            resource="medicines"
            modalToggle={showCreateModal}
            icon={<CardMembership sx={{ verticalAlign: "middle" }} />}
            canCreate={true}
          >
            <DataGrid
              {...dataGridProps}
              columns={prescriptionsColumns}
              autoHeight
            />
          </SubresourceList>
        </Stack>
      </Container>
    </Show>
  );
};
