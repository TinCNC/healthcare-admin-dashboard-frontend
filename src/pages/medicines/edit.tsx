import { useState, useEffect, ChangeEvent, BaseSyntheticEvent } from "react";

import { FileUpload, SaveOutlined } from "@mui/icons-material";
import { LoadingButton as DefaultLoadingButton } from "@mui/lab";
import { useTranslate, HttpError, useResource } from "@refinedev/core";
import { Create, Edit, useAutocomplete } from "@refinedev/mui";
import { Box, Autocomplete, Stack, Input } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import { IClinic, IMedicine } from "interfaces";
import { LoadingTextField } from "@/components/form-fields/loading-text-field";

import { uploadImage, getPublicImageUrl } from "api";

export const MedicineEdit: React.FC = () => {
  const t = useTranslate();

  const [name, setName] = useState<string>("");

  const [brand, setBrand] = useState<string>("");

  const [description, setDescription] = useState<string>("");

  const [quantity, setQuantity] = useState<number>(0);

  const [price, setPrice] = useState<number | undefined>();

  const [clinic, setClinic] = useState<IClinic | null>(null);

  const {
    saveButtonProps,
    register,
    control,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
    refineCore: { formLoading, queryResult },
    reset,
  } = useForm<IMedicine, HttpError, IMedicine & { clinic: IClinic }>();

  const [imagePreview, setImagePreview] = useState<string>("");

  const [imageFile, setImageFile] = useState<File>();

  const [creatingMedicine, setCreatingMedicine] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: BaseSyntheticEvent<object, any, any>) => {
    // console.log(saveButtonProps);
    try {
      if (imageFile !== undefined) {
        setCreatingMedicine(true);
        const uploaded = await uploadImage(
          imageFile,
          "medicine-images",
          `${clinic?.name}/${getValues("name")}/`
        );
        if (uploaded !== undefined) {
          const imageUrl = await getPublicImageUrl(
            "medicine-images",
            uploaded?.path
          );
          if (imageUrl !== undefined) setValue("image", imageUrl?.publicUrl);
        }
      }

      setCreatingMedicine(true);
      saveButtonProps.onClick(e);
      // throw new Error("Function not implemented.");
    } catch (error) {
      setCreatingMedicine(false);
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

  // Get action type to detemine when to return Edit or create form
  // Using this method allow to re use the same component for both creation and editing page reduce code duplication.
  const { action } = useResource();

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

  // console.log(action);

  useEffect(() => {
    if (!formLoading && !queryResult?.isLoading) {
      // console.log(getValues());

      // reset();
      setName(getValues("name"));
      // setClinic(getValues("clinic") || undefined);
      setBrand(getValues("brand"));
      setDescription(getValues("description") || "");
      setQuantity(getValues("quantity"));
      setPrice(getValues("price"));
      // setClinic(getValues("workload_capacity"));
      // console.log(defaultValueQueryResult.data?.data);
    }
  }, [getValues, reset, queryResult?.isLoading, formLoading]);

  const EditForm = (
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
          <DefaultLoadingButton
            loading={formLoading}
            loadingPosition="start"
            startIcon={<FileUpload />}
            variant="contained"
            component="span"
            // disabled={formLoading}
          >
            Upload
          </DefaultLoadingButton>
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
            label={t("medicines.fields.name")}
            name="name"
            value={name}
            onChange={(
              event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setName(event.target.value);
            }}
            // autoFocus
          />
          <LoadingTextField
            registerProps={register("description", {
              required: false,
            })}
            loading={queryResult?.isFetching}
            disabled={isSubmitting}
            error={!!errors.name}
            helperText={errors.name?.message}
            margin="normal"
            fullWidth
            label={t("medicines.fields.description")}
            name="description"
            value={description}
            onChange={(
              event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setDescription(event.target.value);
            }}
            rows={10}
            multiline
          />
          <Controller
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
          />
          <LoadingTextField
            registerProps={register("brand", {
              required: t("errors.required.field", { field: "Brand" }),
            })}
            error={!!errors.brand}
            helperText={errors.brand?.message}
            loading={queryResult?.isFetching}
            disabled={isSubmitting}
            margin="normal"
            fullWidth
            label={t("medicines.fields.brand")}
            name="brand"
            value={brand}
            onChange={(
              event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setBrand(event.target.value);
            }}
          />
          <LoadingTextField
            registerProps={register("quantity", {
              required: t("errors.required.field", {
                field: "quantity",
              }),
            })}
            error={!!errors.quantity}
            helperText={errors.quantity?.message}
            loading={queryResult?.isFetching}
            disabled={isSubmitting}
            type="number"
            margin="normal"
            fullWidth
            label={t("medicines.fields.quantity")}
            name="quantity"
            value={quantity}
            onChange={(
              event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setQuantity(parseInt(event.target.value));
            }}
          />
          <LoadingTextField
            registerProps={register("price", {
              required: t("errors.required.field", {
                field: "price",
              }),
            })}
            error={!!errors.quantity}
            helperText={errors.quantity?.message}
            loading={queryResult?.isFetching}
            disabled={isSubmitting}
            type="number"
            margin="normal"
            fullWidth
            label={t("medicines.fields.price")}
            name="price"
            value={price}
            onChange={(
              event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setPrice(parseFloat(event.target.value));
            }}
          />
        </Box>
      </Stack>
    </Stack>
  );

  const LoadingButton = () => {
    return (
      <DefaultLoadingButton
        type="submit"
        startIcon={<SaveOutlined />}
        loadingPosition="start"
        loading={formLoading}
        variant="contained"
        // onClick={async (e) => saveButtonProps.onClick(e)}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={(e: BaseSyntheticEvent<object, any, any>) => {
          handleSubmit(e);
        }}
      >
        {t("buttons.save")}
      </DefaultLoadingButton>
    );
  };

  // const { data: directorsData, directorsLoading } = useList<ITechnician>({
  //   resource: "techinicians",
  // });

  return action == "edit" ? (
    <Edit
      isLoading={formLoading}
      footerButtons={<LoadingButton />}
      saveButtonProps={{
        loading: creatingMedicine || formLoading,
        // disabled: creatingPatient || formLoading,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick: (e: BaseSyntheticEvent<object, any, any>) => {
          handleSubmit(e);
        },
      }}
      // saveButtonProps={saveButtonProps}
    >
      {EditForm}
    </Edit>
  ) : (
    <Create
      isLoading={formLoading}
      footerButtons={<LoadingButton />}
      saveButtonProps={{
        loading: creatingMedicine || formLoading,
        // disabled: creatingPatient || formLoading,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick: (e: BaseSyntheticEvent<object, any, any>) => {
          handleSubmit(e);
        },
      }}
      // saveButtonProps={saveButtonProps}
    >
      {EditForm}
    </Create>
  );
};
