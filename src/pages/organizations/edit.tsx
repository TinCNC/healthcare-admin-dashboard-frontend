import { SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useTranslate, HttpError } from "@pankod/refine-core";
import { Edit, Box, TextField, Autocomplete } from "@pankod/refine-mui";
import { Controller, useForm } from "@pankod/refine-react-hook-form";

import { useState, useEffect } from "react";

import { IOrganization } from "interfaces";

export const OrganizationEdit: React.FC = () => {
  const t = useTranslate();

  const {
    saveButtonProps,
    register,
    control,
    getValues,
    formState: { errors },
    refineCore: { formLoading },
  } = useForm<IOrganization, HttpError, IOrganization>();

  const [type, setType] = useState<string | null>(null);

  useEffect(() => {
    if (!formLoading) {
      console.log("loaded");
      setType(getValues("type") || null);
      // setGetAutocompleteValue(false);
    }
  }, [formLoading, getValues]); // Only re-run the effect if count changes

  return (
    <Edit
      isLoading={formLoading}
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
      // saveButtonProps={saveButtonProps}
    >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("name", {
            required: t("errors.required.field", { field: "Name" }),
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          margin="normal"
          fullWidth
          label={t("organizations.fields.name")}
          name="name"
          autoFocus
        />
        <Controller
          control={control}
          name="type"
          rules={{
            required: t("errors.required.field", { field: "Type" }),
          }}
          render={({ field }) => (
            <Autocomplete
              // {...autocompleteProps}
              options={["University", "College"]}
              {...field}
              value={type}
              onChange={(_, value) => {
                setType(value);
                field.onChange(value);
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined || option.toString() === value.toString()
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("organizations.fields.type")}
                  margin="normal"
                  variant="outlined"
                  error={!!errors.type}
                  helperText={errors.type?.message}
                  required
                />
              )}
            />
          )}
        />
        <TextField
          {...register("address", {
            required: t("errors.required.field", { field: "Address" }),
          })}
          error={!!errors.address}
          helperText={errors.address?.message}
          margin="normal"
          fullWidth
          label={t("organizations.fields.address")}
          name="address"
        />
      </Box>
    </Edit>
  );
};
