import { HttpError, useTranslate } from "@refinedev/core";
import { useAutocomplete, Create } from "@refinedev/mui";
import { Box, TextField, Autocomplete, Input, Stack } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import { IProduct, ICategory } from "interfaces";

import { FileUpload, SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { BaseSyntheticEvent, useState } from "react";

export const ProductCreate: React.FC = () => {
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
  } = useForm<IProduct, HttpError, IProduct & { category: ICategory }>();

  // const imageInput = watch("image");

  const [imagePreview, setImagePreview] = useState<string>("");

  const [imageFile, setImageFile] = useState<File>();

  const [creatingProduct, setCreatingProduct] = useState<boolean>(false);

  const handleSubmit = async (e: BaseSyntheticEvent<object, any, any>) => {
    // console.log(saveButtonProps);

    // console.log(watch("username"));
    // console.log(getValues());
    // setValue("image", "fegsegsegse");
    // console.log(imageFile);

    try {
      // if (imageFile !== undefined) {
      //   setCreatingProduct(true);
      //   const uploaded = await uploadImage(
      //     imageFile,
      //     "product-image",
      //     `${getValues("name")}/`
      //   );
      //   if (uploaded !== undefined) {
      //     const imageUrl = await getPublicImageUrl(
      //       "product-image",
      //       uploaded?.path
      //     );
      //     if (imageUrl !== undefined) setValue("image", imageUrl?.publicUrl);
      //   }
      //   // if (uploaded !== undefined) {
      //   //   const imageUrl = await getSignedImageUrl(
      //   //     "profile-image",
      //   //     uploaded?.Key
      //   //   );
      //   //   if (imageUrl !== undefined) setValue("image", imageUrl?.signedURL);
      //   // }
      // }

      saveButtonProps.onClick(e);
      setCreatingProduct(false);
      // throw new Error("Function not implemented.");
    } catch (error) {
      setCreatingProduct(false);
    }
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
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

  const { autocompleteProps } = useAutocomplete<ICategory>({
    resource: "categories",
    onSearch: (value: any) => [
      {
        field: "title",
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
          loading={formLoading || creatingProduct}
          variant="contained"
          onClick={async (e) => handleSubmit(e)}
        >
          {t("buttons.save")}
        </LoadingButton>
      }
      // saveButtonProps={{
      //   disabled: creatingProduct || formLoading,
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
          <Box
            component="img"
            alt={getValues("name")}
            src={
              imagePreview ||
              getValues("image") ||
              "https://opuqcfkadzuitwfpengj.supabase.co/storage/v1/object/public/placeholder-images/product-placeholder.jpg"
            }
            sx={{ width: 192, height: 192 }}
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
            sx={{ display: "flex", flexDirection: "column" }}
            autoComplete="off"
          >
            <TextField
              {...register("name", { required: "Name is required" })}
              error={!!errors?.name}
              helperText={errors.name?.message}
              margin="normal"
              required
              fullWidth
              id="name"
              label={t("products.fields.name")}
              name="name"
              autoFocus
            />
            <Controller
              control={control}
              name="category"
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Autocomplete
                  {...autocompleteProps}
                  {...field}
                  onChange={(_, value) => {
                    field.onChange(value?.id);
                  }}
                  getOptionLabel={(item) => {
                    return item.title ? item.title : "";
                  }}
                  isOptionEqualToValue={(option, value) =>
                    value === undefined || option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t("products.fields.category")}
                      margin="normal"
                      variant="outlined"
                      error={!!errors.category}
                      helperText={errors.category?.message}
                      required
                    />
                  )}
                />
              )}
            />
            <TextField
              {...register("application", {
                required: "Application is required",
              })}
              error={!!errors?.application}
              helperText={errors.application?.message}
              margin="normal"
              required
              fullWidth
              id="application"
              label={t("products.fields.application")}
              name="application"
            />
            <TextField
              {...register("description")}
              error={!!errors?.description}
              helperText={errors.description?.message}
              margin="normal"
              required
              multiline
              rows={4}
              fullWidth
              id="description"
              label={t("products.fields.description")}
              name="description"
            />
            <TextField
              {...register("manufacturing_cost", {
                required: "manufacturing Cost is required",
              })}
              error={!!errors?.manufacturing_cost}
              helperText={errors.manufacturing_cost?.message}
              margin="normal"
              type="number"
              required
              fullWidth
              id="manufacturing_cost"
              label={t("products.fields.manufacturing_cost")}
              name="manufacturing_cost"
            />
            <TextField
              {...register("sale_price", {
                required: "Sale Price is required",
              })}
              error={!!errors?.sale_price}
              helperText={errors.sale_price?.message}
              margin="normal"
              type="number"
              required
              fullWidth
              id="sale_price"
              label={t("products.fields.sale_price")}
              name="sale_price"
            />
            <Stack
              direction="row"
              gap={4}
              flexWrap="wrap"
              sx={{ marginTop: "16px" }}
            ></Stack>
          </Box>
        </Stack>
      </Stack>
    </Create>
  );
};
