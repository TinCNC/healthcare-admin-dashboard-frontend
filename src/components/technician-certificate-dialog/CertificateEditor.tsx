import React from "react";

import { useAutocomplete } from "@refinedev/mui";

import {
  // TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Autocomplete,
} from "@mui/material";

import { LoadingTextField } from "components/form-fields/loading-text-field";

import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { LoadingButton } from "@mui/lab";

import { IOrganization, ITechnician } from "interfaces";
import { AddCircleOutlineOutlined, CancelOutlined } from "@mui/icons-material";

import { UseModalFormReturnType } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { useTranslate } from "@refinedev/core";

export type EditorDataProps = UseModalFormReturnType & {
  submitButtonText?: string;
};

export const CertificateEditorDialog: React.FC<EditorDataProps> = ({
  register,
  control,
  formState: { errors, isSubmitting },
  refineCore: { onFinish, formLoading, queryResult },
  handleSubmit,
  getValues,
  setValue,
  modal: { visible, close },
  saveButtonProps,
  submitButtonText,
  reset,
}) => {
  const t = useTranslate();

  const { autocompleteProps: autocompleteIssuerProps } =
    useAutocomplete<IOrganization>({
      resource: "organizations",
      pagination: { current: 1, pageSize: 10000 },
      onSearch: (value: any) => [
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
      pagination: { current: 1, pageSize: 10000 },
      onSearch: (value: any) => [
        {
          field: "username",
          operator: "containss",
          value,
        },
      ],
    });

  const [issuedDate, setIssuedDate] = React.useState<Dayjs | null>(dayjs());

  const [expiredDate, setExpiredDate] = React.useState<Dayjs | null>(null);

  const submitButtonClick = (e: React.BaseSyntheticEvent<object, any, any>) => {
    if (getValues("expired_date") === "") setValue("expired_date", null);
    console.log(getValues());
    saveButtonProps.onClick(e);
  };

  return (
    <div>
      <Dialog
        open={visible}
        onClose={() => {
          reset();
          close();
        }}
      >
        <DialogTitle>{t("technician_certificates.titles.create")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the information of the technician certificate belong to
            this person
          </DialogContentText>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form className="form" onSubmit={handleSubmit(onFinish)}>
              <LoadingTextField
                loading={queryResult?.isFetching}
                disabled={isSubmitting}
                registerProps={register("name", {
                  required: "Name is required",
                })}
                error={!!errors?.name}
                helperText={errors.name?.message as string}
                autoFocus
                margin="dense"
                id="name"
                label={t("technician_certificates.fields.name")}
                name="name"
                // defaultValue={"lsdjflksd"}
                fullWidth
                variant="standard"
              />
              {/* <TextField
              {...register("description")}
              margin="dense"
              id="description"
              label="Description"
              name="description"
              // defaultValue={"lsdjflksd"}
              fullWidth
              variant="standard"
            /> */}
              <DatePicker
                {...register("issued_date", {
                  required: "Issued Date is required",
                })}
                disableFuture
                label={t("technician_certificates.fields.issued_date")}
                openTo="day"
                views={["year", "month", "day"]}
                value={issuedDate}
                onChange={(newValue) => {
                  setValue("issued_date", newValue?.toDate().toDateString());
                  setIssuedDate(newValue);
                }}
                disabled={isSubmitting}
                renderInput={(params) => (
                  <LoadingTextField
                    loading={queryResult?.isFetching}
                    required
                    error={!!errors?.issued_date}
                    helperText={errors.issued_date?.message as string}
                    fullWidth
                    variant="standard"
                    margin="dense"
                    // name="issued_date"
                    {...params}
                  />
                )}
              />
              <DatePicker
                {...register("expired_date")}
                disablePast
                label={t("technician_certificates.fields.expired_date")}
                openTo="day"
                views={["year", "month", "day"]}
                value={expiredDate}
                onChange={(newValue) => {
                  if (newValue === null) setValue("expired_date", null);
                  else {
                    setValue(
                      "expired_date",
                      newValue?.toDate().toLocaleDateString()
                    );
                  }
                  setExpiredDate(newValue);
                }}
                disabled={isSubmitting}
                renderInput={(params) => (
                  <LoadingTextField
                    loading={queryResult?.isFetching}
                    error={!!errors?.expired_date}
                    helperText={errors.expired_date?.message as string}
                    fullWidth
                    variant="standard"
                    margin="dense"
                    {...params}
                  />
                )}
              />
              <Controller
                control={control}
                name="issuer"
                rules={{ required: "Issuer is required" }}
                render={({ field }) => (
                  <Autocomplete
                    {...autocompleteIssuerProps}
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
                    disabled={isSubmitting}
                    renderInput={(params) => (
                      <LoadingTextField
                        {...params}
                        loading={queryResult?.isFetching}
                        label={t("technician_certificates.fields.issuer")}
                        margin="normal"
                        variant="standard"
                        error={!!errors.issuer}
                        helperText={errors.issuer?.message as string}
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
                    disabled={isSubmitting}
                    renderInput={(params) => (
                      <LoadingTextField
                        {...params}
                        loading={queryResult?.isFetching}
                        label={t("technician_certificates.fields.validator")}
                        margin="normal"
                        variant="standard"
                        error={!!errors.validator}
                        helperText={errors.validator?.message as string}
                        required
                      />
                    )}
                  />
                )}
              />
              <LoadingTextField
                loading={queryResult?.isFetching}
                disabled={isSubmitting}
                registerProps={register("program", {
                  required: "Program is required",
                })}
                error={!!errors?.program}
                helperText={errors.program?.message as string}
                autoFocus
                margin="dense"
                id="program"
                label={t("technician_certificates.fields.program")}
                name="program"
                // defaultValue={"lsdjflksd"}
                fullWidth
                variant="standard"
              />
              <input
                {...register("holder", {
                  required: "Holder is required",
                })}
                hidden
                id="holder"
                name="holder"
              />
              <LoadingTextField
                loading={queryResult?.isFetching}
                disabled={isSubmitting}
                registerProps={register("level", {
                  required: "Level is required",
                })}
                error={!!errors?.level}
                helperText={errors.level?.message as string}
                autoFocus
                margin="dense"
                id="level"
                label={t("technician_certificates.fields.level")}
                name="level"
                // defaultValue={"lsdjflksd"}
                fullWidth
                variant="standard"
              />
            </form>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            color="error"
            startIcon={<CancelOutlined />}
            onClick={() => {
              reset();
              close();
            }}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            type="submit"
            startIcon={<AddCircleOutlineOutlined />}
            loadingPosition="start"
            loading={formLoading}
            // {...saveButtonProps}
            onClick={(e) => submitButtonClick(e)}
          >
            {submitButtonText || "Submit"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
