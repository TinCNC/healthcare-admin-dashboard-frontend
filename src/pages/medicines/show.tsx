import React from "react";

import { useOne, useShow, useTranslate } from "@refinedev/core";

import { TagField } from "@refinedev/mui";
import { Stack, Typography, Box } from "@mui/material";

import { Show } from "components/crud/show";

import { IHospital, IMedicine } from "interfaces";

export const MedicineShow: React.FC = () => {
  const t = useTranslate();

  const { queryResult } = useShow<IMedicine>();

  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: hospitalsData, isLoading: hospitalsLoading } =
    useOne<IHospital>({
      resource: "hospitals",
      id: record?.hospital || "",
      queryOptions: {
        enabled: !!record?.hospital,
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
            sx={{ width: 320, height: 320 }}
          />
        </Stack>
        <Stack gap={1}>
          <Typography variant="body1" fontWeight="bold">
            {t("medicines.fields.name")}
          </Typography>
          <Typography variant="body2">{record?.name}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("medicines.fields.hospital")}
          </Typography>
          <Typography variant="body2">
            {!hospitalsLoading && hospitalsData !== undefined && (
              <TagField
                sx={{ marginRight: "12px" }}
                value={hospitalsData?.data?.name}
              />
            )}
          </Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("medicines.fields.brand")}
          </Typography>
          <Typography variant="body2">{record?.brand}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("medicines.fields.description")}
          </Typography>
          <Typography
            variant="body2"
            sx={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
          >
            {record?.description}
            {/* <div style="white-space: pre-wrap;">content</div>
            <pre>{record?.description}</pre> */}
          </Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("medicines.fields.quantity")}
          </Typography>
          <Typography variant="body2">{record?.quantity}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("medicines.fields.price")}
          </Typography>
          <Typography variant="body2">{record?.price}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("medicines.fields.createdAt")}
          </Typography>
          <Typography variant="body2">
            {isLoading
              ? "Loading..."
              : new Date(record?.created_at as string).toLocaleString()}
          </Typography>
        </Stack>
      </Stack>
    </Show>
  );
};
