import { useState, useEffect, ChangeEvent } from "react";

import { SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useTranslate, HttpError } from "@refinedev/core";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { Box, TextField, Autocomplete } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import { ILaboratory, ITechnician } from "interfaces";
import { LoadingTextField } from "@/components/form-fields/loading-text-field";

export const LaboratoryEdit: React.FC = () => {
  const t = useTranslate();

  const [name, setName] = useState<string>("");

  const [director, setDirector] = useState<ITechnician | null>(null);

  const [address, setAddress] = useState<string>("");

  const [email, setEmail] = useState<string>("");

  const [phone, setPhone] = useState<string>("");

  const [website, setWebsite] = useState<string>("");

  const [workloadCapacity, setWorkloadCapacity] = useState<number>(0);

  const {
    saveButtonProps,
    register,
    control,
    getValues,
    formState: { errors, isSubmitting },
    refineCore: { formLoading, queryResult },
    reset,
  } = useForm<
    ILaboratory,
    HttpError,
    ILaboratory & { director: ITechnician }
  >();

  const { autocompleteProps, defaultValueQueryResult } =
    useAutocomplete<ITechnician>({
      resource: "technicians",
      pagination: { current: 1, pageSize: 10000 },
      onSearch: (value: string) => [
        {
          field: "name",
          operator: "containss",
          value,
        },
      ],
      defaultValue: queryResult?.data?.data.director,
    });

  useEffect(() => {
    if (defaultValueQueryResult?.isFetched && !formLoading) {
      console.log("loaded");
      setDirector(defaultValueQueryResult?.data?.data.at(0) || null);
      // setGetAutocompleteValue(false);
    }
  }, [
    formLoading,
    defaultValueQueryResult?.isFetched,
    defaultValueQueryResult?.data?.data,
  ]); // Only re-run the effect if count changes

  useEffect(() => {
    if (!formLoading && !queryResult?.isLoading) {
      console.log(getValues());
      // reset();
      setName(getValues("name"));
      // setDirector(getValues("director") || undefined);
      setAddress(getValues("address"));
      setEmail(getValues("email"));
      setPhone(getValues("phone"));
      setWebsite(getValues("website"));
      setWorkloadCapacity(getValues("workload_capacity"));
      // console.log(defaultValueQueryResult.data?.data);
    }
  }, [getValues, reset, queryResult?.isLoading, formLoading]);

  // const { data: directorsData, directorsLoading } = useList<ITechnician>({
  //   resource: "techinicians",
  // });

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
        {/* <LoadingTextField
          loading={queryResult?.isFetching}
          // disabled={isSubmitting}
          registerProps={register("name", {
            required: "Username is required",
          })}
          error={!!errors?.name}
          helperText={errors.name?.message}
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoFocus
        /> */}
        <LoadingTextField
          registerProps={register("name", {
            required: t("errors.required.field", { field: "Name" }),
          })}
          loading={queryResult?.isFetching}
          disabled={isSubmitting}
          error={!!errors.name}
          helperText={errors.name?.message}
          margin="normal"
          fullWidth
          label={t("laboratories.fields.name")}
          name="name"
          value={name}
          onChange={(
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setName(event.target.value);
          }}
          autoFocus
        />
        {/* <TextField
          {...register("name", {
            required: t("errors.required.field", { field: "Name" }),
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          margin="normal"
          fullWidth
          label={t("laboratories.fields.name")}
          name="name"
          value={name}
          onChange={(
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setName(event.target.value);
          }}
          autoFocus
        /> */}
        <Controller
          control={control}
          name="director"
          rules={{ required: "Director is required" }}
          render={({ field }) => (
            <Autocomplete
              {...autocompleteProps}
              {...field}
              value={director}
              onChange={(_, value) => {
                setDirector(value);
                field.onChange(value?.id);
              }}
              getOptionLabel={(item) => {
                return item.username
                  ? item.username +
                      ": " +
                      item.first_name +
                      " " +
                      item.last_name
                  : "";
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined || option.id === value.id
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("laboratories.fields.director")}
                  margin="normal"
                  variant="outlined"
                  error={!!errors.director}
                  helperText={errors.director?.message as string}
                  required
                />
              )}
            />
          )}
        />
        <LoadingTextField
          registerProps={register("address", {
            required: t("errors.required.field", { field: "Address" }),
          })}
          // {...register("address", {
          //   required: t("errors.required.field", { field: "Address" }),
          // })}
          error={!!errors.address}
          helperText={errors.address?.message}
          loading={queryResult?.isFetching}
          disabled={isSubmitting}
          margin="normal"
          fullWidth
          label={t("laboratories.fields.address")}
          name="address"
          value={address}
          onChange={(
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setAddress(event.target.value);
          }}
        />
        <LoadingTextField
          registerProps={register("email", {
            required: t("errors.required.field", { field: "Email" }),
          })}
          // {...register("email", {
          //   required: t("errors.required.field", { field: "Email" }),
          // })}
          error={!!errors.email}
          helperText={errors.email?.message}
          loading={queryResult?.isFetching}
          disabled={isSubmitting}
          margin="normal"
          fullWidth
          label={t("laboratories.fields.email")}
          name="email"
          value={email}
          onChange={(
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setEmail(event.target.value);
          }}
        />
        <LoadingTextField
          registerProps={register("phone", {
            required: t("errors.required.field", { field: "Phone" }),
          })}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          loading={queryResult?.isFetching}
          disabled={isSubmitting}
          margin="normal"
          fullWidth
          label={t("laboratories.fields.phone")}
          name="phone"
          value={phone}
          onChange={(
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setPhone(event.target.value);
          }}
        />
        <LoadingTextField
          registerProps={register("website", {
            required: t("errors.required.field", { field: "Website" }),
          })}
          error={!!errors.website}
          helperText={errors.website?.message}
          loading={queryResult?.isFetching}
          disabled={isSubmitting}
          margin="normal"
          fullWidth
          label={t("laboratories.fields.website")}
          name="website"
          value={website}
          onChange={(
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setWebsite(event.target.value);
          }}
        />
        <LoadingTextField
          registerProps={register("workload_capacity", {
            required: t("errors.required.field", {
              field: "workload_capacity",
            }),
          })}
          error={!!errors.workload_capacity}
          helperText={errors.workload_capacity?.message}
          loading={queryResult?.isFetching}
          disabled={isSubmitting}
          type="number"
          margin="normal"
          fullWidth
          label={t("laboratories.fields.workload_capacity")}
          name="workload_capacity"
          value={workloadCapacity}
          onChange={(
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setWorkloadCapacity(parseInt(event.target.value));
          }}
        />
      </Box>
    </Edit>
  );
};
