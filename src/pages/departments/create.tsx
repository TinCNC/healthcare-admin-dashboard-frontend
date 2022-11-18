import { useTranslate, HttpError } from "@pankod/refine-core";
import { Create, Box, TextField } from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";

import { IDepartment } from "interfaces";

export const DepartmentCreate: React.FC = () => {
  const t = useTranslate();

  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<IDepartment, HttpError, IDepartment>();

  return (
    <Create saveButtonProps={saveButtonProps}>
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
