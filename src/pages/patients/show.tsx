import React from "react";
import {
  useShow,
  useTranslate,
  useMany,
  useModal,
  useOne,
} from "@pankod/refine-core";

import { useModalForm } from "@pankod/refine-react-hook-form";

// import parse from "html-react-parser";

import {
  Show,
  Stack,
  Typography,
  Avatar,
  Button,
  GridColumns,
  DataGrid,
  useDataGrid,
  List,
  EditButton,
  DeleteButton,
  ShowButton,
} from "@pankod/refine-mui";

import { AddBoxOutlined, CardMembership } from "@mui/icons-material";

import {
  IHealthStatusCertificates,
  IPatient,
  IClinic,
  IDoctor,
  IDisease,
} from "interfaces";
import { CertificateDetailDialog } from "./components/CertificateDetail";
import { CertificateEditorDialog } from "./components/CertificateEditor";

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
    // setValue,
    modal: {
      show: showEditModal,
      // close: closeCreateModal,
      // visible: createModalVisible,
    },
  } = editModalFormReturnValues;

  const { data, isLoading } = queryResult;
  const record = data?.data;

  setValue("holder", record?.id);

  const { dataGridProps } = useDataGrid<IHealthStatusCertificates>({
    resource: "health_status_certificates",
    permanentFilter: [{ field: "holder", value: record?.id, operator: "eq" }],
    queryOptions: {
      enabled: !isLoading,
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

  const issuerIds = dataGridProps.rows.map((item) => item.issuer);
  const { data: issuersData, isLoading: issuersLoading } = useMany<IDoctor>({
    resource: "doctors",
    ids: issuerIds,
    queryOptions: {
      enabled: issuerIds.length > 0,
    },
  });

  const validatorIds = dataGridProps.rows.map((item) => item.validator);
  const { data: validatorsData, isLoading: validatorsLoading } =
    useMany<IClinic>({
      resource: "clinics",
      ids: validatorIds,
      queryOptions: {
        enabled: validatorIds.length > 0,
      },
    });

  const examinersId = dataGridProps.rows.map((item) => item.examiner);
  const { data: examinersData, isLoading: examinersLoading } = useMany<IDoctor>(
    {
      resource: "doctors",
      ids: examinersId,
      queryOptions: {
        enabled: issuerIds.length > 0,
      },
    }
  );

  const certificatesColumns = React.useMemo<
    GridColumns<IHealthStatusCertificates>
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
        minWidth: 200,
        maxWidth: 200,
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
      {
        field: "issued_date",
        headerName: t("health_status_certificates.fields.issued_date"),
        minWidth: 100,
        maxWidth: 100,
        flex: 1,
        renderCell: ({ row }) => {
          return new Date(row.issued_date).toLocaleDateString();
        },
      },
      {
        field: "expired_date",
        headerName: t("health_status_certificates.fields.expired_date"),
        minWidth: 100,
        maxWidth: 100,
        flex: 1,
        renderCell: ({ row }) => {
          if (row.expired_date === undefined || row.expired_date === null)
            return "Never Expire";
          return new Date(row.expired_date).toLocaleDateString();
        },
      },
      {
        field: "issuer",
        headerName: t("health_status_certificates.fields.issuer"),
        // type: "number",
        minWidth: 200,
        maxWidth: 200,
        flex: 1,
        renderCell: ({ row }) => {
          if (issuersLoading) {
            return "Loading...";
          }

          const issuer = issuersData?.data.find(
            (item) => item.id === row.issuer
          );
          return issuer?.first_name + " " + issuer?.last_name;
        },
      },
      {
        field: "validator",
        headerName: t("health_status_certificates.fields.validator"),
        // type: "number",
        minWidth: 200,
        maxWidth: 200,
        flex: 1,
        renderCell: ({ row }) => {
          if (validatorsLoading) {
            return "Loading...";
          }

          const validator = validatorsData?.data.find(
            (item) => item.id === row.validator
          );
          return validator?.name;
        },
      },
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
        field: "created_at",
        headerName: t("health_status_certificates.fields.createdAt"),
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
                resourceNameOrRouteName="health_status_certificates"
                recordItemId={row.id}
              />
              <EditButton
                size="small"
                hideText
                onClick={() => {
                  showEditModal(row.id);
                }}
                resourceNameOrRouteName="health_status_certificates"
                recordItemId={row.id}
              />
              <DeleteButton
                size="small"
                hideText
                resourceNameOrRouteName="health_status_certificates"
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
      issuersLoading,
      issuersData?.data,
      validatorsLoading,
      validatorsData?.data,
      examinersLoading,
      examinersData?.data,
      setShowId,
      showDetailModal,
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

  // const { data: servicesData, isLoading: servicesLoading } = useMany<IService>({
  //   resource: "services",
  //   ids: record?.services || [],
  //   queryOptions: {
  //     enabled: record !== undefined ? record?.services.length > 0 : false,
  //   },
  // });

  // const { data: certificationsData, isLoading: certificationsLoading } =
  //   useMany<ICertification>({
  //     resource: "certificates",
  //     ids: record?.certifications || [],
  //     queryOptions: {
  //       enabled:
  //         record !== undefined ? record?.certifications.length > 0 : false,
  //     },
  //   });

  // console.log(servicesData);

  // const { data: galleryData, isLoading: galleryLoading } = useList<IGallery>({
  //   resource: "image_gallery",
  //   config: {
  //     filters: [
  //       {
  //         field: "user_id",
  //         operator: "eq",
  //         value: record?.id || null,
  //       },
  //     ],
  //   },
  // });

  // const { data: productData, isLoading: productLoading } = useList<IProduct>({
  //   resource: "products",
  //   config: {
  //     filters: [
  //       {
  //         field: "user_id",
  //         operator: "eq",
  //         value: record?.id || null,
  //       },
  //     ],
  //   },
  // });

  // const { data: postsData, isLoading: postsLoading } = useList<IPost>({
  //   resource: "posts",
  //   config: {
  //     filters: [
  //       {
  //         field: "user_id",
  //         operator: "eq",
  //         value: record?.id || null,
  //       },
  //     ],
  //   },
  // });

  // console.log(galleryData);

  // const { data: galleryData, isLoading: galleryLoading } = useMany<IGallery>({
  //   resource: "image_gallery",
  //   ids: record?.services || [],
  //   queryOptions: {
  //     enabled: record !== undefined ? record?.services.length > 0 : false,
  //   },
  // });

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
        issuersData={issuersData?.data}
        validatorsData={validatorsData?.data}
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
        <List
          resource="health_status_certificates"
          title={
            <React.Fragment>
              <CardMembership sx={{ verticalAlign: "middle" }} />{" "}
              {t("health_status_certificates.titles.list")}
            </React.Fragment>
          }
          headerButtons={
            <Button variant="contained" onClick={() => showCreateModal()}>
              <AddBoxOutlined
                fontSize="small"
                sx={{ marginLeft: "-4px", marginRight: "8px" }}
              />
              {t("health_status_certificates.titles.create")}
            </Button>
          }
          breadcrumb={false}
        >
          <DataGrid
            {...dataGridProps}
            columns={certificatesColumns}
            autoHeight
          />
        </List>
      </Stack>
    </Show>
  );
};
