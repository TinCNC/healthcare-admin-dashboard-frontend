import { HttpError, useTranslate } from "@pankod/refine-core";
import {
  Box,
  TextField,
  Autocomplete,
  useAutocomplete,
  Edit,
  Input,
  Stack,
  Avatar,
} from "@pankod/refine-mui";
import { useForm, Controller } from "@pankod/refine-react-hook-form";

import { IDoctor, IDepartment } from "interfaces";

import { FileUpload, SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { BaseSyntheticEvent, useState } from "react";

import {
  uploadImage,
  getPublicImageUrl,
  // getSignedImageUrl,
  // downloadImage,
} from "api";

export const DoctorEdit: React.FC = () => {
  const t = useTranslate();

  const {
    refineCore: { formLoading, queryResult },
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
            uploaded?.Key.substring(uploaded?.Key.indexOf("/") + 1)
          );
          if (imageUrl !== undefined) setValue("image", imageUrl?.publicURL);
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

  const {
    autocompleteProps,
    // defaultValueQueryResult
  } = useAutocomplete<IDepartment>({
    resource: "departments",
    onSearch: (value) => [
      {
        field: "name",
        operator: "containss",
        value,
      },
    ],
    defaultValue: queryResult?.data?.data.departments,
  });

  // console.log(defaultValueQueryResult?.data?.data[0]);

  return (
    <Edit
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
              label={t("doctors.fields.username")}
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
                  // defaultValue={defaultValueQueryResult?.data?.data[0]}
                  onChange={(_, value) => {
                    field.onChange(value?.map((item) => item.id));
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
