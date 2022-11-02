import { HttpError } from "@pankod/refine-core";
import {
  Box,
  TextField,
  Autocomplete,
  useAutocomplete,
  Edit,
  Input,
  // Typography,
  Stack,
  // Button,
  Avatar,
  // FormControl,
} from "@pankod/refine-mui";
import { useForm, Controller } from "@pankod/refine-react-hook-form";

import { IPatient, IClinic } from "interfaces";

import { FileUpload } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { BaseSyntheticEvent, useState } from "react";

import {
  uploadImage,
  getPublicImageUrl,
  // getSignedImageUrl,
  // downloadImage,
} from "api";

export const PatientEdit: React.FC = () => {
  const {
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    register,
    control,
    // watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IPatient, HttpError, IPatient & { clinic: IClinic }>();

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
      if (imageFile !== undefined) {
        setCreatingPatient(true);
        const uploaded = await uploadImage(
          imageFile,
          "profile-image",
          `patients/${getValues("username")}/`
        );
        if (uploaded !== undefined) {
          const imageUrl = await getPublicImageUrl(
            "profile-image",
            uploaded?.Key.substring(uploaded?.Key.indexOf("/") + 1)
          );
          if (imageUrl !== undefined) setValue("image", imageUrl?.publicURL);
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

  const {
    autocompleteProps,
    // defaultValueQueryResult
  } = useAutocomplete<IClinic>({
    resource: "clinics",
    onSearch: (value) => [
      {
        field: "name",
        operator: "containss",
        value,
      },
    ],
    defaultValue: queryResult?.data?.data.clinic,
  });

  // console.log(defaultValueQueryResult?.data?.data[0]);

  return (
    <Edit
      isLoading={formLoading}
      saveButtonProps={{
        disabled: creatingPatient,
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
            <TextField
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
            />

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
              name="clinic"
              rules={{ required: "Clinic is required" }}
              render={({ field }) => (
                <Autocomplete
                  {...autocompleteProps}
                  {...field}
                  // defaultValue={defaultValueQueryResult?.data?.data[0]}
                  onChange={(_, value) => {
                    console.log(value);
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
            />
          </Box>
        </Stack>
      </Stack>
    </Edit>
  );
};