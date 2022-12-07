import React, { useState } from "react";

import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useAutocomplete,
  Autocomplete,
} from "@pankod/refine-mui";

import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { LoadingButton } from "@mui/lab";

import { ILaboratory, IMaterial } from "interfaces";
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

  const [laboratory, setLaboratory] = useState<number>(0);

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

  const { autocompleteProps: autocompleteMaterialProps } =
    useAutocomplete<IMaterial>({
      resource: "materials",
      filters: [{ field: "laboratory", operator: "eq", value: laboratory }],
      onSearch: (value) => [
        {
          field: "material_name",
          operator: "containss",
          value,
        },
      ],
      queryOptions: {
        enabled: !!laboratory || laboratory !== 0,
      },
    });

  const [issuedDate, setIssuedDate] = React.useState<Dayjs | null>(dayjs());

  // const [expiredAt, setExpiredAt] = React.useState<Dayjs | null>(null);

  const submitButtonClick = (e: React.BaseSyntheticEvent<object, any, any>) => {
    // if (getValues("expired_at") === "") setValue("expired_at", null);
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
              <Controller
                control={control}
                name="laboratory"
                rules={{ required: "Laboratory is required" }}
                render={({ field }) => (
                  <Autocomplete
                    {...autocompleteLaboratoryProps}
                    {...field}
                    onChange={(_, value) => {
                      field.onChange(value?.id);
                      setLaboratory(value?.id || 0);
                      setValue("material", undefined);
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
                        label={t("orders.fields.laboratory")}
                        margin="normal"
                        variant="standard"
                        error={!!errors.laboratory}
                        helperText={errors.laboratory?.message as string}
                      />
                    )}
                  />
                )}
              />
              <Controller
                control={control}
                name="material"
                rules={{ required: "Material is required" }}
                render={({ field }) => (
                  <Autocomplete
                    {...autocompleteMaterialProps}
                    {...field}
                    onChange={(_, value) => {
                      field.onChange(value?.id);
                    }}
                    getOptionLabel={(item) => {
                      return item.material_name
                        ? item.material_name + " $" + item.price
                        : "";
                    }}
                    isOptionEqualToValue={(option, value) =>
                      value === undefined || option.id === value.id
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("orders.fields.material")}
                        margin="normal"
                        variant="standard"
                        error={!!errors.material}
                        helperText={errors.material?.message as string}
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
              <input
                {...register("product_id", {
                  required: "Product is required",
                })}
                hidden
                id="product_id"
                name="product_id"
                // value={holder}
              />
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
