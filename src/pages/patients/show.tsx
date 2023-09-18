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
  IDiseaseHistory,
  // IExaminationRecordView,
  IPatient,
  // IHospital,
  // IDoctor,
  // IDisease,
} from "interfaces";

import {
  CertificateEditorDialog,
  // CertificateDetailDialog,
} from "components/health-status-certificate-dialog";
import { SubresourceList } from "components/crud/list-subresource";
import { dataGridSxProps } from "@/dataGridSxProps";

export const PatientShow: React.FC = () => {
  const t = useTranslate();

  const { queryResult } = useShow<IPatient>();

  // const { queryResult: certificateQueryResult, setShowId } =
  //   useShow<IExaminationRecordView>({
  //     resource: "examination_records_view",
  //     id: "0",
  //   });

  // const { data: certificateData, isLoading: certificateLoading } =
  //   certificateQueryResult;

  // const {
  //   show: showDetailModal,
  //   close: closeDetailModal,
  //   visible: detailModalVisible,
  // } = useModal();

  const createModalFormReturnValues = useModalForm({
    refineCoreProps: {
      action: "create",
      resource: "examination_records",
      redirect: false,
    },
  });

  const editModalFormReturnValues = useModalForm({
    refineCoreProps: {
      action: "edit",
      resource: "examination_records",
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

  // useEffect(() => {
  //   if (!isLoading) {
  //     console.log("loaded");
  //     setValue("holder", record?.id);
  //     // setGetAutocompleteValue(false);
  //   }
  // }, [isLoading, record?.id, setValue]);

  // const { dataGridProps } = useDataGrid<IExaminationRecordView>({
  //   resource: "examination_records_view",

  //   queryOptions: {
  //     enabled: !isLoading,
  //   },

  //   filters: {
  //     permanent: [{ field: "holder", value: record?.id, operator: "eq" }],
  //   },
  // });

  // const diseaseIds = dataGridProps.rows.map((item) => item.disease);
  // const { data: diseasesData, isLoading: diseasesLoading } = useMany<IDisease>({
  //   resource: "diseases",
  //   ids: diseaseIds,
  //   queryOptions: {
  //     enabled: diseaseIds.length > 0,
  //   },
  // });

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
  //   useMany<IHospital>({
  //     resource: "hospitals",
  //     ids: validatorIds,
  //     queryOptions: {
  //       enabled: validatorIds.length > 0,
  //     },
  //   });

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

  const certificatesColumns = React.useMemo<GridColDef<IDiseaseHistory>[]>(
    () => [
      // {
      //   field: "id",
      //   headerName: t("examination_records.fields.id"),
      //   type: "number",
      //   width: 50,
      // },
      {
        field: "name",
        headerName: t("examination_records.fields.name"),
        minWidth: 300,
        maxWidth: 300,
        flex: 1,
      },
      {
        field: "disease",
        headerName: t("examination_records.fields.disease"),
        // type: "number",
        minWidth: 200,
        maxWidth: 200,
        flex: 1,
        valueGetter: (tableData) => tableData.row.disease.name,
      },
      {
        field: "examiner",
        headerName: t("examination_records.fields.examiner"),
        // type: "number",
        minWidth: 200,
        maxWidth: 200,
        flex: 1,
        valueGetter: (tableData) =>
          tableData.row.examiner.user_ref.info.first_name +
          " " +
          tableData.row.examiner.user_ref.info.last_name,
        // renderCell: ({ row }) => {
        //   if (examinersLoading) {
        //     return "Loading...";
        //   }

        //   const examiner = examinersData?.data.find(
        //     (item) => item.id === row.examiner
        //   );
        //   return examiner?.first_name + " " + examiner?.last_name;
        // },
      },
      {
        field: "reexamine_at",
        headerName: t("examination_records.fields.reexamineAt"),
        minWidth: 200,
        // maxWidth: 200,
        flex: 1,
        renderCell: ({ row }) => {
          return new Date(row.reexamine_at).toLocaleString();
        },
      },
      {
        field: "examined_at",
        headerName: t("examination_records.fields.examinedAt"),
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
                meta={{ patientId: data?.data._id }}
                recordItemId={row._id}
              />
              <EditButton
                size="small"
                hideText
                onClick={() => {
                  showEditModal(row.id);
                }}
                resource="examination_records"
                recordItemId={row._id}
              />
              <DeleteButton
                size="small"
                hideText
                resource="examination_records"
                recordItemId={row._id}
              />
            </Stack>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [t, data?.data, showEditModal]
  );

  // const { data: hospitalData, isLoading: hospitalLoading } = useOne<IHospital>({
  //   resource: "hospitals",
  //   id: record?.hospital || "",
  //   queryOptions: {
  //     enabled: !!record?.hospital,
  //   },
  // });

  return (
    <Show isLoading={isLoading}>
      <CertificateEditorDialog
        submitButtonText={t("examination_records.titles.create")}
        {...createModalFormReturnValues}
      />
      <CertificateEditorDialog
        submitButtonText={t("examination_records.titles.edit")}
        {...editModalFormReturnValues}
      />
      {/* <CertificateDetailDialog
        loading={certificateLoading}
        data={certificateData?.data}
        // diseasesData={diseasesData?.data}
        // examinersData={examinersData?.data}
        close={closeDetailModal}
        visible={detailModalVisible}
      /> */}
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Stack gap={1}>
          <Avatar
            alt={record?.user_ref.username}
            src={record?.user_ref.info.avatar}
            sx={{ width: 192, height: 192 }}
          />
        </Stack>
        <Stack gap={1}>
          <Stack
            direction={{ sm: "column", md: "row" }}
            spacing={{ xs: 1, sm: 2, md: 32 }}
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
          <Typography variant="body1" fontWeight="bold">
            {t("patients.fields.full_name")}
          </Typography>
          <Typography variant="body2">
            {record?.user_ref.info.first_name +
              " " +
              record?.user_ref.info.last_name}
          </Typography>
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
          // resource="examination_records"
          // modalToggle={showCreateModal}
          icon={<CardMembership sx={{ verticalAlign: "middle" }} />}
          canCreate={true}
        >
          <DataGrid
            rows={record?.disease_history || []}
            getRowId={(row) => row._id}
            sx={dataGridSxProps}
            columns={certificatesColumns}
            autoHeight
          />
        </SubresourceList>
      </Stack>
    </Show>
  );
};
