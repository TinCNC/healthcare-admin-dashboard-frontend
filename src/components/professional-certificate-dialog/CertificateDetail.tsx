import React from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  CircularProgress,
  Box,
  Stack,
} from "@mui/material";

import {
  // IMedicalSpeciality,
  // IOrganization,
  // IProfessionalCertificates,
  IProfessionalCertificatesView,
  // ITechnician,
} from "interfaces";
import { useTranslate } from "@refinedev/core";

export type DataProps = {
  loading?: boolean;
  data?: IProfessionalCertificatesView;
  // issuersData?: IOrganization[];
  // validatorsData?: ITechnician[];
  // specialitiesData?: IMedicalSpeciality[];
  visible: boolean;
  close: () => void;
};

export const CertificateDetailDialog: React.FC<DataProps> = ({
  loading,
  data,
  // issuersData,
  // validatorsData,
  // specialitiesData,
  visible,
  close,
}) => {
  const t = useTranslate();

  // const validator = validatorsData?.find((item) => item.id === data?.validator);

  return (
    <div>
      <Dialog open={visible} onClose={close} fullWidth maxWidth="md">
        <DialogTitle>{t("professional_certificates.titles.show")}</DialogTitle>
        <DialogContent sx={{ minWidth: "500px", minHeight: "440px" }}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                // height: "calc(100vh - (340px))",
                height: "420px",
              }}
            >
              <CircularProgress />
              <Typography>{t("professional_certificates.loading")}</Typography>
            </Box>
          ) : (
            <Stack gap={4} direction="row">
              <Stack gap={1} width="40%">
                <Box
                  component="img"
                  alt={data?.name}
                  src={
                    data?.image ||
                    "https://opuqcfkadzuitwfpengj.supabase.co/storage/v1/object/public/placeholder-images/product-placeholder.jpg"
                  }
                  // sx={{ width: 400, height: 400 }}
                />
              </Stack>
              <Stack gap={1} width="60%">
                <Typography variant="body1" fontWeight="bold">
                  {t("professional_certificates.fields.name")}
                </Typography>
                <Typography variant="body2">{data?.name}</Typography>

                <Typography variant="body1" fontWeight="bold">
                  {t("professional_certificates.fields.program")}
                </Typography>
                <Typography variant="body2">{data?.program}</Typography>

                <Typography variant="body1" fontWeight="bold">
                  {t("professional_certificates.fields.level")}
                </Typography>
                <Typography variant="body2">{data?.level}</Typography>

                <Typography variant="body1" fontWeight="bold">
                  {t("professional_certificates.fields.description")}
                </Typography>
                <Typography variant="body2">{data?.description}</Typography>

                <Typography variant="body1" fontWeight="bold">
                  {t("professional_certificates.fields.type")}
                </Typography>
                <Typography variant="body2">{data?.type}</Typography>

                <Typography variant="body1" fontWeight="bold">
                  {t("professional_certificates.fields.issuer")}
                </Typography>
                <Typography variant="body2">{data?.issuer_name}</Typography>

                <Typography variant="body1" fontWeight="bold">
                  {t("professional_certificates.fields.validator")}
                </Typography>
                <Typography variant="body2">{data?.validator_name}</Typography>

                <Typography variant="body1" fontWeight="bold">
                  {t("professional_certificates.fields.speciality")}
                </Typography>
                <Typography variant="body2">
                  {data?.speciality_name}
                  {/* {
                    specialitiesData?.find(
                      (item) => item.id === data?.speciality
                    )?.name
                  } */}
                </Typography>

                <Typography variant="body1" fontWeight="bold">
                  {t("professional_certificates.fields.issued_date")}
                </Typography>
                <Typography variant="body2">{data?.issued_date}</Typography>

                <Typography variant="body1" fontWeight="bold">
                  {t("professional_certificates.fields.expired_at")}
                </Typography>
                <Typography variant="body2">
                  {data?.expired_at ||
                    t("professional_certificates.values.never_expire")}
                </Typography>
              </Stack>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
