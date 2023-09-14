import React, { useEffect } from "react";
import { useShow, useTranslate, useModal, useResource } from "@refinedev/core";
import { useModalForm } from "@refinedev/react-hook-form";
import {
  TagField,
  useDataGrid,
  EditButton,
  DeleteButton,
  ShowButton,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography, Avatar } from "@mui/material";

import { SubresourceList } from "components/crud/list-subresource";

import { Show } from "components/crud/show";

import { CardMembership } from "@mui/icons-material";

import {
  ICertificate,
  // IDoctor,
  // IDepartment,
  // IProfessionalCertificatesView,
  IDoctor,
  IWorkHistory,
  // IDoctorSalaryView,
} from "interfaces";
import {
  CertificateDetailDialog,
  CertificateEditorDialog,
} from "../../components/professional-certificate-dialog";

export const DoctorShow: React.FC = () => {
  const t = useTranslate();

  const { queryResult } = useShow<IDoctor>();

  // const { queryResult } = useShow<IDoctor>({
  //   resource: "doctors",
  //   id: useResource().id,
  // });

  // const {
  //   queryResult: { data: certificateData, isFetching: certificateFetching },
  //   setShowId,
  // } = useShow<IProfessionalCertificatesView>({
  //   resource: "professional_certificates_view",
  //   id: "0",
  // });

  // console.log(certificateData);

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

  console.log(record?.certificates);

  // useEffect(() => {
  //   if (!isLoading) {
  //     console.log("loaded");
  //     setValue("holder", record?.id);
  //     // setGetAutocompleteValue(false);
  //   }
  // }, [isLoading, record?.id, setValue]);

  // const {
  //   dataGridProps,
  //   tableQueryResult: { refetch: refetchCertificatesList },
  // } = useDataGrid<IProfessionalCertificatesView>({
  //   resource: "professional_certificates_view",

  //   queryOptions: {
  //     enabled: !isLoading,
  //   },

  //   filters: {
  //     permanent: [{ field: "holder", value: record?.id, operator: "eq" }],
  //   },
  // });

  // const { dataGridProps: workHistoryDataGridProps } =
  //   useDataGrid<IDoctorSalaryView>({
  //     resource: "doctors_salary_view",

  //     queryOptions: {
  //       enabled: !isLoading,
  //     },

  //     filters: {
  //       permanent: [{ field: "doctor_id", value: record?.id, operator: "eq" }],
  //     },
  //   });

  // const creatorIds = dataGridProps.rows.map((item) => item.creator);
  // const { data: creatorsData, isLoading: creatorsLoading } =
  //   useMany<IOrganization>({
  //     resource: "organizations",
  //     ids: creatorIds,
  //     queryOptions: {
  //       enabled: creatorIds.length > 0,
  //     },
  //   });

  // const validatorIds = dataGridProps.rows.map((item) => item.validator);
  // const { data: validatorsData, isLoading: validatorsLoading } =
  //   useMany<ITechnician>({
  //     resource: "technicians",
  //     ids: validatorIds,
  //     queryOptions: {
  //       enabled: validatorIds.length > 0,
  //     },
  //   });

  // const specialityIds = dataGridProps.rows.map((item) => item.speciality);
  // const { data: specialitiesData, isLoading: specialitiesLoading } =
  //   useMany<IMedicalSpeciality>({
  //     resource: "medical_specialities",
  //     ids: specialityIds,
  //     queryOptions: {
  //       enabled: specialityIds.length > 0,
  //     },
  //   });

  // const { data: departmentsData, isLoading: departmentsLoading } =
  //   useMany<IDepartment>({
  //     resource: "departments",
  //     ids: record?.departments || [],
  //     queryOptions: {
  //       enabled: record !== undefined ? record?.departments.length > 0 : false,
  //     },
  //   });

  const salariesColumns = React.useMemo<GridColDef<IWorkHistory>[]>(
    () => [
      // {
      //   field: "id",
      //   headerName: t("doctor_salaries.fields.id"),
      //   type: "number",
      //   width: 50,
      // },
      {
        field: "hospital",
        headerName: t("doctor_salaries.fields.clinic"),
        minWidth: 200,
        maxWidth: 200,
        flex: 1,
      },
      {
        field: "salary",
        headerName: t("doctor_salaries.fields.salary"),
        minWidth: 200,
        maxWidth: 200,
        flex: 1,
      },
      {
        field: "start_date",
        headerName: t("doctor_salaries.fields.start_date"),
        minWidth: 100,
        maxWidth: 100,
        flex: 1,
        renderCell: ({ row }) => {
          return new Date(row.start_date).toLocaleDateString();
        },
      },
      {
        field: "end_date",
        headerName: t("doctor_salaries.fields.end_date"),
        minWidth: 100,
        maxWidth: 100,
        flex: 1,
        renderCell: ({ row }) => {
          return new Date(row.end_date).toLocaleDateString();
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
                // onClick={() => {
                //   setShowId(row.id);
                //   showDetailModal();
                // }}
                // resource="professional_certificates"
                // recordItemId={row.id}
              />
              <EditButton
                size="small"
                hideText
                // onClick={() => {
                //   showEditModal(row.id);
                // }}
                // resource="professional_certificates"
                // recordItemId={row.id}
              />
              <DeleteButton
                size="small"
                hideText
                // resource="professional_certificates"
                // recordItemId={row.id}
              />
            </Stack>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    // [t, setShowId, showDetailModal, showEditModal]
    [t]
  );

  const certificatesColumns = React.useMemo<GridColDef<ICertificate>[]>(
    () => [
      // {
      //   field: "_id",
      //   headerName: t("professional_certificates.fields.id"),
      //   type: "number",
      //   width: 50,
      // },
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
        field: "issuer",
        headerName: t("professional_certificates.fields.creator"),
        // type: "number",
        minWidth: 220,
        maxWidth: 220,
        flex: 1,
        renderCell: (params) => {
          return (
            params.value.info.first_name + " " + params.value.info.last_name
          );
        },
        // renderCell: ({ row }) => {
        //   if (creatorsLoading) {
        //     return "Loading...";
        //   }

        //   const creator = creatorsData?.data.find(
        //     (item) => item.id === row.creator
        //   );
        //   return creator?.name;
        // },
      },
      {
        field: "validator",
        headerName: t("professional_certificates.fields.validator"),
        // type: "number",
        minWidth: 200,
        maxWidth: 200,
        flex: 1,
        renderCell: (params) => {
          return (
            params.value.info.first_name + " " + params.value.info.last_name
          );
        },
        // renderCell: ({ row }) => {
        //   if (validatorsLoading) {
        //     return "Loading...";
        //   }

        //   const validator = validatorsData?.data.find(
        //     (item) => item.id === row.validator
        //   );
        //   return validator?.first_name + " " + validator?.last_name;
        // },
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
      {
        field: "type",
        headerName: t("professional_certificates.fields.type"),
        minWidth: 200,
        // maxWidth: 200,
        flex: 1,
      },
      // {
      //   field: "created_at",
      //   headerName: t("professional_certificates.fields.createdAt"),
      //   minWidth: 200,
      //   // maxWidth: 200,
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
                // onClick={() => {
                //   setShowId(row.id);
                //   showDetailModal();
                // }}
                // resource="professional_certificates"
                // recordItemId={row.id}
              />
              <EditButton
                size="small"
                hideText
                // onClick={() => {
                //   showEditModal(row.id);
                // }}
                // resource="professional_certificates"
                // recordItemId={row.id}
              />
              <DeleteButton
                size="small"
                hideText
                // resource="professional_certificates"
                // onSuccess={() => {
                //   refetchCertificatesList();
                // }}
                // recordItemId={row._id}
              />
            </Stack>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    // [t, setShowId, showDetailModal, showEditModal, refetchCertificatesList]
    [t]
  );

  return (
    <Show isLoading={isLoading}>
      {/* <CertificateEditorDialog
        submitButtonText={t("professional_certificates.titles.create")}
        // onSuccess={() => {
        //   refetchCertificatesList();
        // }}
        {...createModalFormReturnValues}
      />
      <CertificateEditorDialog
        submitButtonText={t("professional_certificates.titles.edit")}
        // onSuccess={() => {
        //   refetchCertificatesList();
        // }}
        {...editModalFormReturnValues}
      /> */}
      {/* <CertificateDetailDialog
        loading={certificateFetching}
        data={certificateData?.data}
        close={closeDetailModal}
        visible={detailModalVisible}
      /> */}
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Stack gap={1}>
          <Avatar
            alt={
              record?.user_ref.info.first_name +
              " " +
              record?.user_ref.info.last_name
            }
            src={record?.user_ref.info.avatar}
            sx={{ width: 192, height: 192 }}
          />
        </Stack>
        <Stack gap={1}>
          <Stack
            direction={{ sm: "column", md: "row" }}
            spacing={{ xs: 1, sm: 2, md: 40 }}
          >
            <Stack gap={1}>
              <Typography variant="body1" fontWeight="bold">
                {t("patients.fields.first_name")}
              </Typography>
              <Typography variant="body2">
                {record?.user_ref.info.first_name}
              </Typography>
            </Stack>
            <Stack gap={1}>
              <Typography variant="body1" fontWeight="bold">
                {t("patients.fields.last_name")}
              </Typography>
              <Typography variant="body2">
                {record?.user_ref.info.last_name}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction={{ sm: "column", md: "row" }}
            spacing={{ xs: 1, sm: 2, md: 41 }}
          >
            <Stack gap={1}>
              <Typography variant="body1" fontWeight="bold">
                {t("doctors.fields.full_name")}
              </Typography>
              <Typography variant="body2">
                {record?.user_ref.info.first_name +
                  " " +
                  record?.user_ref.info.last_name}
              </Typography>
            </Stack>
            <Stack gap={1}>
              <Typography variant="body1" fontWeight="bold">
                {t("profiles.fields.gender")}
              </Typography>
              <Typography variant="body2">
                {record?.user_ref.info.gender}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction={{ sm: "column", md: "row" }}
            spacing={{ xs: 1, sm: 2, md: 43 }}
          >
            <Stack gap={1}>
              <Typography variant="body1" fontWeight="bold">
                {t("profiles.fields.dob")}
              </Typography>
              <Typography variant="body2">
                {record !== undefined &&
                  new Date(record?.user_ref.info.dob).toLocaleDateString()}
              </Typography>
            </Stack>
            <Stack gap={1}>
              <Typography variant="body1" fontWeight="bold">
                Country
                {/* {t("profiles.fields.country")} */}
              </Typography>
              <Typography variant="body2">Vietnam</Typography>
            </Stack>
          </Stack>

          {/* <Typography variant="body1" fontWeight="bold">
            {t("doctors.fields.departments")}
          </Typography>
          <Typography variant="body2">
            <Typography variant="body2">
              {record?.departments !== undefined &&
                record?.departments !== null &&
                record?.departments.length > 0 &&
                record?.departments_name.map((item) => {
                  return <TagField sx={{ marginRight: "12px" }} value={item} />;
                })}
            </Typography>
          </Typography> */}
          {/* <Typography variant="body1" fontWeight="bold">
            {t("doctors.fields.clinics")}
          </Typography>
          <Typography variant="body2">
            <Typography variant="body2">
              {record?.clinics !== undefined &&
                record?.clinics !== null &&
                record?.clinics.length > 0 &&
                record?.clinics_name.map((item) => {
                  return <TagField sx={{ marginRight: "12px" }} value={item} />;
                })}
            </Typography>
          </Typography> */}
          {/* <Typography variant="body1" fontWeight="bold">
            {t("doctors.fields.biography")}
          </Typography> */}
        </Stack>
        {/* <Stack gap={1}>
          <SubresourceList
            resource="doctor_salaries"
            // title="Salary History"
            modalToggle={showCreateModal}
            icon={<CardMembership sx={{ verticalAlign: "middle" }} />}
            canCreate={true}
            // breadcrumb={false}
          >
            <DataGrid
              // {...workHistoryDataGridProps}
              columns={salariesColumns}
              autoHeight
            />
          </SubresourceList>
        </Stack> */}
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
            // {...dataGridProps}
            rows={record?.certificates || []}
            getRowId={(row) => row._id}
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                background: "rgb(242, 242, 242)",
                borderBottom: "1px solid rgb(229, 229, 229)",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid rgb(242, 242, 242)",
              },
            }}
            columns={certificatesColumns}
            autoHeight
          />
        </SubresourceList>
      </Stack>
    </Show>
  );
};
