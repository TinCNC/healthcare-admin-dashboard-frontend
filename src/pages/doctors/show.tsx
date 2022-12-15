import React from "react";
import { useShow, useTranslate, useMany, useModal } from "@pankod/refine-core";

import { useModalForm } from "@pankod/refine-react-hook-form";

import {
  Stack,
  Typography,
  TagField,
  Avatar,
  GridColumns,
  DataGrid,
  useDataGrid,
  EditButton,
  DeleteButton,
  ShowButton,
} from "@pankod/refine-mui";

import { SubresourceList } from "components/crud/list-subresource";

import { Show } from "components/crud/show";

import { CardMembership } from "@mui/icons-material";

import {
  IDoctor,
  IDepartment,
  IProfessionalCertificates,
  ITechnician,
  IOrganization,
  IMedicalSpeciality,
} from "interfaces";
import {
  CertificateDetailDialog,
  CertificateEditorDialog,
} from "../../components/professional-certificate-dialog";

export const DoctorShow: React.FC = () => {
  const t = useTranslate();

  const { queryResult } = useShow<IDoctor>();

  const { queryResult: certificateQueryResult, setShowId } =
    useShow<IProfessionalCertificates>({
      resource: "professional_certificates",
      id: "0",
    });

  const { data: certificateData, isFetching: certificateFetching } =
    certificateQueryResult;

  const {
    show: showDetailModal,
    close: closeDetailModal,
    visible: detailModalVisible,
  } = useModal();

  const createModalFormReturnValues = useModalForm({
    refineCoreProps: {
      action: "create",
      resource: "professional_certificates",
      redirect: false,
    },
  });

  const editModalFormReturnValues = useModalForm({
    refineCoreProps: {
      action: "edit",
      resource: "professional_certificates",
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

  const { dataGridProps } = useDataGrid<IProfessionalCertificates>({
    resource: "professional_certificates",
    permanentFilter: [{ field: "holder", value: record?.id, operator: "eq" }],
    queryOptions: {
      enabled: !isLoading,
    },
  });

  const creatorIds = dataGridProps.rows.map((item) => item.creator);
  const { data: creatorsData, isLoading: creatorsLoading } =
    useMany<IOrganization>({
      resource: "organizations",
      ids: creatorIds,
      queryOptions: {
        enabled: creatorIds.length > 0,
      },
    });

  const validatorIds = dataGridProps.rows.map((item) => item.validator);
  const { data: validatorsData, isLoading: validatorsLoading } =
    useMany<ITechnician>({
      resource: "technicians",
      ids: validatorIds,
      queryOptions: {
        enabled: validatorIds.length > 0,
      },
    });

  const specialityIds = dataGridProps.rows.map((item) => item.speciality);
  const { data: specialitiesData, isLoading: specialitiesLoading } =
    useMany<IMedicalSpeciality>({
      resource: "medical_specialities",
      ids: specialityIds,
      queryOptions: {
        enabled: specialityIds.length > 0,
      },
    });

  const { data: departmentsData, isLoading: departmentsLoading } =
    useMany<IDepartment>({
      resource: "departments",
      ids: record?.departments || [],
      queryOptions: {
        enabled: record !== undefined ? record?.departments.length > 0 : false,
      },
    });

  const certificatesColumns = React.useMemo<
    GridColumns<IProfessionalCertificates>
  >(
    () => [
      {
        field: "id",
        headerName: t("professional_certificates.fields.id"),
        type: "number",
        width: 50,
      },
      {
        field: "name",
        headerName: t("professional_certificates.fields.name"),
        minWidth: 200,
        maxWidth: 200,
        flex: 1,
      },
      {
        field: "issued_date",
        headerName: t("professional_certificates.fields.issued_date"),
        minWidth: 100,
        maxWidth: 100,
        flex: 1,
        renderCell: ({ row }) => {
          return new Date(row.issued_date).toLocaleDateString();
        },
      },
      {
        field: "expired_at",
        headerName: t("professional_certificates.fields.expired_at"),
        minWidth: 100,
        maxWidth: 100,
        flex: 1,
        // renderCell: ({ row }) => {
        //   return new Date(row.expired_at).toLocaleDateString();
        // },
        renderCell: ({ row }) => {
          if (row.expired_at === undefined || row.expired_at === null)
            return t("professional_certificates.values.never_expire");
          return new Date(row.expired_at).toLocaleDateString();
        },
      },
      // {
      //   field: "creator",
      //   headerName: t("professional_certificates.fields.creator"),
      //   minWidth: 200,
      //   maxWidth: 200,
      //   flex: 1,
      // },
      {
        field: "creator",
        headerName: t("professional_certificates.fields.creator"),
        // type: "number",
        minWidth: 220,
        maxWidth: 220,
        flex: 1,
        renderCell: ({ row }) => {
          if (creatorsLoading) {
            return "Loading...";
          }

          const creator = creatorsData?.data.find(
            (item) => item.id === row.creator
          );
          return creator?.name;
        },
      },
      {
        field: "validator",
        headerName: t("professional_certificates.fields.validator"),
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
          return validator?.first_name + " " + validator?.last_name;
        },
      },
      // {
      //   field: "speciality",
      //   headerName: t("professional_certificates.fields.speciality"),
      //   // type: "number",
      //   minWidth: 200,
      //   maxWidth: 200,
      //   flex: 1,
      //   renderCell: ({ row }) => {
      //     if (specialitiesLoading) {
      //       return "Loading...";
      //     }

      //     const speciality = specialitiesData?.data.find(
      //       (item) => item.id === row.speciality
      //     );
      //     return speciality?.name;
      //   },
      // },
      // {
      //   field: "validator",
      //   headerName: t("professional_certificates.fields.validator"),
      //   minWidth: 200,
      //   maxWidth: 200,
      //   flex: 1,
      // },
      // {
      //   field: "holder",
      //   headerName: t("professional_certificates.fields.holder"),
      //   minWidth: 200,
      //   maxWidth: 200,
      //   flex: 1,
      // },
      {
        field: "program",
        headerName: t("professional_certificates.fields.program"),
        minWidth: 220,
        maxWidth: 220,
        flex: 1,
      },
      // {
      //   field: "level",
      //   headerName: t("professional_certificates.fields.level"),
      //   minWidth: 60,
      //   maxWidth: 60,
      //   flex: 1,
      // },
      // {
      //   field: "type",
      //   headerName: t("professional_certificates.fields.type"),
      //   minWidth: 60,
      //   maxWidth: 60,
      //   flex: 1,
      // },
      {
        field: "created_at",
        headerName: t("professional_certificates.fields.createdAt"),
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
                resourceNameOrRouteName="professional_certificates"
                recordItemId={row.id}
              />
              <EditButton
                size="small"
                hideText
                onClick={() => {
                  showEditModal(row.id);
                }}
                resourceNameOrRouteName="professional_certificates"
                recordItemId={row.id}
              />
              <DeleteButton
                size="small"
                hideText
                resourceNameOrRouteName="professional_certificates"
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
      creatorsLoading,
      creatorsData?.data,
      validatorsLoading,
      validatorsData?.data,
      // specialitiesLoading,
      // specialitiesData?.data,
      setShowId,
      showDetailModal,
      showEditModal,
    ]
  );

  return (
    <Show isLoading={isLoading}>
      <CertificateEditorDialog
        submitButtonText={t("professional_certificates.titles.create")}
        {...createModalFormReturnValues}
      />
      <CertificateEditorDialog
        submitButtonText={t("professional_certificates.titles.edit")}
        {...editModalFormReturnValues}
      />
      <CertificateDetailDialog
        loading={certificateFetching}
        data={certificateData?.data}
        creatorsData={creatorsData?.data}
        validatorsData={validatorsData?.data}
        specialitiesData={specialitiesData?.data}
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
            {t("doctors.fields.full_name")}
          </Typography>
          <Typography variant="body2">
            {record?.first_name + " " + record?.last_name}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {t("doctors.fields.departments")}
          </Typography>
          <Typography variant="body2">
            <Typography variant="body2">
              {departmentsData !== undefined &&
                departmentsData.data.map((item) => {
                  return (
                    <TagField sx={{ marginRight: "12px" }} value={item.name} />
                  );
                })}
            </Typography>
          </Typography>
          {/* <Typography variant="body1" fontWeight="bold">
            {t("doctors.fields.biography")}
          </Typography> */}
        </Stack>
      </Stack>
      <Stack gap={1} marginTop={4}>
        <SubresourceList
          resource="professional_certificates"
          modalToggle={showCreateModal}
          icon={<CardMembership sx={{ verticalAlign: "middle" }} />}
          canCreate={true}
          // breadcrumb={false}
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
