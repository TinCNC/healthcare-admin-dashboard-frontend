import React from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";

// import dayjs, { Dayjs } from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import { LoadingButton } from "@mui/lab";

import { IExaminationRecordView } from "interfaces";
import { useTranslate } from "@refinedev/core";

export type DataProps = {
  loading?: boolean;
  data?: IExaminationRecordView;

  visible: boolean;
  close: () => void;
};

export const CertificateDetailDialog: React.FC<DataProps> = ({
  loading,
  data,
  visible,
  close,
}) => {
  const t = useTranslate();

  return (
    <div>
      <Dialog open={visible} onClose={close}>
        <DialogTitle>{t("professional_certificates.titles.show")}</DialogTitle>
        <DialogContent sx={{ minWidth: "500px", minHeight: "440px" }}>
          <Typography variant="body1" fontWeight="bold">
            {t("examination_records.fields.name")}
          </Typography>
          <Typography variant="body2">{data?.name}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("examination_records.fields.disease")}
          </Typography>
          <Typography variant="body2">{data?.disease_name}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("examination_records.fields.description")}
          </Typography>
          <Typography variant="body2">{data?.description}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("examination_records.fields.examiner")}
          </Typography>
          <Typography variant="body2">{data?.examiner}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("examination_records.fields.examined_at")}
          </Typography>
          <Typography variant="body2">{data?.examined_at}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("examination_records.fields.reexamine_at")}
          </Typography>
          <Typography variant="body2">{data?.reexamine_at}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("examination_records.fields.status")}
          </Typography>
          <Typography variant="body2">{data?.status}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
