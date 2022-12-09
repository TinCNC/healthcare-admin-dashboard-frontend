import React from "react";
import {
  useOne,
  useShow,
  useTranslate,
  useModal,
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
  Grid,
  LoadingButton,
} from "@pankod/refine-mui";

import { I3DObject, ITechnician } from "interfaces";

import { GalleryDialog } from "components/3d-objects-gallery-dialog";
import { FileDownload, Collections } from "@mui/icons-material";

export const _3DObjectShow: React.FC = () => {
  const t = useTranslate();

  const { queryResult } = useShow<I3DObject>();

  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: designersData, isLoading: designersLoading } =
    useOne<ITechnician>({
      resource: "technicians",
      id: record?.designer || "",
      queryOptions: {
        enabled: !!record?.designer,
      },
    });

  const { show, close, visible } = useModal();

  return (
    <Show isLoading={isLoading}>
      <GalleryDialog visible={visible} close={close}></GalleryDialog>
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Stack gap={1}>
          <Box
            component="img"
            alt={record?.name}
            src={
              record?.cover ||
              "https://opuqcfkadzuitwfpengj.supabase.co/storage/v1/object/public/placeholder-images/product-placeholder.jpg"
            }
            sx={{ width: 192, height: 192 }}
          />
          <LoadingButton
            // loading={isUploadLoading}
            loadingPosition="start"
            startIcon={<FileDownload />}
            variant="contained"
            component="span"
          >
            Download Model
          </LoadingButton>
          <LoadingButton
            // loading={isUploadLoading}
            onClick={(_e) => {
              show();
            }}
            loadingPosition="start"
            startIcon={<Collections />}
            variant="contained"
            component="span"
          >
            View Gallery
          </LoadingButton>
        </Stack>
        <Stack gap={1}>
          <Typography variant="body1" fontWeight="bold">
            {t("3d_objects.fields.name")}
          </Typography>
          <Typography variant="body2">{record?.name}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("3d_objects.fields.main_file")}
          </Typography>
          <Typography variant="body2">{record?.main_file}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("3d_objects.fields.designer")}
          </Typography>
          <Typography variant="body2">
            {!designersLoading && designersData !== undefined && (
              <TagField
                sx={{ marginRight: "12px" }}
                value={
                  designersData?.data?.last_name +
                  " " +
                  designersData?.data?.first_name
                }
              />
            )}
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={2} sm={4} md={4}>
              <Typography variant="body1" fontWeight="bold">
                {t("3d_objects.fields.size_x_mm")}
              </Typography>
              <Typography variant="body2">{record?.size_x_mm}</Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography variant="body1" fontWeight="bold">
                {t("3d_objects.fields.size_y_mm")}
              </Typography>
              <Typography variant="body2">{record?.size_y_mm}</Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography variant="body1" fontWeight="bold">
                {t("3d_objects.fields.size_z_mm")}
              </Typography>
              <Typography variant="body2">{record?.size_z_mm}</Typography>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Show>
  );
};
