import { HttpError } from "@refinedev/core";

import {
// Autocomplete,
// useAutocomplete,
Create
} from "@refinedev/mui";

import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import { IClinic } from "interfaces";

export const ClinicCreate: React.FC = () => {
  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    control,
    formState: { errors },
  } = useForm<IClinic, HttpError, IClinic>();

  // const { autocompleteProps } = useAutocomplete<IClinic>({
  //   resource: "clinics",
  //   onSearch: (value) => [
  //     {
  //       field: "name",
  //       operator: "containss",
  //       value,
  //     },
  //   ],
  // });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("name", { required: "Name is required" })}
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
        <TextField
          {...register("address", { required: "Address is required" })}
          error={!!errors?.address}
          helperText={errors.address?.message}
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
        />
        <TextField
          {...register("capacity", {
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
    </Create>
  );
};
