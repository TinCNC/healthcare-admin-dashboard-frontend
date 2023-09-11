import React, { useCallback, useEffect, useState } from "react";

import { useAutocomplete } from "@refinedev/mui";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Autocomplete,
} from "@mui/material";

import { LoadingTextField } from "components/form-fields/loading-text-field";

// import dayjs, { Dayjs } from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { LoadingButton } from "@mui/lab";

import { IMedicine } from "interfaces";
import { AddCircleOutlineOutlined, CancelOutlined } from "@mui/icons-material";

import { UseModalFormReturnType } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { useTranslate } from "@refinedev/core";
// import { DateTimePicker } from "@mui/x-date-pickers";
// import { LoadingDateTimeField } from "../form-fields/loading-date-time-field";

export type EditorDataProps = UseModalFormReturnType & {
  submitButtonText?: string;
};

export const PrecriptionEditorDialog: React.FC<EditorDataProps> = ({
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

  const [medicine, setMedicine] = useState<IMedicine | null>(null);
  // const [examiner, setExaminer] = useState<IDoctor | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    reset();
    setMedicine(null);
    setSubmitted(false);
    close();
    return;
  }, [
    close,
    // getValues,
    // imagePreview,
    reset,
    // setValue,
    setSubmitted,
  ]);

  useEffect(() => {
    console.log("submitted:" + submitted);
    console.log("formLoading:" + formLoading);
    if (formLoading === false && submitted) {
      handleClose();
    }
  }, [formLoading, handleClose, submitted]);

  const {
    autocompleteProps: autocompleteMedicineProps,
    defaultValueQueryResult: defaultValueMedicineQueryResult,
  } = useAutocomplete<IMedicine>({
    resource: "medicines",
    defaultValue: queryResult?.data?.data?.medicine,
    pagination: { current: 1, pageSize: 10000 },
    onSearch: (value: string) => [
      {
        field: "name",
        operator: "containss",
        value,
      },
    ],
  });

  // const {
  //   autocompleteProps: autocompleteIssuerProps,
  //   defaultValueQueryResult: defaultValueIssuerQueryResult,
  // } = useAutocomplete<IDoctor>({
  //   resource: "doctors",
  //   defaultValue: queryResult?.data?.data?.issuer,
  //   pagination: { current: 1, pageSize: 10000 },
  //   onSearch: (value: string) => [
  //     {
  //       field: "username",
  //       operator: "containss",
  //       value,
  //     },
  //   ],
  // });

  // const {
  //   autocompleteProps: autocompleteValidatorProps,
  //   defaultValueQueryResult: defaultValueValidatorQueryResult,
  // } = useAutocomplete<IClinic>({
  //   resource: "clinics",
  //   defaultValue: queryResult?.data?.data?.validator,
  //   pagination: { current: 1, pageSize: 10000 },
  //   onSearch: (value: string) => [
  //     {
  //       field: "name",
  //       operator: "containss",
  //       value,
  //     },
  //   ],
  // });

  // const {
  //   autocompleteProps: autocompleteExaminerProps,
  //   defaultValueQueryResult: defaultValueExaminerQueryResult,
  // } = useAutocomplete<IDoctor>({
  //   resource: "doctors",
  //   defaultValue: queryResult?.data?.data?.examiner,
  //   pagination: { current: 1, pageSize: 10000 },
  //   onSearch: (value: string) => [
  //     {
  //       field: "username",
  //       operator: "containss",
  //       value,
  //     },
  //   ],
  // });

  // const [examinedAt, setExaminedAt] = React.useState<Dayjs | null>(dayjs());

  // const [reexamineAt, setReexamineAt] = React.useState<Dayjs | null>(null);

  // const [issuedDate, setIssuedDate] = React.useState<Dayjs | null>(dayjs());

  // const [expiredDate, setExpiredDate] = React.useState<Dayjs | null>(null);

  useEffect(() => {
    if (defaultValueMedicineQueryResult?.isFetched && !formLoading) {
      // console.log("loaded validator");
      setMedicine(defaultValueMedicineQueryResult?.data?.data.at(0) || null);
      // setGetAutocompleteValue(false);
    }
  }, [
    formLoading,
    defaultValueMedicineQueryResult?.isFetched,
    defaultValueMedicineQueryResult?.data?.data,
  ]); // Only re-run the effect if count changes

  // useEffect(() => {
  //   if (defaultValueIssuerQueryResult?.isFetched && !formLoading) {
  //     // console.log("loaded validator");
  //     setIssuer(defaultValueIssuerQueryResult?.data?.data.at(0) || null);
  //     // setGetAutocompleteValue(false);
  //   }
  // }, [
  //   formLoading,
  //   defaultValueIssuerQueryResult?.isFetched,
  //   defaultValueIssuerQueryResult?.data?.data,
  // ]); // Only re-run the effect if count changes

  // useEffect(() => {
  //   if (defaultValueValidatorQueryResult?.isFetched && !formLoading) {
  //     // console.log("loaded validator");
  //     setValidator(defaultValueValidatorQueryResult?.data?.data.at(0) || null);
  //     // setGetAutocompleteValue(false);
  //   }
  // }, [
  //   formLoading,
  //   defaultValueValidatorQueryResult?.isFetched,
  //   defaultValueValidatorQueryResult?.data?.data,
  // ]); // Only re-run the effect if count changes

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitButtonClick = (e: React.BaseSyntheticEvent<object, any, any>) => {
    if (getValues("expired_date") === "") setValue("expired_date", null);
    console.log(getValues());
    saveButtonProps.onClick(e);
    setSubmitted(true);
  };

  return (
    <div>
      <Dialog open={visible} onClose={handleClose}>
        <DialogTitle>{t("precriptions.titles.create")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the information of the prescription
          </DialogContentText>
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
              label={t("precriptions.fields.name")}
              name="name"
              required
              // defaultValue={"lsdjflksd"}
              fullWidth
              variant="standard"
            />
            <Controller
              control={control}
              name="medicine"
              rules={{ required: "Medicine is required" }}
              render={({ field }) => (
                <Autocomplete
                  {...autocompleteMedicineProps}
                  {...field}
                  onChange={(_, value) => {
                    field.onChange(value?.id);
                    setMedicine(value);
                  }}
                  value={medicine}
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
                      label={t("examination_records.fields.medicine")}
                      margin="normal"
                      variant="standard"
                      error={!!errors.medicine}
                      helperText={errors.medicine?.message as string}
                      required
                    />
                  )}
                />
              )}
            />
            <LoadingTextField
              registerProps={register("description", {
                required: false,
              })}
              loading={queryResult?.isFetching}
              disabled={isSubmitting}
              error={!!errors.name}
              helperText={errors.description?.message as string}
              margin="normal"
              fullWidth
              label={t("precriptions.fields.description")}
              name="description"
              rows={10}
              multiline
            />
            <LoadingTextField
              loading={queryResult?.isFetching}
              disabled={isSubmitting}
              registerProps={register("quantity", {
                required: "Quantity is required",
              })}
              error={!!errors?.name}
              helperText={errors.quantity?.message as string}
              type="number"
              autoFocus
              margin="dense"
              id="quantity"
              label={t("precriptions.fields.quantity")}
              name="quantity"
              required
              // defaultValue={"lsdjflksd"}
              fullWidth
              variant="standard"
            />
            <input
              {...register("health_status_certificate", {
                required: "health_status_certificate is required",
              })}
              hidden
              id="health_status_certificate"
              name="health_status_certificate"
              // value={holder}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            color="error"
            startIcon={<CancelOutlined />}
            onClick={handleClose}
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
