import { HttpError } from "@refinedev/core";
import { useAutocomplete, Edit } from "@refinedev/mui";
import {
  Box,
  Autocomplete,
  Input,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LoadingTextField } from "components/form-fields/loading-text-field";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import { IPatient, IClinic } from "interfaces";

import { FileUpload } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { BaseSyntheticEvent, useState, useEffect } from "react";

import { uploadImage, getPublicImageUrl } from "api";
import { LoadingAvatar } from "components/form-fields/loading-avatar";

import { useTranslate } from "@refinedev/core";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

export const PatientEdit: React.FC = () => {
  const {
    refineCore: { formLoading, queryResult },
    formState: { errors, isSubmitting },
    saveButtonProps,
    register,
    control,
    getValues,
    setValue,
  } = useForm<IPatient, HttpError, IPatient & { clinic: IClinic }>();

  const [imagePreview, setImagePreview] = useState<string>("");

  const [dob, setDob] = useState<Dayjs | null>();

  const [imageFile, setImageFile] = useState<File>();

  const [creatingPatient, setCreatingPatient] = useState<boolean>(false);

  const t = useTranslate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: BaseSyntheticEvent<object, any, any>) => {
    // console.log(saveButtonProps);

    try {
      if (imageFile !== undefined) {
        setCreatingPatient(true);
        const uploaded = await uploadImage(
          imageFile,
          "profile-image",
          `patients/${getValues("identity_number")}/`
        );
        if (uploaded !== undefined) {
          const imageUrl = await getPublicImageUrl(
            "profile-image",
            uploaded?.path
          );
          if (imageUrl !== undefined) setValue("image", imageUrl?.publicUrl);
        }
      }

      setCreatingPatient(true);
      saveButtonProps.onClick(e);
      // throw new Error("Function not implemented.");
    } catch (error) {
      setCreatingPatient(false);
    }
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      console.log(getValues());

      const target = event.target;
      const file: File = (target.files as FileList)[0];

      setImageFile(file);

      console.log(imageFile);
      setImagePreview(URL.createObjectURL(file));
    } catch (error) {
      // setError("images", { message: "Upload failed. Please try again." });
      // setIsUploadLoading(false);
    }
  };

  const [clinic, setClinic] = useState<IClinic | null>(null);

  const { autocompleteProps, defaultValueQueryResult } =
    useAutocomplete<IClinic>({
      resource: "clinics",
      pagination: { current: 1, pageSize: 10000 },
      onSearch: (value: string) => [
        {
          field: "name",
          operator: "containss",
          value,
        },
      ],
      defaultValue: queryResult?.data?.data.clinic,
    });

  useEffect(() => {
    if (queryResult?.isFetched && !formLoading) {
      console.log("loaded");
      if (queryResult?.data?.data?.dob !== null)
        setDob(dayjs(queryResult?.data?.data?.dob));
      else {
        setDob(null);
      }
      // setGetAutocompleteValue(false);
    }
  }, [formLoading, queryResult?.isFetched, queryResult?.data?.data]); // Only re-run the effect if count changes

  useEffect(() => {
    if (defaultValueQueryResult?.isFetched && !formLoading) {
      console.log("loaded");
      setClinic(defaultValueQueryResult?.data?.data.at(0) || null);
      // setGetAutocompleteValue(false);
    }
  }, [
    formLoading,
    defaultValueQueryResult?.isFetched,
    defaultValueQueryResult?.data?.data,
  ]); // Only re-run the effect if count changes

  // console.log(defaultValueQueryResult?.data?.data[0]);

  return (
    <Edit
      isLoading={formLoading}
      saveButtonProps={{
        disabled: creatingPatient,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick: (e: BaseSyntheticEvent<object, any, any>) => {
          handleSubmit(e);
        },
      }}
    >
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Stack gap={1}>
          <LoadingAvatar
            loading={queryResult?.isFetching}
            alt={getValues("identity_number")}
            src={imagePreview || getValues("image")}
            sx={{ width: 320, height: 320 }}
          />
          <label htmlFor="images-input">
            <Input
              id="images-input"
              type="file"
              sx={{ display: "none" }}
              onChange={onChangeHandler}
              // onChange={(event) => {
              //   console.log(event.target);
              // }}
            />
            <input
              id="file"
              {...register("image", {
                required: "This field is required",
              })}
              type="hidden"
            />
            <LoadingButton
              // loading={isUploadLoading}
              loadingPosition="start"
              startIcon={<FileUpload />}
              variant="contained"
              component="span"
            >
              Upload
            </LoadingButton>
            <br />
            {/* {errors.image && (
                            <Typography variant="caption" color="#fa541c">
                                {errors.image?.message}
                            </Typography>
                        )} */}
          </label>
        </Stack>
        <Stack gap={1} width="100%">
          <Box
            component="form"
            // sx={{ display: "flex", flexDirection: "column" }}
            autoComplete="off"
          >
            <LoadingTextField
              loading={queryResult?.isFetching}
              disabled={isSubmitting}
              registerProps={register("identity_number", {
                required: "identity_card is required",
              })}
              error={!!errors?.identity_number}
              helperText={errors.identity_number?.message}
              margin="normal"
              required
              fullWidth
              id="identity_number"
              label={t("patients.fields.identity_number")}
              name="identity_number"
              autoFocus
            />

            <LoadingTextField
              loading={queryResult?.isFetching}
              disabled={isSubmitting}
              registerProps={register("first_name", {
                required: "First Name is required",
              })}
              error={!!errors?.first_name}
              helperText={errors.first_name?.message}
              margin="normal"
              required
              fullWidth
              id="first_name"
              label="First Name"
              name="first_name"
            />
            <LoadingTextField
              loading={queryResult?.isFetching}
              disabled={isSubmitting}
              registerProps={register("last_name", {
                required: "Last Name is required",
              })}
              error={!!errors?.last_name}
              helperText={errors.last_name?.message}
              margin="normal"
              required
              fullWidth
              id="last_name"
              label="Last Name"
              name="last_name"
            />
            <DatePicker
              {...register("dob")}
              // id="expired_at"
              // error={!!errors?.expired_at}
              // helperText={errors.expired_at?.message as string}
              disablePast
              label={t("patients.fields.dob")}
              openTo="day"
              views={["year", "month", "day"]}
              value={dob}
              // disabled={isSubmitting}
              onChange={(newValue) => {
                setValue("dob", newValue?.toDate().toDateString() as string);
                setDob(newValue);
              }}
              // onChange={(newValue) => {
              //   console.log(newValue);
              //   // console.log(queryResult?.data?.data?.id);
              //   if (newValue === null) setValue("dob", null);
              //   else {
              //     setValue("dob", newValue?.toDate().toLocaleDateString());
              //   }
              //   setDob(newValue);
              //   // console.log(getValues());
              // }}
              slotProps={{
                textField: {
                  // loading: queryResult?.isFetching,
                  // variant: "standard",
                  error: !!errors?.dob,
                  helperText: errors.dob?.message as string,
                  fullWidth: true,
                  margin: "dense",
                },
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="gender">Gender</InputLabel>
              <Select
                labelId="gender"
                id="gender"
                // value={age}
                label="Gender"
                // onChange={handleChange}
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>
            </FormControl>
            {/* <Controller
              control={control}
              name="clinic"
              rules={{ required: "Clinic is required" }}
              render={({ field }) => (
                <Autocomplete
                  {...autocompleteProps}
                  {...field}
                  value={clinic}
                  // defaultValue={defaultValueQueryResult?.data?.data[0]}
                  onChange={(_, value) => {
                    console.log(value);
                    setClinic(value);
                    field.onChange(value?.id);
                  }}
                  getOptionLabel={(item) => {
                    return item.name ? item.name : "";
                  }}
                  isOptionEqualToValue={(option, value) =>
                    value === undefined || option.id === value.id
                  }
                  disabled={isSubmitting}
                  renderInput={(params) => (
                    <LoadingTextField
                      loading={queryResult?.isFetching}
                      {...params}
                      // placeholder={defaultValueQueryResult?.data?.data[0].name}
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
            /> */}
          </Box>
        </Stack>
      </Stack>
    </Edit>
  );
};
