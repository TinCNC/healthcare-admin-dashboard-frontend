import { SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useTranslate, HttpError } from "@pankod/refine-core";
import { Edit, Box, Autocomplete } from "@pankod/refine-mui";
import { Controller, useForm } from "@pankod/refine-react-hook-form";

import { useState, useEffect } from "react";

import { IOrganization } from "interfaces";

import { LoadingTextField } from "components/form-fields/loading-text-field";

export const OrganizationEdit: React.FC = () => {
  const t = useTranslate();

  const {
    saveButtonProps,
    register,
    control,
    getValues,
    formState: { errors, isSubmitting },
    refineCore: { formLoading, queryResult },
  } = useForm<IOrganization, HttpError, IOrganization>();

  const [type, setType] = useState<string | null>(null);

  useEffect(() => {
    if (!queryResult?.isFetching) {
      console.log("loaded");
      setType(getValues("type") || null);
      // setGetAutocompleteValue(false);
    }
  }, [queryResult?.isFetching, getValues]); // Only re-run the effect if count changes

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
        <LoadingTextField
          loading={queryResult?.isFetching}
          registerProps={register("name", {
            required: t("errors.required.field", { field: "Name" }),
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          margin="normal"
          fullWidth
          label={t("organizations.fields.name")}
          name="name"
          disabled={isSubmitting}
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
              disabled={isSubmitting}
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
                <LoadingTextField
                  loading={queryResult?.isFetching}
                  {...params}
                  label={t("organizations.fields.type")}
                  margin="normal"
                  variant="outlined"
                  error={!!errors.type}
                  helperText={errors.type?.message}
                  // disabled={isSubmitting}
                  required
                />
              )}
            />
          )}
        />
        <LoadingTextField
          loading={queryResult?.isFetching}
          registerProps={register("address", {
            required: t("errors.required.field", { field: "Address" }),
          })}
          error={!!errors.address}
          helperText={errors.address?.message}
          margin="normal"
          fullWidth
          label={t("organizations.fields.address")}
          disabled={isSubmitting}
          name="address"
        />
      </Box>
    </Edit>
  );
};
