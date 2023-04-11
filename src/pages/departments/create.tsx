import { SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useTranslate, HttpError } from "@refinedev/core";
import { Create } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";

import { IDepartment } from "interfaces";

export const DepartmentCreate: React.FC = () => {
  const t = useTranslate();

  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<IDepartment, HttpError, IDepartment>();

  return (
    <Create
      isLoading={formLoading}
      footerButtons={
        <LoadingButton
          type="submit"
          startIcon={<SaveOutlined />}
          loadingPosition="start"
          loading={formLoading}
          variant="contained"
          onClick={async (e) => saveButtonProps.onClick(e)}
        >
          {t("buttons.save")}
        </LoadingButton>
      }
      // saveButtonProps={saveButtonProps}
    >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("name", {
            required: t("errors.required.field", { field: "Name" }),
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          margin="normal"
          fullWidth
          label={t("departments.fields.name")}
          name="name"
          autoFocus
        />
        <TextField
          {...register("description", {
            required: t("errors.required.field", { field: "Description" }),
          })}
          name="description"
          error={!!errors.description}
          helperText={errors.description?.message}
          margin="normal"
          label={t("departments.fields.description")}
          multiline
          rows={4}
        />
      </Box>
    </Create>
  );
};
