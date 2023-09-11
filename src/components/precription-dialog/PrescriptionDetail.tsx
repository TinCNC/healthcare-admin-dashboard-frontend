import React from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";

import { IPrescriptionView } from "interfaces";
import { useTranslate } from "@refinedev/core";

export type DataProps = {
  // loading?: boolean;
  data?: IPrescriptionView;
  visible: boolean;
  close: () => void;
};

export const PrescriptionDetailDialog: React.FC<DataProps> = ({
  // loading,
  data,
  visible,
  close,
}) => {
  const t = useTranslate();

  return (
    <div>
      <Dialog open={visible} onClose={close}>
        <DialogTitle>{t("prescriptions.titles.show")}</DialogTitle>
        <DialogContent sx={{ minWidth: "500px", minHeight: "440px" }}>
          <Typography variant="body1" fontWeight="bold">
            {t("prescriptions.fields.medicine")}
          </Typography>
          <Typography variant="body2">{data?.medicine_name}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("medicines.fields.brand")}
          </Typography>
          <Typography variant="body2">{data?.medicine_brand}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("prescriptions.fields.quantity")}
          </Typography>
          <Typography variant="body2">{data?.quantity}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("prescriptions.fields.total_price")}
          </Typography>
          <Typography variant="body2">{data?.total_price}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("prescriptions.fields.notes")}
          </Typography>
          <Typography variant="body2">{data?.notes}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
