import { SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useTranslate, HttpError } from "@pankod/refine-core";
import {
  Create,
  Box,
  TextField,
  Autocomplete,
  // useAutocomplete,
} from "@pankod/refine-mui";
import { Controller, useForm } from "@pankod/refine-react-hook-form";

import { IOrganization } from "interfaces";

export const OrganizationCreate: React.FC = () => {
  const t = useTranslate();

  const {
    saveButtonProps,
    register,
    control,
    formState: { errors },
    refineCore: { formLoading },
  } = useForm<IOrganization, HttpError, IOrganization>();

  // const { autocompleteProps } = useAutocomplete<ICategory>({
  //   resource: "categories",
  // });

  return (
    <Create
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
        {/* <TextField
          {...register("type", {
            required: t("errors.required.field", { field: "Type" }),
          })}
          error={!!errors.type}
          helperText={errors.type?.message}
          margin="normal"
          fullWidth
          label={t("organizations.fields.type")}
          name="type"
        /> */}
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
        {/* <Controller
          control={control}
          name="status"
          rules={{
            required: t("errors.required.field", { field: "Status" }),
          }}
          render={({ field }) => (
            <Autocomplete
              options={["published", "draft", "rejected"]}
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("posts.fields.status.title")}
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
        {/* <TextField
          {...register("content", {
            required: t("errors.required.field", { field: "Content" }),
          })}
          error={!!errors.content}
          helperText={errors.content?.message}
          margin="normal"
          label={t("posts.fields.content")}
          multiline
          rows={4}
        /> */}
      </Box>
    </Create>
  );
};
