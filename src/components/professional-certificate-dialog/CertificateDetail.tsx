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
} from "@mui/material";

import {
  IMedicalSpeciality,
  IOrganization,
  IProfessionalCertificates,
  ITechnician,
} from "interfaces";
import { useTranslate } from "@refinedev/core";

export type DataProps = {
  loading?: boolean;
  data?: IProfessionalCertificates;
  creatorsData?: IOrganization[];
  validatorsData?: ITechnician[];
  specialitiesData?: IMedicalSpeciality[];
  visible: boolean;
  close: () => void;
};

export const CertificateDetailDialog: React.FC<DataProps> = ({
  loading,
  data,
  creatorsData,
  validatorsData,
  specialitiesData,
  visible,
  close,
}) => {
  const t = useTranslate();

  const validator = validatorsData?.find((item) => item.id === data?.validator);

  return (
    <div>
      <Dialog open={visible} onClose={close}>
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
            <React.Fragment>
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
                {t("professional_certificates.fields.creator")}
              </Typography>
              <Typography variant="body2">
                {creatorsData?.find((item) => item.id === data?.creator)?.name}
              </Typography>

              <Typography variant="body1" fontWeight="bold">
                {t("professional_certificates.fields.validator")}
              </Typography>
              <Typography variant="body2">
                {validator?.first_name + " " + validator?.last_name}
              </Typography>

              <Typography variant="body1" fontWeight="bold">
                {t("professional_certificates.fields.speciality")}
              </Typography>
              <Typography variant="body2">
                {
                  specialitiesData?.find((item) => item.id === data?.speciality)
                    ?.name
                }
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
            </React.Fragment>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
