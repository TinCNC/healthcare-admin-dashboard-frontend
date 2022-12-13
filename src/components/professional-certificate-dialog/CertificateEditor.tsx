import React, { useState, useEffect, useCallback } from "react";
// import * as dotenv from "dotenv";
// import React from "react";
import axios from "axios";
// import axios, { isCancel, AxiosError } from "axios";

import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useAutocomplete,
  Autocomplete,
  Box,
  Stack,
  Input,
} from "@pankod/refine-mui";

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

import {
  Controller,
  UseModalFormReturnType,
} from "@pankod/refine-react-hook-form";
import { useTranslate } from "@pankod/refine-core";

export type EditorDataProps = UseModalFormReturnType & {
  submitButtonText?: string;
};

export const CertificateEditorDialog: React.FC<EditorDataProps> = ({
  register,
  control,
  formState: { errors },
  refineCore: { formLoading, queryResult },
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

  const [submitted, setSubmitted] = useState<boolean>(false);

  // const [getAutocompleteValue, setGetAutocompleteValue] =
  //   useState<boolean>(true);

  const handleClose = useCallback(() => {
    console.log(getValues());
    setImageFile(undefined);
    setImagePreview("");
    setValue("image", "");
    reset();
    // setValue("creator", null);
    // setValue("validator", null);
    // setValue("speciality", null);
    console.log(getValues());
    setCreator(null);
    setValidator(null);
    setSpeciality(null);
    setIssuedDate(dayjs());
    setExpiredAt(null);
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
    onSearch: (value) => [
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
    onSearch: (value) => [
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
    onSearch: (value) => [
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
    }
  }, [
    formLoading,
    queryResult?.data?.data.expired_at,
    queryResult?.data?.data.issued_date,
    queryResult?.isFetched,
  ]); // Only re-run the effect if count changes

  const sendFileToIPFS = async (fileImg: File) => {
    if (fileImg) {
      try {
        const formData = new FormData();
        formData.append("file", fileImg);

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
        await sendFileToIPFS(imageFile);
        setEditingCertificate(true);
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
      <Dialog open={visible} onClose={handleClose} maxWidth="md">
        <DialogTitle>
          {t("professional_certificates.titles.create")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the information of the professional certificate belong
            to this person
          </DialogContentText>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack gap={5} direction="row">
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
              <Stack gap={1}>
                <Box component="form" autoComplete="off">
                  <TextField
                    {...register("name", { required: "Name is required" })}
                    error={!!errors?.name}
                    helperText={errors.name?.message as string}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    name="name"
                    required
                    // defaultValue={"lsdjflksd"}
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
                    label="Issued Date"
                    openTo="day"
                    views={["year", "month", "day"]}
                    value={issuedDate}
                    onChange={(newValue) => {
                      setValue(
                        "issued_date",
                        newValue?.toDate().toDateString()
                      );
                      setIssuedDate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        required
                        error={!!errors?.issued_date}
                        helperText={errors.issued_date?.message as string}
                        fullWidth
                        variant="standard"
                        margin="dense"
                        {...params}
                      />
                    )}
                  />
                  <DatePicker
                    {...register("expired_at")}
                    // id="expired_at"
                    // error={!!errors?.expired_at}
                    // helperText={errors.expired_at?.message as string}
                    disablePast
                    label="Expired At"
                    openTo="day"
                    views={["year", "month", "day"]}
                    value={expiredAt}
                    onChange={(newValue) => {
                      console.log(newValue);
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
                      <TextField
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
                          <TextField
                            {...params}
                            label={t(
                              "professional_certificates.fields.creator"
                            )}
                            margin="normal"
                            variant="standard"
                            error={!!errors.creator}
                            helperText={errors.creator?.message as string}
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
                          <TextField
                            {...params}
                            label={t(
                              "professional_certificates.fields.validator"
                            )}
                            margin="normal"
                            variant="standard"
                            error={!!errors.validator}
                            helperText={errors.validator?.message as string}
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
                          <TextField
                            {...params}
                            label={t(
                              "professional_certificates.fields.speciality"
                            )}
                            margin="normal"
                            variant="standard"
                            error={!!errors.speciality}
                            helperText={errors.speciality?.message as string}
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
                  <TextField
                    {...register("program", {
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
                  <TextField
                    {...register("level", {
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
                        onChange={(_, value) => {
                          field.onChange(value);
                        }}
                        // getOptionLabel={(item) => {
                        //   return (
                        //     autocompleteProps?.options?.find(
                        //       (p) => p?.id?.toString() === item?.id?.toString()
                        //     )?.title ?? ""
                        //   );
                        // }}
                        isOptionEqualToValue={(option, value) =>
                          value === undefined ||
                          option.toString() === value.toString()
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={t("professional_certificates.fields.type")}
                            margin="normal"
                            variant="standard"
                            error={!!errors?.type}
                            helperText={errors.type?.message as string}
                            required
                          />
                        )}
                      />
                    )}
                  />
                </Box>
              </Stack>
            </Stack>
            {/* <form className="form" onSubmit={handleSubmit(onFinish)}> */}

            {/* </form> */}
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={close}>Cancel</Button> */}
          <LoadingButton
            color="error"
            startIcon={<CancelOutlined />}
            onClick={handleClose}
          >
            Cancel
          </LoadingButton>
          {/* <Button onClick={handleClose}>Add Certificate</Button> */}
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
