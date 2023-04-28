import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAutocomplete } from "@refinedev/mui";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Autocomplete,
  Box,
  Stack,
  Input,
} from "@mui/material";

import { LoadingTextField } from "components/form-fields/loading-text-field";

import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { LoadingButton } from "@mui/lab";

import { IMedicalSpeciality, IOrganization, ITechnician } from "interfaces";
import {
  AddCircleOutlineOutlined,
  CancelOutlined,
  FileUpload,
} from "@mui/icons-material";

import { UseModalFormReturnType } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { useTranslate } from "@refinedev/core";

export type EditorDataProps = UseModalFormReturnType & {
  submitButtonText?: string;
};

export const CertificateEditorDialog: React.FC<EditorDataProps> = ({
  register,
  control,
  refineCore: { formLoading, queryResult },
  formState: { errors, isSubmitting },
  // handleSubmit,
  getValues,
  setValue,
  modal: { visible, close },
  saveButtonProps,
  submitButtonText,
  reset,
}) => {
  // const {
  //   refineCore: { onFinish, formLoading },
  //   saveButtonProps,
  //   register,
  //   control,
  //   handleSubmit,
  //   getValues,
  //   formState: { errors },
  // } = useForm<
  //   IProfessionalCertificates,
  //   HttpError,
  //   IProfessionalCertificates & {
  //     creator: IOrganization;
  //     validator: ITechnician;
  //   }
  // >({
  //   refineCoreProps: {
  //     action: "create",
  //     resource: "professional_certificates",
  //     redirect: false,
  //     //   onMutationSuccess: {

  //     //   }
  //     // You can define all properties provided by refine useForm
  //   },
  // });
  const t = useTranslate();

  const [imagePreview, setImagePreview] = useState<string>("");

  const [imageFile, setImageFile] = useState<File>();

  const [editingCertificate, setEditingCertificate] = useState<boolean>();

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

  const [creator, setCreator] = useState<IOrganization | null>(null);
  const [validator, setValidator] = useState<ITechnician | null>(null);
  const [speciality, setSpeciality] = useState<IMedicalSpeciality | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // const [getAutocompleteValue, setGetAutocompleteValue] =
  //   useState<boolean>(true);

  const handleClose = useCallback(() => {
    console.log(getValues());
    setImageFile(undefined);
    setImagePreview("");
    setValue("image", "");
    reset();
    console.log(getValues());
    setCreator(null);
    setValidator(null);
    setSpeciality(null);
    setIssuedDate(dayjs());
    setExpiredAt(null);
    setType(null);
    // console.log(imagePreview);
    setSubmitted(false);
    close();
    return;
  }, [
    close,
    getValues,
    // imagePreview,
    reset,
    setValue,
    setSubmitted,
  ]);

  useEffect(() => {
    console.log("submitted:" + submitted);
    console.log("formLoading:" + formLoading);
    if (formLoading === false && submitted) {
      handleClose();
    }
  }, [formLoading, handleClose, submitted]);

  const {
    autocompleteProps: autocompleteCreatorProps,
    defaultValueQueryResult: defaultValueCreatorQueryResult,
  } = useAutocomplete<IOrganization>({
    resource: "organizations",
    defaultValue: queryResult?.data?.data?.creator,
    pagination: { current: 1, pageSize: 10000 },
    onSearch: (value: any) => [
      {
        field: "name",
        operator: "containss",
        value,
      },
    ],
  });

  console.log(defaultValueCreatorQueryResult.data?.data);

  const {
    autocompleteProps: autocompleteValidatorProps,
    defaultValueQueryResult: defaultValueValidatorQueryResult,
  } = useAutocomplete<ITechnician>({
    resource: "technicians",
    defaultValue: queryResult?.data?.data?.validator,
    pagination: { current: 1, pageSize: 10000 },
    onSearch: (value: any) => [
      {
        field: "username",
        operator: "containss",
        value,
      },
    ],
  });

  const {
    autocompleteProps: autocompleteSpecialityProps,
    defaultValueQueryResult: defaultValueSpecialityQueryResult,
  } = useAutocomplete<IMedicalSpeciality>({
    resource: "medical_specialities",
    defaultValue: queryResult?.data?.data?.speciality,
    pagination: { current: 1, pageSize: 10000 },
    onSearch: (value: any) => [
      {
        field: "name",
        operator: "containss",
        value,
      },
    ],
  });

  useEffect(() => {
    if (defaultValueCreatorQueryResult?.isFetched && !formLoading) {
      console.log("loaded");
      setCreator(defaultValueCreatorQueryResult?.data?.data.at(0) || null);
      // setGetAutocompleteValue(false);
    }
  }, [
    formLoading,
    defaultValueCreatorQueryResult?.isFetched,
    defaultValueCreatorQueryResult?.data?.data,
  ]); // Only re-run the effect if count changes

  useEffect(() => {
    if (defaultValueValidatorQueryResult?.isFetched && !formLoading) {
      console.log("loaded validator");
      setValidator(defaultValueValidatorQueryResult?.data?.data.at(0) || null);
      // setGetAutocompleteValue(false);
    }
  }, [
    formLoading,
    defaultValueValidatorQueryResult?.isFetched,
    defaultValueValidatorQueryResult?.data?.data,
  ]); // Only re-run the effect if count changes

  useEffect(() => {
    if (defaultValueSpecialityQueryResult?.isFetched && !formLoading) {
      console.log("loaded");
      setSpeciality(
        defaultValueSpecialityQueryResult?.data?.data.at(0) || null
      );
      // setGetAutocompleteValue(false);
    }
  }, [
    formLoading,
    defaultValueSpecialityQueryResult?.isFetched,
    defaultValueSpecialityQueryResult?.data?.data,
  ]); // Only re-run the effect if count changes

  const [issuedDate, setIssuedDate] = React.useState<Dayjs | null>(dayjs());

  const [expiredAt, setExpiredAt] = React.useState<Dayjs | null>(null);

  useEffect(() => {
    if (queryResult?.isFetched && !formLoading) {
      console.log("loaded");

      const returnedIssedDateValue = queryResult?.data?.data.issued_date;
      const returnedExpiredAtValue = queryResult?.data?.data.expired_at;
      if (returnedIssedDateValue !== null)
        setIssuedDate(dayjs(returnedIssedDateValue));
      else {
        setExpiredAt(null);
      }
      if (returnedExpiredAtValue !== null)
        setExpiredAt(dayjs(returnedExpiredAtValue));
      else {
        setExpiredAt(null);
      }
      setType(queryResult?.data?.data.type || null);
    }
  }, [
    formLoading,
    queryResult?.data?.data.expired_at,
    queryResult?.data?.data.issued_date,
    queryResult?.data?.data.type,
    queryResult?.isFetched,
  ]); // Only re-run the effect if count changes

  const sendFileToIPFS = async (fileImg: File) => {
    if (fileImg) {
      try {
        const formData = new FormData();

        console.log(queryResult?.data?.data?.id);

        const preName = `prof_cert_doc_${getValues("holder")}_cert_${
          queryResult?.data?.data?.id
        }_`;

        const newName = preName + fileImg.name;

        // formData.append("file", fileImg);
        formData.append("file", new File([fileImg], newName));

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
            pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        const imgLink = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        setValue("image", imgLink);
        console.log(ImgHash);
        //Take a look at your Pinata Pinned section, you will see a new file added to you list.
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }
  };

  const submitButtonClick = async (
    e: React.BaseSyntheticEvent<object, any, any>
  ) => {
    if (getValues("expired_at") === "") setValue("expired_at", null);
    try {
      if (imageFile !== undefined) {
        setEditingCertificate(true);
        await sendFileToIPFS(imageFile);
      }
      saveButtonProps.onClick(e);
      setEditingCertificate(false);
      setSubmitted(true);
      // throw new Error("Function not implemented.");
    } catch (error) {
      setEditingCertificate(false);
    }
    // console.log(getValues());
    // saveButtonProps.onClick(e);
  };

  return (
    <div>
      <Dialog open={visible} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          {t("professional_certificates.titles.create")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the information of the professional certificate belong
            to this person
          </DialogContentText>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack gap={4} direction="row">
              <Stack gap={1} width="40%">
                <Box
                  component="img"
                  alt={getValues("name")}
                  src={
                    imagePreview ||
                    getValues("image") ||
                    "https://opuqcfkadzuitwfpengj.supabase.co/storage/v1/object/public/placeholder-images/product-placeholder.jpg"
                  }
                  // sx={{ width: 400, height: 400 }}
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
                    {...register("image")}
                    accept="image/*"
                    type="hidden"
                  />
                  <LoadingButton
                    // loading={isUploadLoading}
                    loadingPosition="start"
                    fullWidth
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
              <Stack gap={1} width="60%">
                <Box component="form" autoComplete="off">
                  <LoadingTextField
                    loading={queryResult?.isFetching}
                    disabled={isSubmitting}
                    registerProps={register("name", {
                      required: "Name is required",
                    })}
                    error={!!errors?.name}
                    helperText={errors.name?.message as string}
                    autoFocus
                    margin="dense"
                    id="name"
                    label={t("professional_certificates.fields.name")}
                    name="name"
                    required
                    fullWidth
                    variant="standard"
                  />

                  {/* <TextField
              {...register("description")}
              margin="dense"
              id="description"
              label="Description"
              name="description"
              // defaultValue={"lsdjflksd"}
              fullWidth
              variant="standard"
            /> */}

                  <DatePicker
                    {...register("issued_date", {
                      required: "Issued Date is required",
                    })}
                    disableFuture
                    label={t("professional_certificates.fields.issued_date")}
                    openTo="day"
                    views={["year", "month", "day"]}
                    value={issuedDate}
                    disabled={isSubmitting}
                    onChange={(newValue) => {
                      setValue(
                        "issued_date",
                        newValue?.toDate().toDateString()
                      );
                      setIssuedDate(newValue);
                    }}
                    renderInput={(params) => (
                      <LoadingTextField
                        loading={queryResult?.isFetching}
                        disabled={isSubmitting}
                        {...params}
                        required
                        error={!!errors?.issued_date}
                        helperText={errors.issued_date?.message as string}
                        fullWidth
                        variant="standard"
                        margin="dense"
                      />
                    )}
                  />

                  <DatePicker
                    {...register("expired_at")}
                    // id="expired_at"
                    // error={!!errors?.expired_at}
                    // helperText={errors.expired_at?.message as string}
                    disablePast
                    label={t("professional_certificates.fields.expired_at")}
                    openTo="day"
                    views={["year", "month", "day"]}
                    value={expiredAt}
                    disabled={isSubmitting}
                    onChange={(newValue) => {
                      console.log(newValue);
                      // console.log(queryResult?.data?.data?.id);
                      if (newValue === null) setValue("expired_at", null);
                      else {
                        setValue(
                          "expired_at",
                          newValue?.toDate().toLocaleDateString()
                        );
                      }
                      setExpiredAt(newValue);
                      console.log(getValues());
                    }}
                    renderInput={(params) => (
                      <LoadingTextField
                        loading={queryResult?.isFetching}
                        // required
                        // error={!!errors?.expired_at}
                        // helperText={errors.expired_at?.message as string}
                        fullWidth
                        variant="standard"
                        margin="dense"
                        // name="expired_at"
                        {...params}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="creator"
                    rules={{ required: "Creator is required" }}
                    render={({ field }) => (
                      <Autocomplete
                        {...autocompleteCreatorProps}
                        {...field}
                        value={creator}
                        onChange={(_, value) => {
                          console.log(value);
                          setCreator(value);
                          field.onChange(value?.id);
                        }}
                        disabled={isSubmitting}
                        getOptionLabel={(item) => {
                          return item.name ? item.name : "";
                        }}
                        // getOptionLabel={(item) => {
                        //   return (
                        //     autocompleteCreatorProps?.options?.find(
                        //       (p) => p?.id?.toString() === item?.id?.toString()
                        //     )?.name ?? ""
                        //   );
                        // }}
                        isOptionEqualToValue={(option, value) =>
                          value === undefined || option.id === value.id
                        }
                        // isOptionEqualToValue={(option, value) =>
                        //   value === undefined || option.id.toString() === value.toString()
                        // }
                        renderInput={(params) => (
                          <LoadingTextField
                            loading={queryResult?.isFetching}
                            {...params}
                            label={t(
                              "professional_certificates.fields.creator"
                            )}
                            margin="dense"
                            variant="standard"
                            error={!!errors.creator}
                            helperText={errors.creator?.message as string}
                            fullWidth
                          />
                        )}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="validator"
                    rules={{ required: "Validator is required" }}
                    render={({ field }) => (
                      <Autocomplete
                        {...autocompleteValidatorProps}
                        {...field}
                        value={validator}
                        disabled={isSubmitting}
                        onChange={(_, value) => {
                          setValidator(value);
                          field.onChange(value?.id);
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
                          <LoadingTextField
                            {...params}
                            loading={queryResult?.isFetching}
                            label={t(
                              "professional_certificates.fields.validator"
                            )}
                            margin="dense"
                            variant="standard"
                            error={!!errors.validator}
                            helperText={errors.validator?.message as string}
                            fullWidth
                          />
                        )}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="speciality"
                    rules={{ required: "Speciality is required" }}
                    render={({ field }) => (
                      <Autocomplete
                        {...autocompleteSpecialityProps}
                        {...field}
                        value={speciality}
                        disabled={isSubmitting}
                        onChange={(_, value) => {
                          setSpeciality(value);
                          field.onChange(value?.id);
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
                            label={t(
                              "professional_certificates.fields.speciality"
                            )}
                            margin="dense"
                            variant="standard"
                            error={!!errors.speciality}
                            helperText={errors.speciality?.message as string}
                            fullWidth
                          />
                        )}
                      />
                    )}
                  />

                  <input
                    {...register("holder", {
                      required: "Holder is required",
                    })}
                    hidden
                    id="holder"
                    name="holder"
                    // value={holder}
                  />

                  <LoadingTextField
                    loading={queryResult?.isFetching}
                    disabled={isSubmitting}
                    registerProps={register("program", {
                      required: "Program is required",
                    })}
                    margin="dense"
                    error={!!errors?.program}
                    helperText={errors.program?.message as string}
                    id="program"
                    label={t("professional_certificates.fields.program")}
                    name="program"
                    fullWidth
                    variant="standard"
                  />

                  <LoadingTextField
                    loading={queryResult?.isFetching}
                    disabled={isSubmitting}
                    registerProps={register("level", {
                      required: "Level is required",
                    })}
                    margin="dense"
                    error={!!errors?.level}
                    helperText={errors.level?.message as string}
                    id="level"
                    label={t("professional_certificates.fields.level")}
                    name="level"
                    type="number"
                    fullWidth
                    variant="standard"
                  />

                  <Controller
                    control={control}
                    name="type"
                    // rules={{
                    //   required: t("errors.required.field", { field: "Type" }),
                    // }}
                    rules={{ required: "Type is required" }}
                    render={({ field }) => (
                      <Autocomplete
                        options={[
                          "Medical Degree",
                          "Specialized Medical Degree",
                          "Permission of Medical Professional Practices",
                        ]}
                        {...field}
                        value={type}
                        disabled={isSubmitting}
                        onChange={(_, value) => {
                          setType(value);
                          field.onChange(value);
                        }}
                        isOptionEqualToValue={(option, value) =>
                          value === undefined ||
                          option.toString() === value.toString()
                        }
                        renderInput={(params) => (
                          <LoadingTextField
                            loading={queryResult?.isFetching}
                            {...params}
                            label={t("professional_certificates.fields.type")}
                            margin="dense"
                            variant="standard"
                            error={!!errors?.type}
                            helperText={errors.type?.message as string}
                            fullWidth
                            required
                          />
                        )}
                      />
                    )}
                  />
                </Box>
              </Stack>
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            color="error"
            startIcon={<CancelOutlined />}
            onClick={handleClose}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            type="submit"
            startIcon={<AddCircleOutlineOutlined />}
            loadingPosition="start"
            loading={formLoading || editingCertificate}
            // {...saveButtonProps}
            onClick={(e) => submitButtonClick(e)}
          >
            {submitButtonText || "Submit"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
