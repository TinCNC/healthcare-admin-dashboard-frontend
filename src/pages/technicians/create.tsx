import { HttpError, useTranslate } from "@refinedev/core";

import {
  // Autocomplete,
  // useAutocomplete,
  Create,
} from "@refinedev/mui";

import { Box, TextField, Input, Stack, Avatar } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";

import { ITechnician } from "interfaces";

import { FileUpload, SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { BaseSyntheticEvent, useState } from "react";

export const TechnicianCreate: React.FC = () => {
  const t = useTranslate();
  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ITechnician, HttpError, ITechnician>();

  // const imageInput = watch("image");

  const [imagePreview, setImagePreview] = useState<string>("");

  const [imageFile, setImageFile] = useState<File>();

  const [creatingTechnician, setCreatingTechnician] = useState<boolean>(false);

  const handleSubmit = async (e: BaseSyntheticEvent<object, any, any>) => {
    // console.log(saveButtonProps);

    // console.log(watch("username"));
    // console.log(getValues());
    // setValue("image", "fegsegsegse");
    // console.log(imageFile);

    try {
      // if (imageFile !== undefined) {
      //   setCreatingTechnician(true);
      //   const uploaded = await uploadImage(
      //     imageFile,
      //     "profile-image",
      //     `technicians/${getValues("username")}/`
      //   );
      //   if (uploaded !== undefined) {
      //     const imageUrl = await getPublicImageUrl(
      //       "profile-image",
      //       uploaded?.path
      //     );
      //     if (imageUrl !== undefined) setValue("image", imageUrl?.publicUrl);
      //   }
      // }
      saveButtonProps.onClick(e);
      setCreatingTechnician(false);
      // throw new Error("Function not implemented.");
    } catch (error) {
      setCreatingTechnician(false);
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

  // const {
  //   autocompleteProps,
  //   // defaultValueQueryResult
  // } = useAutocomplete<IHospital>({
  //   resource: "hospitals",
  //   onSearch: (value) => [
  //     {
  //       field: "name",
  //       operator: "containss",
  //       value,
  //     },
  //   ],
  //   defaultValue: queryResult?.data?.data.hospital,
  // });

  return (
    <Create
      isLoading={formLoading}
      // saveButtonProps={{
      //   disabled: creatingTechnician,
      //   onClick: (e: BaseSyntheticEvent<object, any, any>) => {
      //     handleSubmit(e);
      //   },
      // }}
      footerButtons={
        <LoadingButton
          type="submit"
          startIcon={<SaveOutlined />}
          loadingPosition="start"
          loading={formLoading || creatingTechnician}
          variant="contained"
          onClick={async (e) => handleSubmit(e)}
        >
          {t("buttons.save")}
        </LoadingButton>
      }
    >
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Stack gap={1}>
          <Avatar
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
            />
            <input id="file" {...register("image")} type="hidden" />
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
          <Box component="form" autoComplete="off">
            <TextField
              {...register("email", { required: "Email is required" })}
              error={!!errors?.username}
              helperText={errors.username?.message}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
            />
            {/* <TextField
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
            /> */}

            <TextField
              {...register("first_name", {
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
          </Box>
        </Stack>
      </Stack>
    </Create>
  );
};
