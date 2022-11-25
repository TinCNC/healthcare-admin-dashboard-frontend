// import { useState, useEffect, ChangeEvent } from "react";

import { SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useTranslate, HttpError } from "@pankod/refine-core";
import {
  Create,
  Box,
  TextField,
  Autocomplete,
  useAutocomplete,
} from "@pankod/refine-mui";
import { Controller, useForm } from "@pankod/refine-react-hook-form";

import { ILaboratory, ITechnician } from "interfaces";

export const LaboratoryCreate: React.FC = () => {
  const t = useTranslate();

  // const [name, setName] = useState<string>("");

  // const [director, setDirector] = useState<number>();

  // const [address, setAddress] = useState<string>("");

  // const [email, setEmail] = useState<string>("");

  // const [phone, setPhone] = useState<string>("");

  // const [website, setWebsite] = useState<string>("");

  // const [workloadCapacity, setWorkloadCapacity] = useState<number>(0);

  const {
    saveButtonProps,
    register,
    control,
    formState: { errors },
    refineCore: { formLoading },
  } = useForm<
    ILaboratory,
    HttpError,
    ILaboratory & { director: ITechnician }
  >();

  const { autocompleteProps } = useAutocomplete<ITechnician>({
    resource: "technicians",
    onSearch: (value) => [
      {
        field: "name",
        operator: "containss",
        value,
      },
    ],
  });

  // const { data: directorsData, directorsLoading } = useList<ITechnician>({
  //   resource: "techinicians",
  // });

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
          label={t("laboratories.fields.name")}
          name="name"
          // value={name}
          // onChange={(
          //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          // ) => {
          //   setName(event.target.value);
          // }}
          autoFocus
        />
        <Controller
          control={control}
          name="director"
          rules={{ required: "Director is required" }}
          // defaultValue={2 as number}
          render={({ field }) => (
            <Autocomplete
              // multiple
              {...autocompleteProps}
              {...field}
              // value={
              //   defaultValueQueryResult?.data?.data.at(
              //     director as number
              //   ) as ITechnician
              // }
              // value={defaultValueQueryResult?.data?.data[1]}
              // onChange={(
              //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              // ) => {
              //   setName(event.target.value);
              // }}
              onChange={(_, value) => {
                field.onChange(value?.id);
                // console.log(value);
                // setDirector(value?.id);
                // field.onChange(value?.map((item) => item.id));
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
                  // placeholder={defaultValueQueryResult?.data?.data[0].name}
                  label={t("laboratories.fields.director")}
                  margin="normal"
                  variant="outlined"
                  error={!!errors.director}
                  helperText={errors.director?.message as string}
                  // value={defaultValueQueryResult?.data?.data[1]}
                  required
                />
              )}
            />
          )}
        />
        {/* <Controller
          control={control}
          name="type"
          rules={{
            required: t("errors.required.field", { field: "Type" }),
          }}
          render={({ field }) => (
            <Autocomplete
              // {...autocompleteProps}
              options={["University", "College"]}
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined || option.toString() === value.toString()
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("laboratories.fields.director")}
                  margin="normal"
                  variant="outlined"
                  error={!!errors.director}
                  helperText={errors.director?.message}
                  required
                />
              )}
            />
          )}
        /> */}
        <TextField
          {...register("address", {
            required: t("errors.required.field", { field: "Address" }),
          })}
          error={!!errors.address}
          helperText={errors.address?.message}
          margin="normal"
          fullWidth
          label={t("laboratories.fields.address")}
          name="address"
          // value={address}
          // onChange={(
          //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          // ) => {
          //   setAddress(event.target.value);
          // }}
        />
        <TextField
          {...register("email", {
            required: t("errors.required.field", { field: "Email" }),
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          margin="normal"
          fullWidth
          label={t("laboratories.fields.email")}
          name="email"
          // value={email}
          // onChange={(
          //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          // ) => {
          //   setEmail(event.target.value);
          // }}
        />
        <TextField
          {...register("phone", {
            required: t("errors.required.field", { field: "Phone" }),
          })}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          margin="normal"
          fullWidth
          label={t("laboratories.fields.phone")}
          name="phone"
          // value={phone}
          // onChange={(
          //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          // ) => {
          //   setPhone(event.target.value);
          // }}
        />
        <TextField
          {...register("website", {
            required: t("errors.required.field", { field: "Website" }),
          })}
          error={!!errors.website}
          helperText={errors.website?.message}
          margin="normal"
          fullWidth
          label={t("laboratories.fields.website")}
          name="website"
          // value={website}
          // onChange={(
          //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          // ) => {
          //   setWebsite(event.target.value);
          // }}
        />
        <TextField
          {...register("workload_capacity", {
            required: t("errors.required.field", {
              field: "workload_capacity",
            }),
          })}
          error={!!errors.workload_capacity}
          helperText={errors.workload_capacity?.message}
          type="number"
          margin="normal"
          fullWidth
          label={t("laboratories.fields.workload_capacity")}
          name="workload_capacity"
          // value={workloadCapacity}
          // onChange={(
          //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          // ) => {
          //   setWorkloadCapacity(parseInt(event.target.value));
          // }}
        />
      </Box>
    </Create>
  );
};
