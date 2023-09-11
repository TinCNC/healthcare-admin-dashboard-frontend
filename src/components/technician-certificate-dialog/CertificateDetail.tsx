import React from "react";

import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button } from "@mui/material";

// import dayjs, { Dayjs } from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import { LoadingButton } from "@mui/lab";

import {
  ITechnicianCertificates,
  IOrganization,
  ITechnician,
} from "interfaces";
import { useTranslate } from "@refinedev/core";

export type DataProps = {
  loading?: boolean;
  data?: ITechnicianCertificates;
  issuersData?: IOrganization[];
  validatorsData?: ITechnician[];
  visible: boolean;
  close: () => void;
};

export const CertificateDetailDialog: React.FC<DataProps> = ({
  loading,
  data,
  issuersData,
  validatorsData,
  visible,
  close,
}) => {
  const t = useTranslate();

  const validator = validatorsData?.find((item) => item.id === data?.issuer);

  return (
    <div>
      <Dialog open={visible} onClose={close}>
        <DialogTitle>{t("technician_certificates.titles.show")}</DialogTitle>
        <DialogContent sx={{ minWidth: "500px", minHeight: "440px" }}>
          <Typography variant="body1" fontWeight="bold">
            {t("technician_certificates.fields.name")}
          </Typography>
          <Typography variant="body2">{data?.name}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("technician_certificates.fields.description")}
          </Typography>
          <Typography variant="body2">{data?.description}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("technician_certificates.fields.issuer")}
          </Typography>

          <Typography variant="body2">
            {issuersData?.find((item) => item.id === data?.issuer)?.name}
          </Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("technician_certificates.fields.validator")}
          </Typography>
          <Typography variant="body2">
            {validator?.first_name + " " + validator?.last_name}
          </Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("technician_certificates.fields.program")}
          </Typography>
          <Typography variant="body2">{data?.program}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("technician_certificates.fields.level")}
          </Typography>
          <Typography variant="body2">{data?.level}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("technician_certificates.fields.issued_date")}
          </Typography>
          <Typography variant="body2">{data?.issued_date}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("technician_certificates.fields.expired_date")}
          </Typography>
          <Typography variant="body2">{data?.expired_date}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
