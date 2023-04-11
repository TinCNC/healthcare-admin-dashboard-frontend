import { SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useTranslate, HttpError } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import { Box } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";

import { LoadingTextField } from "components/form-fields/loading-text-field";

import { IDepartment } from "interfaces";

export const DepartmentEdit: React.FC = () => {
  const t = useTranslate();

  const {
    refineCore: { formLoading, queryResult },
    formState: { errors, isSubmitting },
    saveButtonProps,
    register,
  } = useForm<IDepartment, HttpError, IDepartment>();

  return (
    <Edit
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
        <LoadingTextField
          loading={queryResult?.isFetching}
          disabled={isSubmitting}
          registerProps={register("name", {
            required: t("errors.required.field", { field: "Name" }),
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          margin="normal"
          fullWidth
          label={t("departments.fields.name")}
          name="title"
          autoFocus
        />
        <LoadingTextField
          loading={queryResult?.isFetching}
          disabled={isSubmitting}
          registerProps={register("description", {
            required: t("errors.required.field", { field: "Description" }),
          })}
          error={!!errors.description}
          helperText={errors.description?.message}
          margin="normal"
          label={t("departments.fields.description")}
          multiline
          rows={4}
        />
      </Box>
    </Edit>
  );
};
