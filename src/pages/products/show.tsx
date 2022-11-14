import React from "react";
import {
  useOne,
  useShow,
  useTranslate,
  // useMany,
  // useList,
  // HttpError,
} from "@pankod/refine-core";

// import parse from "html-react-parser";

import {
  Show,
  Stack,
  Typography,
  TagField,
  Box,
  Button,
} from "@pankod/refine-mui";

import { IProduct, ICategory } from "interfaces";

export const ProductShow: React.FC = () => {
  const t = useTranslate();

  const { queryResult } = useShow<IProduct>();

  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: categoriesData, isLoading: categoriesLoading } =
    useOne<ICategory>({
      resource: "categories",
      id: record?.category || "",
      queryOptions: {
        enabled: !!record?.category,
      },
    });

  return (
    <Show isLoading={isLoading}>
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Stack gap={1}>
          <Box
            component="img"
            alt={record?.name}
            src={
              record?.image ||
              "https://opuqcfkadzuitwfpengj.supabase.co/storage/v1/object/public/placeholder-images/product-placeholder.jpg"
            }
            sx={{ width: 192, height: 192 }}
          />
        </Stack>
        <Stack gap={1}>
          <Typography variant="body1" fontWeight="bold">
            {t("products.fields.name")}
          </Typography>
          <Typography variant="body2">{record?.name}</Typography>
          <Typography variant="body1" fontWeight="bold">
            {t("products.fields.category")}
          </Typography>
          <Typography variant="body2">
            {!categoriesLoading && categoriesData !== undefined && (
              <TagField
                sx={{ marginRight: "12px" }}
                value={categoriesData?.data?.title}
              />
            )}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {t("products.fields.application")}
          </Typography>
          <Typography variant="body2">{record?.application}</Typography>
          <Typography variant="body1" fontWeight="bold">
            {t("products.fields.manufacturing_cost")}
          </Typography>
          <Typography variant="body2">{record?.manufacturing_cost}</Typography>
          <Typography variant="body1" fontWeight="bold">
            {t("products.fields.sale_price")}
          </Typography>
          <Typography variant="body2">{record?.sale_price}</Typography>
          <Typography variant="body1" fontWeight="bold">
            {t("products.fields.description")}
          </Typography>
          <Typography variant="body2">{record?.description}</Typography>
        </Stack>
        {/* <Button onClick={methodDoesNotExist()}>Break the world</Button>; */}
      </Stack>
      {/* <Stack gap={1} marginTop={4}>
        <List
          resource="professional_certificates"
          title={
            <React.Fragment>
              <CardMembership sx={{ verticalAlign: "middle" }} />{" "}
              {t("professional_certificates.titles.list")}
            </React.Fragment>
          }
          headerButtons={
            <Button variant="contained" onClick={() => showCreateModal()}>
              <AddBoxOutlined
                fontSize="small"
                sx={{ marginLeft: "-4px", marginRight: "8px" }}
              />
              {t("professional_certificates.titles.create")}
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
      </Stack> */}
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
function methodDoesNotExist():
  | React.MouseEventHandler<HTMLButtonElement>
  | undefined {
  throw new Error("Function not implemented.");
}
