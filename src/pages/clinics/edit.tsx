import { HttpError } from "@pankod/refine-core";
import { Box, Edit } from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";

import { LoadingTextField } from "components/form-fields/loading-text-field";

import { IClinic } from "interfaces";

export const ClinicEdit: React.FC = () => {
  const {
    refineCore: { formLoading, queryResult },
    formState: { errors, isSubmitting },
    saveButtonProps,
    register,
  } = useForm<IClinic, HttpError, IClinic>();

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <LoadingTextField
          loading={queryResult?.isFetching}
          disabled={isSubmitting}
          registerProps={register("name", { required: "Name is required" })}
          error={!!errors?.name}
          helperText={errors.name?.message}
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoFocus
        />
        <LoadingTextField
          loading={queryResult?.isFetching}
          disabled={isSubmitting}
          registerProps={register("address", {
            required: "Address is required",
          })}
          error={!!errors?.address}
          helperText={errors.address?.message}
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
        />
        <LoadingTextField
          loading={queryResult?.isFetching}
          disabled={isSubmitting}
          registerProps={register("capacity", {
            min: 10,
            max: 1000,
            required: "Capacity is required",
          })}
          type="number"
          inputProps={{ min: 10, max: 1000 }}
          error={!!errors?.capacity}
          helperText={errors.capacity?.message}
          margin="normal"
          required
          fullWidth
          id="capacity"
          label="Capacity"
          name="capacity"
        />
      </Box>
    </Edit>
  );
};
