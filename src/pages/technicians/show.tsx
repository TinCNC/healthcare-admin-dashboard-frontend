import React, { useEffect } from "react";

import {
  useShow,
  useTranslate,
  useMany, // useOne,
  useModal,
} from "@refinedev/core";

import { useModalForm } from "@refinedev/react-hook-form";
import {
  useDataGrid,
  EditButton,
  DeleteButton,
  ShowButton,
} from "@refinedev/mui";
import { GridColumns, DataGrid } from "@mui/x-data-grid";
import { Stack, Typography, Avatar } from "@mui/material";

import { Show } from "components/crud/show";

import { SubresourceList } from "components/crud/list-subresource";

import { CardMembership } from "@mui/icons-material";

import {
  ITechnicianCertificates,
  ITechnician,
  IOrganization,
} from "interfaces";
import {
  CertificateDetailDialog,
  CertificateEditorDialog,
} from "components/technician-certificate-dialog";

export const TechnicianShow: React.FC = () => {
  const t = useTranslate();

  // const { queryResult } = useShow<ITechnician>();

  const { queryResult } = useShow<ITechnician>({
    // resource: "technicians_2",
    meta: {
      select: "*, profiles!inner(*)",
    },
  });

  const { queryResult: certificateQueryResult, setShowId } =
    useShow<ITechnicianCertificates>({
      resource: "technician_certificates",
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
      resource: "technician_certificates",
      redirect: false,
    },
  });

  const editModalFormReturnValues = useModalForm({
    refineCoreProps: {
      action: "edit",
      resource: "technician_certificates",
      redirect: false,
    },
  });

  const {
    setValue,
    modal: { show: showCreateModal },
  } = createModalFormReturnValues;

  const {
    modal: { show: showEditModal },
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

  const { dataGridProps } = useDataGrid<ITechnicianCertificates>({
    resource: "technician_certificates",
    queryOptions: {
      enabled: !isLoading,
    },
    filters: {
      permanent: [{ field: "holder", value: record?.id, operator: "eq" }],
    },
  });

  // const diseaseIds = dataGridProps.rows.map((item) => item.disease);
  // const { data: diseasesData, isLoading: diseasesLoading } = useMany<IDisease>({
  //   resource: "diseases",
  //   ids: diseaseIds,
  //   queryOptions: {
  //     enabled: diseaseIds.length > 0,
  //   },
  // });

  const issuerIds = dataGridProps.rows.map((item) => item.issuer);
  const { data: issuersData, isLoading: issuersLoading } =
    useMany<IOrganization>({
      resource: "organizations",
      ids: issuerIds,
      queryOptions: {
        enabled: issuerIds.length > 0,
      },
    });

  const validatorIds = dataGridProps.rows.map((item) => item.validator);
  const { data: validatorsData, isLoading: validatorsLoading } =
    useMany<ITechnician>({
      resource: "technicians",
      meta: {
        select: "*, profiles!inner(*)",
      },
      ids: validatorIds,
      queryOptions: {
        enabled: validatorIds.length > 0,
      },
    });

  const certificatesColumns = React.useMemo<
    GridColumns<ITechnicianCertificates>
  >(
    () => [
      {
        field: "id",
        headerName: t("technician_certificates.fields.id"),
        type: "number",
        width: 50,
      },
      {
        field: "name",
        headerName: t("technician_certificates.fields.name"),
        minWidth: 200,
        maxWidth: 200,
        flex: 1,
      },
      {
        field: "issued_date",
        headerName: t("technician_certificates.fields.issued_date"),
        minWidth: 100,
        maxWidth: 100,
        flex: 1,
        renderCell: ({ row }) => {
          return new Date(row.issued_date).toLocaleDateString();
        },
      },
      {
        field: "expired_date",
        headerName: t("technician_certificates.fields.expired_date"),
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
        headerName: t("technician_certificates.fields.issuer"),
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
          return issuer?.name;
        },
      },
      {
        field: "validator",
        headerName: t("technician_certificates.fields.validator"),
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
          return (
            validator?.profiles.first_name + " " + validator?.profiles.last_name
          );
        },
      },
      {
        field: "created_at",
        headerName: t("technician_certificates.fields.createdAt"),
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
                resource="technician_certificates"
                recordItemId={row.id}
              />
              <EditButton
                size="small"
                hideText
                onClick={() => {
                  showEditModal(row.id);
                }}
                resource="technician_certificates"
                recordItemId={row.id}
              />
              <DeleteButton
                size="small"
                hideText
                resource="technician_certificates"
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
      issuersLoading,
      issuersData?.data,
      validatorsLoading,
      validatorsData?.data,
      setShowId,
      showDetailModal,
      showEditModal,
    ]
  );

  return (
    <Show isLoading={isLoading}>
      <CertificateEditorDialog
        submitButtonText={t("technician_certificates.titles.create")}
        {...createModalFormReturnValues}
      />
      <CertificateEditorDialog
        submitButtonText={t("technician_certificates.titles.edit")}
        {...editModalFormReturnValues}
      />
      <CertificateDetailDialog
        loading={certificateLoading}
        data={certificateData?.data}
        // diseasesData={diseasesData?.data}
        issuersData={issuersData?.data}
        validatorsData={validatorsData?.data}
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
            src={record?.profiles.avatar}
            sx={{ width: 192, height: 192 }}
          />
        </Stack>
        <Stack gap={1}>
          <Typography variant="body1" fontWeight="bold">
            {t("profiles.fields.full_name")}
          </Typography>
          <Typography variant="body2">
            {record?.profiles.first_name + " " + record?.profiles.last_name}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {t("profiles.fields.gender")}
          </Typography>
          <Typography variant="body2">{record?.profiles.gender}</Typography>
          {/* <Typography variant="body1" fontWeight="bold">
            {t("patients.fields.hospital")}
          </Typography>
          <Typography variant="body2">
            {!hospitalLoading ? hospitalData?.data?.name : "Loading"}
          </Typography> */}
        </Stack>
      </Stack>
      <Stack gap={1} marginTop={4}>
        <SubresourceList
          resource="technician_certificates"
          modalToggle={showCreateModal}
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
