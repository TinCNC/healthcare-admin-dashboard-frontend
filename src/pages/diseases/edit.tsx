import { SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { HttpError, useTranslate } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { LoadingTextField } from "components/form-fields/loading-text-field";

import { useForm } from "@refinedev/react-hook-form";

import { IDisease } from "interfaces";
import { useState, useEffect, ChangeEvent } from "react";
import { LoadingFormControl } from "components/form-fields/loading-form-control-field";

export const DiseaseEdit: React.FC = () => {
  const t = useTranslate();

  const [name, setName] = useState<string>("");

  const [scientificName, setScientificName] = useState<string>("");

  const [classification, setClassification] = useState<string>("");

  const [severity, setSeverity] = useState<string>("");

  const {
    refineCore: { formLoading, queryResult },
    formState: { errors, isSubmitting },
    saveButtonProps,
    register,
    reset,
    getValues,
  } = useForm<IDisease, HttpError, IDisease>();

  useEffect(() => {
    if (!formLoading && !queryResult?.isLoading) {
      console.log(getValues());
      reset();
      setName(getValues("name"));
      setScientificName(getValues("scientific_name"));
      setClassification(getValues("classification"));
      setSeverity(getValues("severity"));
    }
  }, [getValues, reset, queryResult?.isLoading, formLoading]);

  // const { autocompleteProps } = useAutocomplete<IClinic>({
  //   resource: "clinics",
  //   onSearch: (value) => [
  //     {
  //       field: "name",
  //       operator: "containss",
  //       value,
  //     },
  //   ],
  // });

  return (
    <Edit
      footerButtons={
        <LoadingButton
          type="submit"
          startIcon={<SaveOutlined />}
          loadingPosition="start"
          loading={formLoading}
          variant="contained"
          onClick={async (e) => saveButtonProps.onClick(e)}
        >
          {t("buttons.save")}
        </LoadingButton>
      }
      isLoading={formLoading}
      saveButtonProps={saveButtonProps}
    >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <LoadingTextField
          loading={queryResult?.isFetching}
          disabled={isSubmitting}
          registerProps={register("name", { required: "Name is required" })}
          error={!!errors?.name}
          helperText={errors.name?.message}
          margin="normal"
          required
          fullWidth
          id="name"
          label={t("diseases.fields.name")}
          name="name"
          value={name}
          onChange={(
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setName(event.target.value as string);
          }}
          autoFocus
        />
        <LoadingTextField
          loading={queryResult?.isFetching}
          disabled={isSubmitting}
          registerProps={register("scientific_name", {
            required: "Scientific name is required",
          })}
          error={!!errors?.scientific_name}
          helperText={errors.scientific_name?.message}
          margin="normal"
          required
          fullWidth
          id="scientific_name"
          label={t("diseases.fields.scientific_name")}
          name="scientific_name"
          value={scientificName}
          onChange={(
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setScientificName(event.target.value as string);
          }}
        />
        <LoadingTextField
          loading={queryResult?.isFetching}
          disabled={isSubmitting}
          registerProps={register("classification", {
            required: "Classification is required",
          })}
          error={!!errors?.classification}
          helperText={errors.classification?.message}
          margin="normal"
          required
          fullWidth
          id="classification"
          label={t("diseases.fields.classification")}
          name="classification"
          value={classification}
          onChange={(
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setClassification(event.target.value as string);
          }}
        />
        <LoadingFormControl
          loading={queryResult?.isFetching}
          disabled={isSubmitting}
          // sx={{ marginTop: "12px", marginBottom: "12px" }}
          margin="normal"
          fullWidth
        >
          <InputLabel id="severity-label">
            {t("diseases.fields.severity")}
          </InputLabel>
          <Select
            {...register("severity")}
            labelId="severity-label"
            id="severity"
            value={severity}
            disabled={formLoading}
            label={t("diseases.fields.severity")}
            onChange={(event: SelectChangeEvent) => {
              setSeverity(event.target.value as string);
            }}
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </LoadingFormControl>
      </Box>
    </Edit>
  );
};
