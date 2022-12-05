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
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { LoadingButton } from "@mui/lab";

import {
  ILaboratory,
  IMedicalSpeciality,
  IOrganization,
  ITechnician,
  IProduct,
} from "interfaces";
import { AddCircleOutlineOutlined, CancelOutlined } from "@mui/icons-material";

import {
  Controller,
  UseModalFormReturnType,
} from "@pankod/refine-react-hook-form";
import { useTranslate } from "@pankod/refine-core";

export type DataProps = UseModalFormReturnType & {
  submitButtonText?: string;
};

export const OrderEditorDialog: React.FC<DataProps> = ({
  register,
  control,
  formState: { errors },
  refineCore: { onFinish, formLoading },
  handleSubmit,
  getValues,
  setValue,
  modal: { visible, close },
  saveButtonProps,
  submitButtonText,
  reset,
}) => {
  const t = useTranslate();

  const { autocompleteProps: autocompleteLaboratoryProps } =
    useAutocomplete<ILaboratory>({
      resource: "laboratories",
      onSearch: (value) => [
        {
          field: "name",
          operator: "containss",
          value,
        },
      ],
    });

  // const { autocompleteProps: autocompleteProductProps } =
  //   useAutocomplete<IProduct>({
  //     resource: "products",
  //     onSearch: (value) => [
  //       {
  //         field: "name",
  //         operator: "containss",
  //         value,
  //       },
  //     ],
  //   });

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

  const { autocompleteProps: autocompleteSpecialityProps } =
    useAutocomplete<IMedicalSpeciality>({
      resource: "medical_specialities",
      pagination: { current: 1, pageSize: 10000 },
      onSearch: (value) => [
        {
          field: "name",
          operator: "containss",
          value,
        },
      ],
    });

  const [issuedDate, setIssuedDate] = React.useState<Dayjs | null>(dayjs());

  // const [expiredAt, setExpiredAt] = React.useState<Dayjs | null>(null);

  const submitButtonClick = (e: React.BaseSyntheticEvent<object, any, any>) => {
    if (getValues("expired_at") === "") setValue("expired_at", null);
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
        <DialogTitle>{t("orders.titles.create")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the order information of this product
          </DialogContentText>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form className="form" onSubmit={handleSubmit(onFinish)}>
              {/* <Controller
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
                      />
                    )}
                  />
                )}
              /> */}
              {/* <TextField
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
              /> */}
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
                {...register("delivery_time", {
                  required: "Delivery Time is required",
                })}
                disablePast
                label={t("orders.fields.delivery_time")}
                openTo="day"
                // views={["year", "month", "day"]}
                value={issuedDate}
                onChange={(newValue) => {
                  setValue("delivery_time", newValue?.toDate().toDateString());
                  setIssuedDate(newValue);
                }}
                renderInput={(params) => (
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
              {/* <DatePicker
                {...register("expired_at")}
                // id="expired_at"
                // error={!!errors?.expired_at}
                // helperText={errors.expired_at?.message as string}
                disablePast
                label="Expired At"
                openTo="day"
                views={["year", "month", "day"]}
                value={expiredAt}
                onChange={(newValue) => {
                  console.log(newValue);
                  if (newValue === null) setValue("expired_at", null);
                  else {
                    setValue(
                      "expired_at",
                      newValue?.toDate().toLocaleDateString()
                    );
                  }
                  setExpiredAt(newValue);
                  console.log(getValues());
                }}
                renderInput={(
                  params: JSX.IntrinsicAttributes & TextFieldProps
                ) => (
                  <TextField
                    // required
                    // error={!!errors?.expired_at}
                    // helperText={errors.expired_at?.message as string}
                    fullWidth
                    variant="standard"
                    margin="dense"
                    // name="expired_at"
                    {...params}
                  />
                )}
              /> */}
              {/* <Controller
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
                        error={!!errors.validator}
                        helperText={errors.validator?.message as string}
                      />
                    )}
                  />
                )}
              />
              <Controller
                control={control}
                name="speciality"
                rules={{ required: "Speciality is required" }}
                render={({ field }) => (
                  <Autocomplete
                    {...autocompleteSpecialityProps}
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
                        label={t("professional_certificates.fields.speciality")}
                        margin="normal"
                        variant="standard"
                        error={!!errors.speciality}
                        helperText={errors.speciality?.message as string}
                      />
                    )}
                  />
                )}
              /> */}
              <input
                {...register("product_id", {
                  required: "Product is required",
                })}
                hidden
                id="product_id"
                name="product_id"
              // value={holder}
              />
              {/* <TextField
                {...register("program", {
                  required: "Program is required",
                })}
                margin="dense"
                error={!!errors?.program}
                helperText={errors.program?.message as string}
                id="program"
                label={t("professional_certificates.fields.program")}
                name="program"
                fullWidth
                variant="standard"
              /> */}
              <TextField
                {...register("quantity", {
                  required: "Level is required",
                })}
                margin="dense"
                error={!!errors?.quantity}
                helperText={errors.quantity?.message as string}
                id="level"
                label={t("orders.fields.quantity")}
                name="quantity"
                type="number"
                fullWidth
                variant="standard"
              />
              {/* <Controller
                control={control}
                name="type"
                // rules={{
                //   required: t("errors.required.field", { field: "Type" }),
                // }}
                rules={{ required: "Type is required" }}
                render={({ field }) => (
                  <Autocomplete
                    options={[
                      "Medical Degree",
                      "Specialized Medical Degree",
                      "Permission of Medical Professional Practices",
                    ]}
                    {...field}
                    onChange={(_, value) => {
                      field.onChange(value);
                    }}
                    // getOptionLabel={(item) => {
                    //   return (
                    //     autocompleteProps?.options?.find(
                    //       (p) => p?.id?.toString() === item?.id?.toString()
                    //     )?.title ?? ""
                    //   );
                    // }}
                    isOptionEqualToValue={(option, value) =>
                      value === undefined ||
                      option.toString() === value.toString()
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("professional_certificates.fields.type")}
                        margin="normal"
                        variant="standard"
                        error={!!errors?.type}
                        helperText={errors.type?.message as string}
                        required
                      />
                    )}
                  />
                )}
              /> */}
            </form>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={close}>Cancel</Button> */}
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
          {/* <Button onClick={handleClose}>Add Certificate</Button> */}
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
