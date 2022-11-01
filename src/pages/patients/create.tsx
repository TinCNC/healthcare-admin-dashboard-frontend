import { HttpError } from "@pankod/refine-core";
import {
  Box,
  TextField,
  Autocomplete,
  useAutocomplete,
  Create,
} from "@pankod/refine-mui";
import { useForm, Controller } from "@pankod/refine-react-hook-form";

import { IPatient, IClinic } from "interfaces";

export const PatientCreate: React.FC = () => {
  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    control,
    formState: { errors },
  } = useForm<IPatient, HttpError, IPatient & { clinic: IClinic }>();

  const { autocompleteProps } = useAutocomplete<IClinic>({
    resource: "clinics",
    onSearch: (value) => [
      {
        field: "name",
        operator: "containss",
        value,
      },
    ],
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("username", { required: "Username is required" })}
          error={!!errors?.username}
          helperText={errors.username?.message}
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoFocus
        />
        <TextField
          {...register("first_name", { required: "First Name is required" })}
          error={!!errors?.first_name}
          helperText={errors.first_name?.message}
          margin="normal"
          required
          fullWidth
          id="first_name"
          label="First Name"
          name="first_name"
        />
        <TextField
          {...register("last_name", { required: "Last Name is required" })}
          error={!!errors?.last_name}
          helperText={errors.last_name?.message}
          margin="normal"
          required
          fullWidth
          id="last_name"
          label="Last Name"
          name="last_name"
        />
        {/* <Controller
          control={control}
          name="status"
          rules={{ required: "Status is required" }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={["published", "draft", "rejected"]}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Status"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.status}
                  helperText={errors.status?.message}
                  required
                />
              )}
            />
          )}
        /> */}
        <Controller
          control={control}
          name="clinic"
          rules={{ required: "Clinic is required" }}
          render={({ field }) => (
            <Autocomplete
              {...autocompleteProps}
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
                  label="Clinic"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.clinic}
                  helperText={errors.clinic?.message}
                  required
                />
              )}
            />
          )}
        />
      </Box>
    </Create>
  );
};
