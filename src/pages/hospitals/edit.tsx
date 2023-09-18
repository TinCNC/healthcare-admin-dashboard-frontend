import { HttpError, useResource } from "@refinedev/core";
import { Create, Edit } from "@refinedev/mui";
import { Box } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";

import { LoadingTextField } from "components/form-fields/loading-text-field";

import { IHospital } from "interfaces";

export const HospitalEdit: React.FC = () => {
  const { action, id } = useResource();

  const {
    refineCore: { formLoading, queryResult },
    formState: { errors, isSubmitting },
    saveButtonProps,
    register,
  } = useForm<IHospital, HttpError, IHospital>({
    refineCoreProps: { resource: "buildings", id: id },
  });

  const EditForm = (
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
  );

  return action == "edit" ? (
    <Edit
      isLoading={formLoading}
      // footerButtons={<LoadingButton />}
      // saveButtonProps={{
      //   loading: creatingMedicine || formLoading,
      //   // disabled: creatingPatient || formLoading,
      //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
      //   onClick: (e: BaseSyntheticEvent<object, any, any>) => {
      //     handleSubmit(e);
      //   },
      // }}
      saveButtonProps={saveButtonProps}
    >
      {EditForm}
    </Edit>
  ) : (
    <Create
      isLoading={formLoading}
      // footerButtons={<LoadingButton />}
      // saveButtonProps={{
      //   loading: creatingMedicine || formLoading,
      //   // disabled: creatingPatient || formLoading,
      //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
      //   onClick: (e: BaseSyntheticEvent<object, any, any>) => {
      //     handleSubmit(e);
      //   },
      // }}
      saveButtonProps={saveButtonProps}
    >
      {EditForm}
    </Create>
  );

  // return (
  //   <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
  //     {EditForm}
  //   </Edit>
  // );
};
