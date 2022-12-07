import React from "react";
// import React, { useState } from "react";

import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@pankod/refine-mui";

import { LoadingButton } from "@mui/lab";

import { AddCircleOutlineOutlined, CancelOutlined } from "@mui/icons-material";

import { UseModalFormReturnType } from "@pankod/refine-react-hook-form";
import { useTranslate } from "@pankod/refine-core";

export type DataProps = UseModalFormReturnType & {
  submitButtonText?: string;
};

export const MaterialEditorDialog: React.FC<DataProps> = ({
  register,
  formState: { errors },
  refineCore: { onFinish, formLoading },
  handleSubmit,
  getValues,
  modal: { visible, close },
  saveButtonProps,
  submitButtonText,
  reset,
}) => {
  const t = useTranslate();

  const submitButtonClick = (e: React.BaseSyntheticEvent<object, any, any>) => {
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
        <DialogTitle>{t("materials.titles.create")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the material information
          </DialogContentText>

          <form className="form">
            <input
              {...register("laboratory", {
                required: "Laboratory is required",
              })}
              hidden
              id="laboratory"
              name="laboratory"
            />
            <TextField
              {...register("material_name", {
                required: "Material Name is required",
              })}
              margin="dense"
              error={!!errors?.material_name}
              helperText={errors.material_name?.message as string}
              id="material_name"
              label={t("materials.fields.material_name")}
              name="material_name"
              fullWidth
              variant="standard"
            />
            <TextField
              {...register("price", {
                required: "Price is required",
              })}
              margin="dense"
              error={!!errors?.price}
              helperText={errors.price?.message as string}
              id="price"
              label={t("materials.fields.price")}
              name="price"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              {...register("description")}
              multiline
              rows={4}
              margin="dense"
              id="description"
              label="Description"
              name="description"
              // defaultValue={"lsdjflksd"}
              fullWidth
              variant="standard"
            />
          </form>
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
