import React from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useAutocomplete,
  Autocomplete,
} from "@pankod/refine-mui";

import { LoadingTextField } from "components/form-fields/loading-text-field";

import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { LoadingButton } from "@mui/lab";

import { IDoctor, IClinic, IDisease } from "interfaces";
import { AddCircleOutlineOutlined, CancelOutlined } from "@mui/icons-material";

import {
  Controller,
  UseModalFormReturnType,
} from "@pankod/refine-react-hook-form";
import { useTranslate } from "@pankod/refine-core";

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

  const { autocompleteProps: autocompleteDiseaseProps } =
    useAutocomplete<IDisease>({
      resource: "diseases",
      pagination: { current: 1, pageSize: 10000 },
      onSearch: (value) => [
        {
          field: "name",
          operator: "containss",
          value,
        },
      ],
    });

  const { autocompleteProps: autocompleteIssuerProps } =
    useAutocomplete<IDoctor>({
      resource: "doctors",
      pagination: { current: 1, pageSize: 10000 },
      onSearch: (value) => [
        {
          field: "username",
          operator: "containss",
          value,
        },
      ],
    });

  const { autocompleteProps: autocompleteValidatorProps } =
    useAutocomplete<IClinic>({
      resource: "clinics",
      pagination: { current: 1, pageSize: 10000 },
      onSearch: (value) => [
        {
          field: "name",
          operator: "containss",
          value,
        },
      ],
    });

  const { autocompleteProps: autocompleteExaminerProps } =
    useAutocomplete<IDoctor>({
      resource: "doctors",
      pagination: { current: 1, pageSize: 10000 },
      onSearch: (value) => [
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
        <DialogTitle>
          {t("professional_certificates.titles.create")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the information of the health status certificate belong
            to this person
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
                label={t("health_status_certificates.fields.name")}
                name="name"
                required
                // defaultValue={"lsdjflksd"}
                fullWidth
                variant="standard"
              />
              <Controller
                control={control}
                name="disease"
                rules={{ required: "Disease is required" }}
                render={({ field }) => (
                  <Autocomplete
                    {...autocompleteDiseaseProps}
                    {...field}
                    onChange={(_, value) => {
                      field.onChange(value?.id);
                    }}
                    disabled={isSubmitting}
                    getOptionLabel={(item) => {
                      return item.name ? item.name : "";
                    }}
                    isOptionEqualToValue={(option, value) =>
                      value === undefined || option.id === value.id
                    }
                    renderInput={(params) => (
                      <LoadingTextField
                        loading={queryResult?.isFetching}
                        {...params}
                        label={t("health_status_certificates.fields.disease")}
                        margin="normal"
                        variant="standard"
                        error={!!errors.disease}
                        helperText={errors.disease?.message as string}
                        required
                      />
                    )}
                  />
                )}
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
                label={t("health_status_certificates.fields.issued_date")}
                openTo="day"
                views={["year", "month", "day"]}
                value={issuedDate}
                disabled={isSubmitting}
                onChange={(newValue) => {
                  setValue("issued_date", newValue?.toDate().toDateString());
                  setIssuedDate(newValue);
                }}
                renderInput={(params) => (
                  <LoadingTextField
                    loading={queryResult?.isFetching}
                    required
                    error={!!errors?.issued_date}
                    helperText={errors.issued_date?.message as string}
                    fullWidth
                    variant="standard"
                    margin="dense"
                    {...params}
                  />
                )}
              />
              <DatePicker
                {...register("expired_date")}
                disablePast
                label={t("health_status_certificates.fields.expired_date")}
                openTo="day"
                views={["year", "month", "day"]}
                value={expiredDate}
                disabled={isSubmitting}
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
                      return item.username
                        ? item.username +
                            ": " +
                            item.first_name +
                            " " +
                            item.last_name
                        : "";
                    }}
                    disabled={isSubmitting}
                    isOptionEqualToValue={(option, value) =>
                      value === undefined || option.id === value.id
                    }
                    renderInput={(params) => (
                      <LoadingTextField
                        loading={queryResult?.isFetching}
                        {...params}
                        label={t("health_status_certificates.fields.issuer")}
                        margin="normal"
                        variant="standard"
                        error={!!errors.creator}
                        helperText={errors.creator?.message as string}
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
                      return item.name ? item.name : "";
                    }}
                    isOptionEqualToValue={(option, value) =>
                      value === undefined || option.id === value.id
                    }
                    disabled={isSubmitting}
                    renderInput={(params) => (
                      <LoadingTextField
                        loading={queryResult?.isFetching}
                        {...params}
                        label={t("health_status_certificates.fields.validator")}
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
              <Controller
                control={control}
                name="examiner"
                rules={{ required: "Examiner is required" }}
                render={({ field }) => (
                  <Autocomplete
                    {...autocompleteExaminerProps}
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
                        label={t("health_status_certificates.fields.examiner")}
                        margin="normal"
                        variant="standard"
                        error={!!errors.examiner}
                        helperText={errors.examiner?.message as string}
                        required
                      />
                    )}
                  />
                )}
              />
              <input
                {...register("holder", {
                  required: "Holder is required",
                })}
                hidden
                id="holder"
                name="holder"
                // value={holder}
              />
              <LoadingTextField
                loading={queryResult?.isFetching}
                disabled={isSubmitting}
                registerProps={register("status", {
                  required: "Status is required",
                })}
                margin="dense"
                error={!!errors?.status}
                helperText={errors.status?.message as string}
                required
                id="status"
                label={t("health_status_certificates.fields.status")}
                name="status"
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
