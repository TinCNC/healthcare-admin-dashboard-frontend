import { useShow, useTranslate } from "@refinedev/core";
import { Stack, Typography, Container } from "@mui/material";

import { Show } from "components/crud/show";

import { IMedicalSpeciality } from "interfaces";

export const SpecialityShow: React.FC = () => {
  const t = useTranslate();
  const { queryResult } = useShow<IMedicalSpeciality>();

  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      {!isLoading && (
        <Container>
          <Stack gap={1}>
            <Typography variant="body1" fontWeight="bold">
              {t("medical_specialities.fields.name")}
            </Typography>
            <Typography variant="body2">{record?.name}</Typography>
            <Typography variant="body1" fontWeight="bold">
              {t("medical_specialities.fields.description")}
            </Typography>
            <Typography variant="body2">{record?.description}</Typography>
          </Stack>
        </Container>
      )}
    </Show>
  );
};
