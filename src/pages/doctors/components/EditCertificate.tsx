import * as React from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextFieldProps,
  useAutocomplete,
  Autocomplete,
} from "@pankod/refine-mui";

import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  IOrganization,
  IProfessionalCertificates,
  ITechnician,
} from "interfaces";
import { AddBoxOutlined } from "@mui/icons-material";

import { Controller, useForm } from "@pankod/refine-react-hook-form";
import { HttpError, useTranslate } from "@pankod/refine-core";
// import { DatePicker } from "@mui/lab";

export type DataProps = {
  data?: IProfessionalCertificates;
};

export const EditCertificateDialog: React.FC<DataProps> = ({ data }) => {
  const {
    saveButtonProps,
    register,
    control,
    formState: { errors },
  } = useForm<
    IProfessionalCertificates,
    HttpError,
    IProfessionalCertificates & {
      creator: IOrganization;
      validator: ITechnician;
    }
  >();
  const t = useTranslate();
  const [open, setOpen] = React.useState(false);

  const { autocompleteProps: autocompleteCreatorProps } =
    useAutocomplete<IOrganization>({
      resource: "organizations",
      onSearch: (value) => [
        {
          field: "name",
          operator: "containss",
          value,
        },
      ],
    });

  const { autocompleteProps: autocompleteValidatorProps } =
    useAutocomplete<ITechnician>({
      resource: "technicians",
      onSearch: (value) => [
        {
          field: "username",
          operator: "containss",
          value,
        },
      ],
    });

  const [issuedDate, setIssuedDate] = React.useState<Dayjs | null>(dayjs());

  const [expiredAt, setExpiredAt] = React.useState<Dayjs | null>(dayjs());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Button variant="contained" onClick={handleClickOpen}>
        <AddBoxOutlined
          fontSize="small"
          sx={{ marginLeft: "-4px", marginRight: "8px" }}
        />
        {t("professional_certificates.titles.create")}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {t("professional_certificates.titles.create")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the information of the professional certificate belong
            to this person
          </DialogContentText>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TextField
              {...register("name", { required: "Name is required" })}
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              name="name"
              // defaultValue={"lsdjflksd"}
              fullWidth
              variant="standard"
            />
            <TextField
              {...register("description", {
                required: "Description is required",
              })}
              margin="dense"
              id="description"
              label="Description"
              name="description"
              // defaultValue={"lsdjflksd"}
              fullWidth
              variant="standard"
            />
            <DatePicker
              {...register("issued_date", {
                required: "Issued Date is required",
              })}
              disableFuture
              // id="issued_date"
              label="Issued Date"
              openTo="day"
              views={["year", "month", "day"]}
              value={issuedDate}
              onChange={(newValue) => {
                setIssuedDate(newValue);
              }}
              renderInput={(
                params: JSX.IntrinsicAttributes & TextFieldProps
              ) => (
                <TextField
                  fullWidth
                  variant="standard"
                  margin="dense"
                  name="issued_date"
                  {...params}
                />
              )}
            />
            <DatePicker
              {...register("expired_at", {
                required: "Expired At is required",
              })}
              // id="expired_at"
              label="Expired At"
              openTo="day"
              views={["year", "month", "day"]}
              value={expiredAt}
              onChange={(newValue) => {
                setExpiredAt(newValue);
              }}
              renderInput={(
                params: JSX.IntrinsicAttributes & TextFieldProps
              ) => (
                <TextField
                  fullWidth
                  variant="standard"
                  margin="dense"
                  name="expired_at"
                  {...params}
                />
              )}
            />
            <Controller
              control={control}
              name="creator"
              rules={{ required: "Creator is required" }}
              render={({ field }) => (
                <Autocomplete
                  {...autocompleteCreatorProps}
                  {...field}
                  onChange={(_, value) => {
                    field.onChange(value?.id);
                  }}
                  getOptionLabel={(item) => {
                    return item.name ? item.name : "";
                  }}
                  isOptionEqualToValue={(option, value) =>
                    value === undefined || option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t("professional_certificates.fields.creator")}
                      margin="normal"
                      variant="standard"
                      error={!!errors.creator}
                      helperText={errors.creator?.message}
                      required
                    />
                  )}
                />
              )}
            />
            <Controller
              control={control}
              name="validator"
              rules={{ required: "Validator is required" }}
              render={({ field }) => (
                <Autocomplete
                  {...autocompleteValidatorProps}
                  {...field}
                  onChange={(_, value) => {
                    field.onChange(value?.id);
                  }}
                  getOptionLabel={(item) => {
                    return item.username
                      ? item.username +
                          ": " +
                          item.first_name +
                          " " +
                          item.last_name
                      : "";
                  }}
                  isOptionEqualToValue={(option, value) =>
                    value === undefined || option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t("professional_certificates.fields.validator")}
                      margin="normal"
                      variant="standard"
                      error={!!errors.creator}
                      helperText={errors.creator?.message}
                      required
                    />
                  )}
                />
              )}
            />
            <TextField
              {...register("program", {
                required: "Program is required",
              })}
              margin="dense"
              id="program"
              label={t("professional_certificates.fields.program")}
              name="program"
              fullWidth
              variant="standard"
            />
            <TextField
              {...register("level", {
                required: "Level is required",
              })}
              margin="dense"
              id="level"
              label={t("professional_certificates.fields.level")}
              name="level"
              type="number"
              fullWidth
              variant="standard"
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add Certificate</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
