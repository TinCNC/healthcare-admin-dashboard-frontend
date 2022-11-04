// import React, { useState } from "react";
import React from "react";

import {
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

import { LoadingButton } from "@mui/lab";

import { IOrganization, ITechnician } from "interfaces";
import { AddCircleOutlineOutlined, CancelOutlined } from "@mui/icons-material";

import {
  Controller,
  UseModalFormReturnType,
} from "@pankod/refine-react-hook-form";
import { useTranslate } from "@pankod/refine-core";

export const CertificateEditorDialog: React.FC<UseModalFormReturnType> = ({
  register,
  control,
  formState: { errors },
  refineCore: { onFinish, formLoading },
  handleSubmit,
  getValues,
  setValue,
  modal: { visible, close },
  saveButtonProps,
}) => {
  // const {
  //   refineCore: { onFinish, formLoading },
  //   saveButtonProps,
  //   register,
  //   control,
  //   handleSubmit,
  //   getValues,
  //   formState: { errors },
  // } = useForm<
  //   IProfessionalCertificates,
  //   HttpError,
  //   IProfessionalCertificates & {
  //     creator: IOrganization;
  //     validator: ITechnician;
  //   }
  // >({
  //   refineCoreProps: {
  //     action: "create",
  //     resource: "professional_certificates",
  //     redirect: false,
  //     //   onMutationSuccess: {

  //     //   }
  //     // You can define all properties provided by refine useForm
  //   },
  // });
  const t = useTranslate();

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

  const submitButtonClick = (e: React.BaseSyntheticEvent<object, any, any>) => {
    console.log(getValues());
    saveButtonProps.onClick(e);
  };

  return (
    <div>
      <Dialog open={visible} onClose={close}>
        <DialogTitle>
          {t("professional_certificates.titles.create")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the information of the professional certificate belong
            to this person
          </DialogContentText>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form className="form" onSubmit={handleSubmit(onFinish)}>
              <TextField
                {...register("name", { required: "Name is required" })}
                error={!!errors?.name}
                helperText={errors.name?.message as string}
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                name="name"
                required
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
                // id="issued_date"
                label="Issued Date"
                openTo="day"
                views={["year", "month", "day"]}
                value={issuedDate}
                onChange={(newValue) => {
                  setValue("issued_date", newValue?.toDate().toDateString());
                  setIssuedDate(newValue);
                }}
                renderInput={(
                  params: JSX.IntrinsicAttributes & TextFieldProps
                ) => (
                  <TextField
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
                {...register("expired_at", {
                  required: "Expired At is required",
                })}
                // id="expired_at"
                // error={!!errors?.expired_at}
                // helperText={errors.expired_at?.message as string}
                disablePast
                label="Expired At"
                openTo="day"
                views={["year", "month", "day"]}
                value={expiredAt}
                onChange={(newValue) => {
                  setValue(
                    "expired_at",
                    newValue?.toDate().toLocaleDateString()
                  );
                  setExpiredAt(newValue);
                }}
                renderInput={(
                  params: JSX.IntrinsicAttributes & TextFieldProps
                ) => (
                  <TextField
                    required
                    error={!!errors?.expired_at}
                    helperText={errors.expired_at?.message as string}
                    fullWidth
                    variant="standard"
                    margin="dense"
                    // name="expired_at"
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
                        helperText={errors.creator?.message as string}
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
              <TextField
                {...register("program", {
                  required: "Program is required",
                })}
                margin="dense"
                error={!!errors?.program}
                helperText={errors.program?.message as string}
                required
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
                error={!!errors?.level}
                helperText={errors.level?.message as string}
                required
                id="level"
                label={t("professional_certificates.fields.level")}
                name="level"
                type="number"
                fullWidth
                variant="standard"
              />
            </form>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={close}>Cancel</Button> */}
          <LoadingButton startIcon={<CancelOutlined />} onClick={close}>
            Cancel
          </LoadingButton>
          {/* <Button onClick={handleClose}>Add Certificate</Button> */}
          <LoadingButton
            type="submit"
            startIcon={<AddCircleOutlineOutlined />}
            loadingPosition="start"
            loading={formLoading}
            // {...saveButtonProps}
            onClick={(e) => submitButtonClick(e)}
          >
            Add Certificate
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
