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

import dayjs, { Dayjs } from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { LoadingButton } from "@mui/lab";

import { IDoctor, IDisease } from "interfaces";
import { AddCircleOutlineOutlined, CancelOutlined } from "@mui/icons-material";

import { UseModalFormReturnType } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { useTranslate } from "@refinedev/core";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LoadingDateTimeField } from "../form-fields/loading-date-time-field";

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

  const [disease, setDisease] = useState<IDisease | null>(null);
  // const [issuer, setIssuer] = useState<IDoctor | null>(null);
  // const [validator, setValidator] = useState<IClinic | null>(null);
  const [examiner, setExaminer] = useState<IDoctor | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    // console.log(getValues());
    // setImageFile(undefined);
    // setImagePreview("");
    // setValue("image", "");
    reset();
    // console.log(getValues());
    setDisease(null);
    // setIssuer(null);
    // setValidator(null);
    setExaminer(null);
    setExaminedAt(dayjs());
    setReexamineAt(null);
    // setIssuedDate(dayjs());
    // setExpiredDate(null);
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
    autocompleteProps: autocompleteDiseaseProps,
    defaultValueQueryResult: defaultValueDiseaseQueryResult,
  } = useAutocomplete<IDisease>({
    resource: "diseases",
    defaultValue: queryResult?.data?.data?.disease,
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

  const {
    autocompleteProps: autocompleteExaminerProps,
    defaultValueQueryResult: defaultValueExaminerQueryResult,
  } = useAutocomplete<IDoctor>({
    resource: "doctors",
    defaultValue: queryResult?.data?.data?.examiner,
    pagination: { current: 1, pageSize: 10000 },
    onSearch: (value: string) => [
      {
        field: "username",
        operator: "containss",
        value,
      },
    ],
  });

  const [examinedAt, setExaminedAt] = React.useState<Dayjs | null>(dayjs());

  const [reexamineAt, setReexamineAt] = React.useState<Dayjs | null>(null);

  // const [issuedDate, setIssuedDate] = React.useState<Dayjs | null>(dayjs());

  // const [expiredDate, setExpiredDate] = React.useState<Dayjs | null>(null);

  useEffect(() => {
    if (defaultValueDiseaseQueryResult?.isFetched && !formLoading) {
      // console.log("loaded validator");
      setDisease(defaultValueDiseaseQueryResult?.data?.data.at(0) || null);
      // setGetAutocompleteValue(false);
    }
  }, [
    formLoading,
    defaultValueDiseaseQueryResult?.isFetched,
    defaultValueDiseaseQueryResult?.data?.data,
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

  useEffect(() => {
    if (defaultValueExaminerQueryResult?.isFetched && !formLoading) {
      // console.log("loaded validator");
      setExaminer(defaultValueExaminerQueryResult?.data?.data.at(0) || null);
      // setGetAutocompleteValue(false);
    }
  }, [
    formLoading,
    defaultValueExaminerQueryResult?.isFetched,
    defaultValueExaminerQueryResult?.data?.data,
  ]); // Only re-run the effect if count changes

  useEffect(() => {
    if (queryResult?.isFetched && !formLoading) {
      // console.log("loaded");

      // const returnedIssedDateValue = queryResult?.data?.data.issued_date;
      // const returnedExpiredAtValue = queryResult?.data?.data.expired_date;

      const returnedExaminedAtValue = queryResult?.data?.data.examined_at;
      const returnedReexamineAtValue = queryResult?.data?.data.reexamine_at;

      if (returnedExaminedAtValue !== null)
        setExaminedAt(dayjs(returnedExaminedAtValue));
      else {
        setExaminedAt(dayjs());
      }

      if (returnedReexamineAtValue !== null)
        setReexamineAt(dayjs(returnedReexamineAtValue));
      else {
        setReexamineAt(null);
      }
      // if (returnedIssedDateValue !== null)
      //   setIssuedDate(dayjs(returnedIssedDateValue));
      // else {
      //   setIssuedDate(null);
      // }
      // if (returnedExpiredAtValue !== null)
      //   setExpiredDate(dayjs(returnedExpiredAtValue));
      // else {
      //   setExpiredDate(null);
      // }
    }
  }, [
    formLoading,
    queryResult?.data?.data.examined_at,
    queryResult?.data?.data.reexamine_at,
    queryResult?.isFetched,
  ]); // Only re-run the effect if count changes

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
        <DialogTitle>
          {t("professional_certificates.titles.create")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the information of the health status certificate belong
            to this person
          </DialogContentText>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
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
              label={t("examination_records.fields.name")}
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
                    setDisease(value);
                  }}
                  value={disease}
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
                      label={t("examination_records.fields.disease")}
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
            <DateTimePicker
              {...register("examined_at", {
                required: "Examined At must not empty",
              })}
              // error={!!errors?.issued_date}
              // helperText={errors.issued_date?.message as string}
              disableFuture
              loading={queryResult?.isFetching}
              label={t("examination_records.fields.examinedAt")}
              openTo="day"
              // views={["year", "month", "day"]}
              disabled={isSubmitting}
              // value={value}
              // onChange={(newValue) => setValue(newValue)}
              value={examinedAt}
              // onChange={}
              onChange={(newValue) => {
                setValue("examined_at", newValue?.toDate().toDateString());
                setExaminedAt(newValue);
              }}
              slotProps={{
                textField: {
                  // loading: queryResult?.isFetching,
                  variant: "standard",
                  error: !!errors?.issued_date,
                  helperText: errors.issued_date?.message as string,
                  fullWidth: true,
                  margin: "dense",
                },
              }}
            />
            <LoadingDateTimeField
              // {...register("reexamine_at", {
              //   required: false,
              // })}
              registerProps={register("reexamine_at", {
                required: false,
              })}
              // error={!!errors?.issued_date}
              // helperText={errors.issued_date?.message as string}
              loading={queryResult?.isFetching}
              label={t("examination_records.fields.reexamineAt")}
              openTo="day"
              // views={["year", "month", "day"]}
              disabled={isSubmitting}
              // value={value}

              // onChange={(newValue) => setValue(newValue)}
              value={reexamineAt}
              // onChange={}
              onChange={(newValue) => {
                setValue("reexamine_at", newValue?.toDate().toDateString());
                setReexamineAt(newValue);
              }}
              slotProps={{
                textField: {
                  // loading: queryResult?.isFetching,
                  variant: "standard",
                  error: !!errors?.issued_date,
                  helperText: errors.issued_date?.message as string,
                  fullWidth: true,
                  margin: "dense",
                },
              }}
            />
            {/* <DatePicker
                {...register("expired_date")}
                disablePast
                label={t("examination_records.fields.expired_date")}
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
              /> */}
            {/* <Controller
              control={control}
              name="issuer"
              rules={{ required: "Issuer is required" }}
              render={({ field }) => (
                <Autocomplete
                  {...autocompleteIssuerProps}
                  {...field}
                  onChange={(_, value) => {
                    field.onChange(value?.id);
                    setIssuer(value);
                  }}
                  value={issuer}
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
                      label={t("examination_records.fields.issuer")}
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
                    setValidator(value);
                  }}
                  value={validator}
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
                      label={t("examination_records.fields.validator")}
                      margin="normal"
                      variant="standard"
                      error={!!errors.validator}
                      helperText={errors.validator?.message as string}
                      required
                    />
                  )}
                />
              )}
            /> */}
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
                    setExaminer(value);
                  }}
                  value={examiner}
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
                      label={t("examination_records.fields.examiner")}
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
              label={t("examination_records.fields.status")}
              name="status"
              fullWidth
              variant="standard"
            />
          </form>
          {/* </LocalizationProvider> */}
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
