import React from "react";
import {
  // useOne,
  useShow,
  useTranslate,
  useMany,
  useList,
} from "@pankod/refine-core";

// import parse from "html-react-parser";

import {
  Show,
  Stack,
  Typography,
  TagField,
  Avatar,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  MuiList,
  ImageList,
  ImageListItem,
  Grid,
  Box,
  GridColumns,
  DataGrid,
  useDataGrid,
  List,
} from "@pankod/refine-mui";

import { Add, CardMembership } from "@mui/icons-material";

import {
  // ITrainer,
  // ICertification,
  // IService,
  // IGallery,
  // IProduct,
  IDoctor,
  IDepartment,
  IProfessionalCertificates,
  ITechnician,
  IOrganization,
} from "interfaces";
import { EditCertificateDialog } from "./components/EditCertificate";

// import { ProductCard } from "../../components/product-card";

// import { PostCard } from "../../components/post-card";

// import { VideoDialog } from "../../components/video-dialog";

export const DoctorShow: React.FC = () => {
  const t = useTranslate();

  const { queryResult } = useShow<IDoctor>();

  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { dataGridProps } = useDataGrid<IProfessionalCertificates>({
    resource: "professional_certificates",
    permanentFilter: [{ field: "holder", value: record?.id, operator: "eq" }],
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
        minWidth: 200,
        maxWidth: 200,
        flex: 1,
        renderCell: ({ row }) => {
          return new Date(row.created_at).toLocaleString();
        },
      },
      {
        field: "expired_at",
        headerName: t("professional_certificates.fields.expired_at"),
        minWidth: 200,
        maxWidth: 200,
        flex: 1,
        renderCell: ({ row }) => {
          return new Date(row.created_at).toLocaleString();
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
        minWidth: 200,
        maxWidth: 200,
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
        minWidth: 200,
        maxWidth: 200,
        flex: 1,
      },
      {
        field: "level",
        headerName: t("professional_certificates.fields.level"),
        minWidth: 60,
        maxWidth: 60,
        flex: 1,
      },
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
      // {
      //   field: "actions",
      //   type: "actions",
      //   headerName: t("table.actions"),
      //   renderCell: function render({ row }) {
      //     return (
      //       <Stack direction="row" spacing={1}>
      //         <EditButton size="small" hideText recordItemId={row.id} />
      //         <DeleteButton size="small" hideText recordItemId={row.id} />
      //       </Stack>
      //     );
      //   },
      //   align: "center",
      //   headerAlign: "center",
      //   minWidth: 80,
      // },
    ],
    [t, creatorsData, creatorsLoading, validatorsData, validatorsLoading]
  );

  //   const { data: categoryData } = useOne<ICategory>({
  //     resource: "categories",
  //     id: record?.category.id || "",
  //     queryOptions: {
  //       enabled: !!record?.category.id,
  //     },
  //   });

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
          {/* <VideoDialog
            buttonText="Why train with me?"
            dialogTitle="Trainer's Introduction Video"
            videoLink={record?.video}
          /> */}
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
                  return <TagField value={item.name} />;
                })}
            </Typography>
          </Typography>
          {/* <Typography variant="body1" fontWeight="bold">
            {t("doctors.fields.biography")}
          </Typography> */}
        </Stack>
      </Stack>
      <Stack gap={1} marginTop={4}>
        <List
          resource="professional_certificates"
          title={
            <React.Fragment>
              <CardMembership sx={{ verticalAlign: "middle" }} />{" "}
              {t("professional_certificates.titles.list")}
            </React.Fragment>
          }
          // canCreate={true}
          headerButtons={
            // <Button variant="contained">
            //   <Add />
            //   &nbsp;Create Certificate
            // </Button>
            <EditCertificateDialog />
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
      {/* <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Stack sx={{ gap: 1, minWidth: 320 }}>
          <Typography variant="h4" fontWeight="bold">
            {t("trainers.services")}
          </Typography>
          <Typography variant="body1">
            <MuiList>
              {!servicesLoading &&
                servicesData !== undefined &&
                servicesData.data.map((row, index) => (
                  <ListItem>
                    <ListItemIcon>
                      <FitnessCenter />
                    </ListItemIcon>
                    <ListItemText
                      primary={row.name}
                      // secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>
                ))}
            </MuiList>
          </Typography>
        </Stack>
        <Stack sx={{ gap: 1, minWidth: 480 }}>
          <Typography variant="h4" fontWeight="bold">
            {t("trainers.certification")}
          </Typography>
          <Stack>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
            >
              {!certificationsLoading &&
                certificationsData !== undefined &&
                certificationsData.data.map((row, index) => (
                  <Grid item xs={3} sm={3} md={3} lg={3} key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "fit-content",
                        color: "text.secondary",
                      }}
                      gap={1}
                    >
                      <Avatar
                        src={
                          row?.image ||
                          "https://mhxuwblyckkausnppiws.supabase.co/storage/v1/object/sign/certificates/generic/Certification.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjZXJ0aWZpY2F0ZXMvZ2VuZXJpYy9DZXJ0aWZpY2F0aW9uLnBuZyIsImlhdCI6MTY2NjQ0NzcyNywiZXhwIjoxOTgxODA3NzI3fQ.PIbh5UD83atwxItAW2J_NO97dFHafLcUuE6elzSeQg4"
                        }
                      />
                      <Typography variant="body2">{row?.name}</Typography>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </Stack>
        </Stack>
      </Stack> */}
      {/* <Stack gap={1} justifyContent="center" alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          {t("trainers.image_gallery")}
        </Typography>
        <ImageList sx={{ width: 960, height: 600 }} cols={3} rowHeight={320}>
          {!galleryLoading &&
            galleryData !== undefined &&
            galleryData.data.map((item) => (
              <ImageListItem key={item.image} sx={{ width: 320 }}>
                <img
                  // src={`${item.image}?w=320&h=320&fit=crop&auto=format`}
                  // srcSet={`${item.image}?w=320&h=320&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.image}`}
                  srcSet={`${item.image}`}
                  // width={240}
                  // height={240}
                  alt={item.title}
                  style={{ height: "inherit" }}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
        </ImageList>
      </Stack> */}
      {/* <Stack gap={1} justifyContent="center" alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          {t("trainers.subscriptions")}
        </Typography>
        <MuiList>
          {!productLoading &&
            productData !== undefined &&
            productData.data.map((item) => (
              <ListItem>
                <ProductCard data={item}></ProductCard>
              </ListItem>
            ))}
        </MuiList>
      </Stack> */}
      {/* <Stack gap={1}>
        <Typography variant="h4" fontWeight="bold">
          {t("trainers.posts")}
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
        >
          {!postsLoading &&
            postsData !== undefined &&
            postsData.data.map((row, index) => (
              <Grid item xs={3} sm={3} md={3} lg={3} key={index}>
                <PostCard data={row}></PostCard>
              </Grid>
            ))}
        </Grid>
      </Stack> */}
    </Show>
  );
};
