import React, { useEffect } from "react";
import {
  useShow,
  useTranslate,
  useMany,
  useModal,
  useOne,
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
import { Stack, Typography, Avatar } from "@mui/material";

import { Show } from "components/crud/show";

import { CardMembership } from "@mui/icons-material";

import {
  IPrescription,
  IPatient,
  IDisease,
  IMedicine,
  IHealthStatusCertificates,
} from "interfaces";

import { PrecriptionEditorDialog } from "@/components/precription-dialog";
import { SubresourceList } from "components/crud/list-subresource";

export const PatientRecord: React.FC = () => {
  const t = useTranslate();

  const { id: resourceId } = useResource();

  const { queryResult } = useShow<IHealthStatusCertificates>({
    id: resourceId,
    resource: "health_status_certificates",
  });

  console.log(queryResult);

  const { queryResult: prescriptionQueryResult, setShowId } =
    useShow<IPrescription>({
      resource: "prescriptions",
      id: "0",
    });

  const { data: prescriptionData, isLoading: prescriptionLoading } =
    prescriptionQueryResult;

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

  const { dataGridProps } = useDataGrid<IPrescription>({
    resource: "prescriptions",

    queryOptions: {
      enabled: !isLoading,
    },

    filters: {
      permanent: [
        {
          field: "health_status_certificate",
          value: record?.id,
          operator: "eq",
        },
      ],
    },
  });

  const medicineIds = dataGridProps.rows.map((item) => item.medicine);
  const { data: medicinesData, isLoading: medicinesLoading } =
    useMany<IMedicine>({
      resource: "medicines",
      ids: medicineIds,
      queryOptions: {
        enabled: medicineIds.length > 0,
      },
    });

  // const examinersId = dataGridProps.rows.map((item) => item.examiner);
  // const { data: examinersData, isLoading: examinersLoading } = useMany<IDoctor>(
  //   {
  //     resource: "doctors",
  //     ids: examinersId,
  //     queryOptions: {
  //       enabled: examinersId.length > 0,
  //     },
  //   }
  // );

  const prescriptionsColumns = React.useMemo<GridColDef<IPrescription>[]>(
    () => [
      {
        field: "id",
        headerName: t("prescriptions.fields.id"),
        type: "number",
        width: 50,
      },
      {
        field: "medicine",
        headerName: t("prescriptions.fields.medicine"),
        minWidth: 300,
        maxWidth: 300,
        flex: 1,
        renderCell: ({ row }) => {
          if (medicinesLoading) {
            return "Loading...";
          }

          const medicine = medicinesData?.data.find(
            (item) => item.id === row.medicine
          );
          return medicine?.name;
        },
      },
      {
        field: "quantity",
        headerName: t("prescriptions.fields.quantity"),
        minWidth: 100,
        maxWidth: 100,
        flex: 1,
      },
      {
        field: "examined_at",
        headerName: t("prescriptions.fields.createdAt"),
        minWidth: 200,
        // maxWidth: 200,
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
      medicinesLoading,
      medicinesData?.data,
      setShowId,
      showDetailModal,
      showEditModal,
    ]
  );

  const { data: diseaseData, isLoading: diseaseLoading } = useOne<IDisease>({
    resource: "diseases",
    id: record?.disease || "",
    queryOptions: {
      enabled: !!record?.disease,
    },
  });

  const { data: patientData, isLoading: patientLoading } = useOne<IPatient>({
    resource: "patients",
    id: record?.holder || "",
    queryOptions: {
      enabled: !!record?.holder,
    },
  });

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
      {/* <PrescriptionDetailDialog
        loading={prescriptionLoading}
        data={prescriptionData?.data}
        diseasesData={diseasesData?.data}
        examinersData={examinersData?.data}
        close={closeDetailModal}
        visible={detailModalVisible}
      /> */}
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
          <Typography variant="body2">
            {!patientLoading
              ? patientData?.data?.first_name +
                " " +
                patientData?.data?.last_name
              : "Loading"}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {t("health_status_certificates.fields.symptom")}
          </Typography>
          <Typography variant="body2">{record?.name}</Typography>
          <Typography variant="body1" fontWeight="bold">
            {t("health_status_certificates.fields.disease")}
          </Typography>
          <Typography variant="body2">
            {!diseaseLoading ? diseaseData?.data?.name : "Loading"}
          </Typography>
        </Stack>
        <Stack gap={1}>
          <Typography variant="body1" fontWeight="bold">
            {t("health_status_certificates.fields.examinedAt")}
          </Typography>
          <Typography variant="body2">
            {!isLoading
              ? record !== undefined
                ? new Date(record?.examined_at).toLocaleString()
                : null
              : "Loading..."}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {t("health_status_certificates.fields.reexamineAt")}
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
      <Stack gap={1} marginTop={4}>
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
    </Show>
  );
};
