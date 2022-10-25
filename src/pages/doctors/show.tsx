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
  ListItem,
  ListItemIcon,
  ListItemText,
  MuiList,
  ImageList,
  ImageListItem,
  Grid,
  Box,
} from "@pankod/refine-mui";

// import { FitnessCenter } from "@mui/icons-material";

import {
  // ITrainer,
  // ICertification,
  // IService,
  // IGallery,
  // IProduct,
  IDoctor,
  IDepartment,
} from "interfaces";

// import { ProductCard } from "../../components/product-card";

// import { PostCard } from "../../components/post-card";

// import { VideoDialog } from "../../components/video-dialog";

export const DoctorShow: React.FC = () => {
  const t = useTranslate();

  const { queryResult } = useShow<IDoctor>();

  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: departmentsData, isLoading: departmentsLoading } =
    useMany<IDepartment>({
      resource: "departments",
      ids: record?.departments || [],
      queryOptions: {
        enabled: record !== undefined ? record?.departments.length > 0 : false,
      },
    });

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
            {/* Location */}
            {t("doctors.fields.departments")}
          </Typography>
          <Typography variant="body2">
            {/* <TagField value={record?.location} /> */}
            <Typography variant="body2">
              {departmentsData !== undefined &&
                departmentsData.data.map((item) => {
                  return <TagField value={item.name} />;
                })}
            </Typography>
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {/* About */}
            {t("doctors.fields.about")}
          </Typography>
          {/* <Typography variant="body2">{parse(record?.about || "")}</Typography> */}
        </Stack>
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