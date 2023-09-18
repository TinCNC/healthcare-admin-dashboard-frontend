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

import { IPatient, IHospital } from "interfaces";

import { FileUpload } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { BaseSyntheticEvent, useState } from "react";

export const PatientCreate: React.FC = () => {
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
  } = useForm<IPatient, HttpError, IPatient & { hospital: IHospital }>();

  // const imageInput = watch("image");

  const [imagePreview, setImagePreview] = useState<string>("");

  const [imageFile, setImageFile] = useState<File>();

  const [creatingPatient, setCreatingPatient] = useState<boolean>(false);

  const handleSubmit = async (e: BaseSyntheticEvent<object, any, any>) => {
    // console.log(saveButtonProps);

    // console.log(watch("username"));
    // console.log(getValues());
    // setValue("image", "fegsegsegse");
    // console.log(imageFile);

    try {
      //   if (imageFile !== undefined) {
      //     setCreatingPatient(true);
      //     const uploaded = await uploadImage(
      //       imageFile,
      //       "profile-image",
      //       `patients/${getValues("username")}/`
      //     );
      //     if (uploaded !== undefined) {
      //       const imageUrl = await getPublicImageUrl(
      //         "profile-image",
      //         uploaded?.path
      //       );
      //       if (imageUrl !== undefined) setValue("image", imageUrl?.publicUrl);
      //     }
      //     // if (uploaded !== undefined) {
      //     //   const imageUrl = await getSignedImageUrl(
      //     //     "profile-image",
      //     //     uploaded?.Key
      //     //   );
      //     //   if (imageUrl !== undefined) setValue("image", imageUrl?.signedURL);
      //     // }
      //   }

      setCreatingPatient(true);
      saveButtonProps.onClick(e);
      // throw new Error("Function not implemented.");
    } catch (error) {
      setCreatingPatient(false);
    }
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      // setIsUploadLoading(true);

      // const formData = new FormData();

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

  const { autocompleteProps } = useAutocomplete<IHospital>({
    resource: "hospitals",
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
      saveButtonProps={{
        disabled: creatingPatient,
        onClick: (e: BaseSyntheticEvent<object, any, any>) => {
          handleSubmit(e);
        },
      }}
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
          label={t("patients.fields.username")}
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
          label={t("patients.fields.first_name")}
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
          label={t("patients.fields.last_name")}
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
          name="hospital"
          rules={{ required: "Hospital is required" }}
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
                  label={t("patients.fields.hospital")}
                  margin="normal"
                  variant="outlined"
                  error={!!errors.hospital}
                  helperText={errors.hospital?.message}
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
            <input
              id="file"
              {...register("image", {
                required: "This field is required",
              })}
              type="hidden"
            />
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
