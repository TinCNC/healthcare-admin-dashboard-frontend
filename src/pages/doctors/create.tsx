import { HttpError, useTranslate } from "@refinedev/core";
import { useAutocomplete, Create } from "@refinedev/mui";

import {
  Box,
  TextField,
  Autocomplete,
  Input, // Typography,
  // Button,
  Stack,
} from "@mui/material";

import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import { IDoctor, IDepartment } from "interfaces";

import { FileUpload, SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { BaseSyntheticEvent, useState } from "react";

export const DoctorCreate: React.FC = () => {
  const t = useTranslate();
  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    control,
    // watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IDoctor, HttpError, IDoctor & { departments: IDepartment[] }>();

  // const imageInput = watch("image");

  const [imagePreview, setImagePreview] = useState<string>("");

  const [imageFile, setImageFile] = useState<File>();

  const [creatingPatient, setCreatingPatient] = useState<boolean>(false);

  const handleSubmit = async (e: BaseSyntheticEvent<object, any, any>) => {
    // console.log(saveButtonProps);

    // console.log(watch("username"));
    console.log(getValues());
    // setValue("image", "fegsegsegse");
    // console.log(imageFile);

    try {
      // if (imageFile !== undefined) {
      //   setCreatingPatient(true);
      //   const uploaded = await uploadImage(
      //     imageFile,
      //     "profile-image",
      //     `doctors/${getValues("username")}/`
      //   );
      //   if (uploaded !== undefined) {
      //     const imageUrl = await getPublicImageUrl(
      //       "profile-image",
      //       // uploaded?.path.substring(uploaded?.path.indexOf("/") + 1)
      //       uploaded?.path
      //     );
      //     if (imageUrl !== undefined) setValue("image", imageUrl?.publicUrl);
      //   }
      // }

      setCreatingPatient(false);
      saveButtonProps.onClick(e);
      // throw new Error("Function not implemented.");
    } catch (error) {
      setCreatingPatient(false);
    }
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const target = event.target;
      const file: File = (target.files as FileList)[0];

      setImageFile(file);

      console.log(imageFile);

      // console.log(URL.createObjectURL(file));

      setImagePreview(URL.createObjectURL(file));

      // console.log(saveButtonProps);

      // formData.append("file", file);

      // const res = await axios.post<{ url: string }>(
      //     `${apiUrl}/media/upload`,
      //     formData,
      //     {
      //         withCredentials: false,
      //         headers: {
      //             "Access-Control-Allow-Origin": "*",
      //         },
      //     },
      // );

      // const { name, size, type, lastModified } = file;

      // const imagePaylod = [
      //     {
      //         name,
      //         size,
      //         type,
      //         lastModified,
      //         url: res.data.url,
      //     },
      // ];

      // setValue("images", imagePaylod, { shouldValidate: true });

      // setIsUploadLoading(false);
    } catch (error) {
      // setError("images", { message: "Upload failed. Please try again." });
      // setIsUploadLoading(false);
    }
  };

  const { autocompleteProps } = useAutocomplete<IDepartment>({
    resource: "departments",
    onSearch: (value: any) => [
      {
        field: "name",
        operator: "containss",
        value,
      },
    ],
  });

  return (
    <Create
      isLoading={formLoading}
      footerButtons={
        <LoadingButton
          type="submit"
          startIcon={<SaveOutlined />}
          loadingPosition="start"
          loading={formLoading || creatingPatient}
          variant="contained"
          onClick={async (e) => handleSubmit(e)}
        >
          {t("buttons.save")}
        </LoadingButton>
      }
      // saveButtonProps={{
      //   disabled: creatingPatient || formLoading,
      //   onClick: (e: BaseSyntheticEvent<object, any, any>) => {
      //     handleSubmit(e);
      //   },
      // }}
    >
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
          label={t("doctors.fields.username")}
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
          label={t("doctors.fields.first_name")}
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
              onChange={(_, value) => {
                field.onChange(value?.map((item) => item.id));
              }}
              getOptionLabel={(item) => {
                return item.name ? item.name : "";
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined || option.id === value.id
              }
              clearOnBlur
              // freeSolo
              // autoSelect
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
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
        <Stack
          direction="row"
          gap={4}
          flexWrap="wrap"
          sx={{ marginTop: "16px" }}
        >
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
              // loading={isUploadLoading}
              loadingPosition="end"
              endIcon={<FileUpload />}
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
          {/* {imageInput && (
                        <Box
                            component="img"
                            sx={{
                                maxWidth: 250,
                                maxHeight: 250,
                            }}
                            src={imageInput[0].url}
                            alt="Post image"
                        />
                    )} */}
          {imagePreview !== undefined && imagePreview !== "" && (
            <Box
              component="img"
              sx={{
                maxWidth: 300,
                maxHeight: 300,
              }}
              src={imagePreview}
              alt="Post image"
            />
          )}
        </Stack>
      </Box>
    </Create>
  );
};
