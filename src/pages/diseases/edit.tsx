import { SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { HttpError, useTranslate } from "@pankod/refine-core";
import {
  Box,
  TextField,
  // Autocomplete,
  // useAutocomplete,
  Edit,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@pankod/refine-mui";
import { useForm, Controller } from "@pankod/refine-react-hook-form";

import { IDisease } from "interfaces";
import { useState, useEffect, ChangeEvent } from "react";

export const DiseaseEdit: React.FC = () => {
  const t = useTranslate();

  const [name, setName] = useState<string>("");

  const [scientificName, setScientificName] = useState<string>("");

  const [classification, setClassification] = useState<string>("");

  const [severity, setSeverity] = useState<string>("");

  const {
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    register,
    control,
    reset,
    getValues,
    formState: { errors },
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
        <TextField
          {...register("name", { required: "Name is required" })}
          error={!!errors?.name}
          helperText={errors.name?.message}
          margin="normal"
          required
          fullWidth
          disabled={formLoading}
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
        <TextField
          {...register("scientific_name", {
            required: "Scientific name is required",
          })}
          error={!!errors?.scientific_name}
          helperText={errors.scientific_name?.message}
          margin="normal"
          required
          fullWidth
          disabled={formLoading}
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
        <TextField
          {...register("classification", {
            required: "Classification is required",
          })}
          error={!!errors?.classification}
          helperText={errors.classification?.message}
          margin="normal"
          required
          fullWidth
          disabled={formLoading}
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
        <FormControl
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
        </FormControl>
      </Box>
    </Edit>
  );
};
