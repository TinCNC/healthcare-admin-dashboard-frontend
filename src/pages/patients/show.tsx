import React, { useEffect } from "react";
import {
  useShow,
  useTranslate,
  useMany,
  useModal,
  useOne,
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

// import { List } from "@refinedev/mui";

import {
  IHealthStatusCertificates,
  IPatient,
  IClinic,
  IDoctor,
  IDisease,
} from "interfaces";

import {
  CertificateEditorDialog,
  CertificateDetailDialog,
} from "components/health-status-certificate-dialog";
import { SubresourceList } from "components/crud/list-subresource";

export const PatientShow: React.FC = () => {
  const t = useTranslate();

  const { queryResult } = useShow<IPatient>();

  const { queryResult: certificateQueryResult, setShowId } =
    useShow<IHealthStatusCertificates>({
      resource: "health_status_certificates",
      id: "0",
    });

  const { data: certificateData, isLoading: certificateLoading } =
    certificateQueryResult;

  const {
    show: showDetailModal,
    close: closeDetailModal,
    visible: detailModalVisible,
  } = useModal();

  const createModalFormReturnValues = useModalForm({
    refineCoreProps: {
      action: "create",
      resource: "health_status_certificates",
      redirect: false,
    },
  });

  const editModalFormReturnValues = useModalForm({
    refineCoreProps: {
      action: "edit",
      resource: "health_status_certificates",
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

  const { dataGridProps } = useDataGrid<IHealthStatusCertificates>({
    resource: "health_status_certificates",

    queryOptions: {
      enabled: !isLoading,
    },

    filters: {
      permanent: [{ field: "holder", value: record?.id, operator: "eq" }],
    },
  });

  const diseaseIds = dataGridProps.rows.map((item) => item.disease);
  const { data: diseasesData, isLoading: diseasesLoading } = useMany<IDisease>({
    resource: "diseases",
    ids: diseaseIds,
    queryOptions: {
      enabled: diseaseIds.length > 0,
    },
  });

  // const issuerIds = dataGridProps.rows.map((item) => item.issuer);
  // const { data: issuersData, isLoading: issuersLoading } = useMany<IDoctor>({
  //   resource: "doctors",
  //   ids: issuerIds,
  //   queryOptions: {
  //     enabled: issuerIds.length > 0,
  //   },
  // });

  // const validatorIds = dataGridProps.rows.map((item) => item.validator);
  // const { data: validatorsData, isLoading: validatorsLoading } =
  //   useMany<IClinic>({
  //     resource: "clinics",
  //     ids: validatorIds,
  //     queryOptions: {
  //       enabled: validatorIds.length > 0,
  //     },
  //   });

  const examinersId = dataGridProps.rows.map((item) => item.examiner);
  const { data: examinersData, isLoading: examinersLoading } = useMany<IDoctor>(
    {
      resource: "doctors",
      ids: examinersId,
      queryOptions: {
        enabled: examinersId.length > 0,
      },
    }
  );

  const certificatesColumns = React.useMemo<
    GridColDef<IHealthStatusCertificates>[]
  >(
    () => [
      {
        field: "id",
        headerName: t("health_status_certificates.fields.id"),
        type: "number",
        width: 50,
      },
      {
        field: "name",
        headerName: t("health_status_certificates.fields.name"),
        minWidth: 300,
        maxWidth: 300,
        flex: 1,
      },
      {
        field: "disease",
        headerName: t("health_status_certificates.fields.disease"),
        // type: "number",
        minWidth: 200,
        maxWidth: 200,
        flex: 1,
        renderCell: ({ row }) => {
          if (diseasesLoading) {
            return "Loading...";
          }

          const disease = diseasesData?.data.find(
            (item) => item.id === row.disease
          );
          return disease?.name;
        },
      },
      // {
      //   field: "issued_date",
      //   headerName: t("health_status_certificates.fields.issued_date"),
      //   minWidth: 100,
      //   maxWidth: 100,
      //   flex: 1,
      //   renderCell: ({ row }) => {
      //     return new Date(row.issued_date).toLocaleDateString();
      //   },
      // },
      // {
      //   field: "expired_date",
      //   headerName: t("health_status_certificates.fields.expired_date"),
      //   minWidth: 100,
      //   maxWidth: 100,
      //   flex: 1,
      //   renderCell: ({ row }) => {
      //     if (row.expired_date === undefined || row.expired_date === null)
      //       return "Never Expire";
      //     return new Date(row.expired_date).toLocaleDateString();
      //   },
      // },
      // {
      //   field: "issuer",
      //   headerName: t("health_status_certificates.fields.issuer"),
      //   // type: "number",
      //   minWidth: 200,
      //   maxWidth: 200,
      //   flex: 1,
      //   renderCell: ({ row }) => {
      //     if (issuersLoading) {
      //       return "Loading...";
      //     }

      //     const issuer = issuersData?.data.find(
      //       (item) => item.id === row.issuer
      //     );
      //     return issuer?.first_name + " " + issuer?.last_name;
      //   },
      // },
      // {
      //   field: "validator",
      //   headerName: t("health_status_certificates.fields.validator"),
      //   // type: "number",
      //   minWidth: 200,
      //   maxWidth: 200,
      //   flex: 1,
      //   renderCell: ({ row }) => {
      //     if (validatorsLoading) {
      //       return "Loading...";
      //     }

      //     const validator = validatorsData?.data.find(
      //       (item) => item.id === row.validator
      //     );
      //     return validator?.name;
      //   },
      // },
      {
        field: "examiner",
        headerName: t("health_status_certificates.fields.examiner"),
        // type: "number",
        minWidth: 200,
        maxWidth: 200,
        flex: 1,
        renderCell: ({ row }) => {
          if (examinersLoading) {
            return "Loading...";
          }

          const examiner = examinersData?.data.find(
            (item) => item.id === row.examiner
          );
          return examiner?.first_name + " " + examiner?.last_name;
        },
      },
      {
        field: "reexamine_at",
        headerName: t("health_status_certificates.fields.reexamineAt"),
        minWidth: 200,
        // maxWidth: 200,
        flex: 1,
        renderCell: ({ row }) => {
          return new Date(row.reexamine_at).toLocaleString();
        },
      },
      {
        field: "examined_at",
        headerName: t("health_status_certificates.fields.examinedAt"),
        minWidth: 200,
        // maxWidth: 200,
        flex: 1,
        renderCell: ({ row }) => {
          return new Date(row.examined_at).toLocaleString();
        },
      },
      {
        field: "actions",
        type: "actions",
        headerName: t("table.actions"),
        renderCell: function render({ row }) {
          return (
            <Stack direction="row" spacing={1}>
              {/* <EditButton size="small" hideText recordItemId={row.id} /> */}
              <ShowButton
                size="small"
                hideText
                // onClick={() => {
                //   setShowId(row.id);
                //   showDetailModal();
                // }}
                resource="patient_record"
                meta={{ patientId: data?.data.id }}
                recordItemId={row.id}
              />
              <EditButton
                size="small"
                hideText
                onClick={() => {
                  showEditModal(row.id);
                }}
                resource="health_status_certificates"
                recordItemId={row.id}
              />
              <DeleteButton
                size="small"
                hideText
                resource="health_status_certificates"
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
      diseasesLoading,
      diseasesData?.data,
      // issuersLoading,
      // issuersData?.data,
      // validatorsLoading,
      // validatorsData?.data,
      examinersLoading,
      examinersData?.data,
      // setShowId,
      // showDetailModal,
      data?.data,
      showEditModal,
    ]
  );

  const { data: clinicData, isLoading: clinicLoading } = useOne<IClinic>({
    resource: "clinics",
    id: record?.clinic || "",
    queryOptions: {
      enabled: !!record?.clinic,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <CertificateEditorDialog
        submitButtonText={t("health_status_certificates.titles.create")}
        {...createModalFormReturnValues}
      />
      <CertificateEditorDialog
        submitButtonText={t("health_status_certificates.titles.edit")}
        {...editModalFormReturnValues}
      />
      <CertificateDetailDialog
        loading={certificateLoading}
        data={certificateData?.data}
        diseasesData={diseasesData?.data}
        // issuersData={issuersData?.data}
        // validatorsData={validatorsData?.data}
        examinersData={examinersData?.data}
        close={closeDetailModal}
        visible={detailModalVisible}
      />
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Stack gap={1}>
          <Avatar
            alt={record?.username}
            src={record?.image}
            sx={{ width: 192, height: 192 }}
          />
        </Stack>
        <Stack gap={1}>
          <Typography variant="body1" fontWeight="bold">
            {t("patients.fields.full_name")}
          </Typography>
          <Typography variant="body2">
            {record?.first_name + " " + record?.last_name}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {t("patients.fields.clinic")}
          </Typography>
          <Typography variant="body2">
            {!clinicLoading ? clinicData?.data?.name : "Loading"}
          </Typography>
        </Stack>
      </Stack>
      <Stack gap={1} marginTop={4}>
        {/* <List resource="health_status_certificates">
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
            columns={certificatesColumns}
            autoHeight
          />
        </List> */}
        <SubresourceList
          resource="health_status_certificates"
          // modalToggle={showCreateModal}
          icon={<CardMembership sx={{ verticalAlign: "middle" }} />}
          canCreate={true}
        >
          <DataGrid
            {...dataGridProps}
            columns={certificatesColumns}
            autoHeight
          />
        </SubresourceList>
      </Stack>
    </Show>
  );
};
