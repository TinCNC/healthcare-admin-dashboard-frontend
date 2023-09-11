import { HttpError, useTranslate } from "@refinedev/core";
import { useAutocomplete, Edit } from "@refinedev/mui";
import { Box, Autocomplete, Input, Stack } from "@mui/material";

import { LoadingAvatar } from "components/form-fields/loading-avatar";

import { LoadingTextField } from "components/form-fields/loading-text-field";

import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import { IDoctor, IDepartment } from "interfaces";

import { FileUpload } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { BaseSyntheticEvent, useState, useEffect } from "react";

import { uploadImage, getPublicImageUrl } from "api";

export const DoctorEdit: React.FC = () => {
  const t = useTranslate();

  const {
    formState: { errors, isSubmitting },
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    register,
    control,
    getValues,
    setValue,
  } = useForm<IDoctor, HttpError, IDoctor & { departments: IDepartment[] }>();

  const [imagePreview, setImagePreview] = useState<string>("");

  const [imageFile, setImageFile] = useState<File>();

  const [departments, setDepartments] = useState<IDepartment[]>([]);

  // const [getAutocompleteValue, setGetAutocompleteValue] =
  //   useState<boolean>(true);

  const [creatingPatient, setCreatingPatient] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: BaseSyntheticEvent<object, any, any>) => {
    // console.log(saveButtonProps);

    // console.log(watch("username"));
    // console.log(getValues());
    // setValue("image", "fegsegsegse");
    // console.log(imageFile);

    try {
      if (imageFile !== undefined) {
        setCreatingPatient(true);
        const uploaded = await uploadImage(
          imageFile,
          "profile-image",
          `doctors/${getValues("username")}/`
        );
        if (uploaded !== undefined) {
          const imageUrl = await getPublicImageUrl(
            "profile-image",
            uploaded?.path
          );
          if (imageUrl !== undefined) setValue("image", imageUrl?.publicUrl);
        }
      }

      setCreatingPatient(false);
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

  const { autocompleteProps, defaultValueQueryResult } =
    useAutocomplete<IDepartment>({
      resource: "departments",
      onSearch: (value: string) => [
        {
          field: "name",
          operator: "containss",
          value,
        },
      ],
      defaultValue: queryResult?.data?.data.departments || [],
    });

  console.log(autocompleteProps?.options);

  console.log(defaultValueQueryResult?.data?.data);

  console.log({ ...autocompleteProps });

  useEffect(() => {
    if (defaultValueQueryResult?.isFetched) {
      console.log("loaded");
      setDepartments(defaultValueQueryResult?.data?.data || []);
      // setGetAutocompleteValue(false);
    }
  }, [defaultValueQueryResult?.isFetched, defaultValueQueryResult?.data?.data]); // Only re-run the effect if count changes

  return (
    <Edit
      isLoading={formLoading}
      // footerButtons={
      //   <LoadingButton
      //     type="submit"
      //     startIcon={<SaveOutlined />}
      //     loadingPosition="start"
      //     loading={formLoading || creatingPatient}
      //     variant="contained"
      //     onClick={async (e) => handleSubmit(e)}
      //   >
      //     {t("buttons.save")}
      //   </LoadingButton>
      // }
      saveButtonProps={{
        loading: creatingPatient || formLoading,
        // disabled: creatingPatient || formLoading,
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
            alt={getValues("username")}
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
            <input id="file" {...register("image")} type="hidden" />
            <LoadingButton
              loading={formLoading}
              loadingPosition="start"
              startIcon={<FileUpload />}
              variant="contained"
              component="span"
              // disabled={formLoading}
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
              registerProps={register("username", {
                required: "Username is required",
              })}
              error={!!errors?.username}
              helperText={errors.username?.message}
              margin="normal"
              required
              fullWidth
              id="username"
              label={t("doctors.fields.username")}
              name="username"
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
              label={t("doctors.fields.first_name")}
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
              label={t("doctors.fields.last_name")}
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
              name="departments"
              rules={{ required: "Departments is required" }}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  {...autocompleteProps}
                  {...field}
                  value={departments}
                  disabled={isSubmitting}
                  onChange={(_, value) => {
                    console.log(value);
                    setDepartments(value);
                    field.onChange(value?.map((item) => item.id));
                  }}
                  getOptionLabel={(item) => {
                    return item.name ? item.name : "";
                  }}
                  isOptionEqualToValue={(option, value) =>
                    value === undefined || option.id === value.id
                  }
                  renderInput={(params) => (
                    <LoadingTextField
                      loading={queryResult?.isFetching}
                      {...params}
                      label={t("doctors.fields.departments")}
                      margin="normal"
                      variant="outlined"
                      error={!!errors.departments}
                      helperText={errors.departments?.message}
                      required
                    />
                  )}
                />
              )}
            />
          </Box>
        </Stack>
      </Stack>
    </Edit>
  );
};
