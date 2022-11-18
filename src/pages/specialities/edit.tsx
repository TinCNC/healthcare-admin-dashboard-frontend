import { SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useTranslate, HttpError } from "@pankod/refine-core";
import { Edit, Box, TextField } from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";

import { IMedicalSpeciality } from "interfaces";

export const SpecialityEdit: React.FC = () => {
  const t = useTranslate();

  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<IMedicalSpeciality, HttpError, IMedicalSpeciality>();

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
        <TextField
          {...register("name", {
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
        <TextField
          {...register("description", {
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
