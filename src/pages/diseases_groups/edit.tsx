import { SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { HttpError, useTranslate } from "@refinedev/core";

import {
  // Autocomplete,
  // useAutocomplete,
  Edit,
} from "@refinedev/mui";

import {
  Box,
  TextField,
  Stack, // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
  // SelectChangeEvent,
  Typography,
} from "@mui/material";

import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import { IDiseasesGroup } from "interfaces";
import { useState, useEffect, ChangeEvent } from "react";

// import { DiseasesGroupEditor } from "@/components/deseases-groups-statistics-editor";

export const DiseaseGroupEdit: React.FC = () => {
  const t = useTranslate();

  const [groupName, setGroupName] = useState<string>("");

  const [icd10Code, setIcd10Code] = useState<string>("");

  const [vnCode, setVnCode] = useState<string>("");

  // statistics state

  const [infantCombined, setInfantCombined] = useState<number>(0);

  const [infantFemale, setInfantFemale] = useState<number>(0);

  const {
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    register,
    // control,
    reset,
    getValues,
    formState: { errors },
  } = useForm<IDiseasesGroup, HttpError, IDiseasesGroup>();

  interface ageJSONStatisticsValue {
    combined: number;
    female: number;
  }

  interface IDataItem {
    age: string;
    combined: number;
    female: number;
  }

  // function jsonToGraphArray(json?: object) {
  //   console.log(JSON.stringify(json));
  //   const map = new Map(Object.entries(JSON.parse(JSON.stringify(json))));
  //   const graphArray = new Array<IDataItem>();
  //   map.forEach((value, key) => {
  //     graphArray.push({
  //       age: key,
  //       combined: (value as ageJSONStatisticsValue).combined,
  //       female: (value as ageJSONStatisticsValue).female,
  //     });
  //   });
  //   console.log(map);
  //   console.log(graphArray);
  //   return graphArray;
  // }

  useEffect(() => {
    if (!formLoading && !queryResult?.isLoading) {
      console.log(getValues());
      // reset();
      setGroupName(getValues("group_name"));
      setIcd10Code(getValues("icd10_code"));
      setVnCode(getValues("vn_code"));
      // jsonToGraphArray(queryResult?.data?.data.statistics);
      const map = new Map(
        Object.entries(
          JSON.parse(JSON.stringify(queryResult?.data?.data.statistics))
        )
      );
      console.log(map);
    }
  }, [
    getValues,
    reset,
    queryResult?.isLoading,
    formLoading,
    queryResult?.data?.data.statistics,
    // jsonToGraphArray,
  ]);

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
          {...register("group_name", { required: "Group Name is required" })}
          error={!!errors?.group_name}
          helperText={errors.group_name?.message}
          margin="normal"
          required
          fullWidth
          disabled={formLoading}
          id="groupName"
          label={t("diseases_groups.fields.group_name")}
          name="groupName"
          value={groupName}
          onChange={(
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setGroupName(event.target.value as string);
          }}
          autoFocus
        />
        <TextField
          {...register("icd10_code")}
          // error={!!errors?.icd10_code}
          // helperText={errors.icd10_code?.message}
          margin="normal"
          required
          fullWidth
          disabled={formLoading}
          id="icd10_code"
          label={t("diseases_groups.fields.icd10_code")}
          name="icd10_code"
          value={icd10Code}
          onChange={(
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setIcd10Code(event.target.value as string);
          }}
        />
        <TextField
          {...register("vn_code")}
          // error={!!errors?.vn_code}
          // helperText={errors.vn_code?.message}
          margin="normal"
          required
          fullWidth
          disabled={formLoading}
          id="vn_code"
          label={t("diseases_groups.fields.vn_code")}
          name="vn_code"
          value={vnCode}
          onChange={(
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setVnCode(event.target.value as string);
          }}
        />
        <Typography variant="h5">
          {t("diseases_groups.fields.statistics")}
        </Typography>
        <Stack gap={1} direction="column">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Stack direction="column">
              <Typography variant="body1">
                {t("diseases_groups.fields.statistics_info.age_group.infant")}
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <Box>
                  <TextField
                    // {...register("vn_code")}
                    // error={!!errors?.vn_code}
                    // helperText={errors.vn_code?.message}
                    margin="normal"
                    required
                    // fullWidth
                    disabled={formLoading}
                    type="number"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    id="infant_combined"
                    label={t("diseases_groups.fields.statistics_info.combined")}
                    name="infant_combined"
                    value={infantCombined}
                    onChange={(
                      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                    ) => {
                      setInfantCombined(parseInt(event.target.value));
                    }}
                  />
                </Box>
                <Box>
                  <TextField
                    // {...register("vn_code")}
                    // error={!!errors?.vn_code}
                    // helperText={errors.vn_code?.message}
                    margin="normal"
                    required
                    type="number"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    // fullWidth
                    disabled={formLoading}
                    id="infant_female"
                    label={t("diseases_groups.fields.statistics_info.female")}
                    name="infant_female"
                    value={infantFemale}
                    onChange={(
                      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                    ) => {
                      setInfantFemale(parseInt(event.target.value));
                    }}
                  />
                </Box>
              </Stack>
            </Stack>

            {/* <DiseasesGroupEditor /> */}

            <Stack direction="column">
              <Typography variant="body1">
                {t("diseases_groups.fields.statistics_info.age_group.infant")}
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <Box>
                  <TextField
                    // {...register("vn_code")}
                    // error={!!errors?.vn_code}
                    // helperText={errors.vn_code?.message}
                    margin="normal"
                    required
                    // fullWidth
                    disabled={formLoading}
                    type="number"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    id="infant_combined"
                    label={t("diseases_groups.fields.statistics_info.combined")}
                    name="infant_combined"
                    value={infantCombined}
                    onChange={(
                      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                    ) => {
                      setInfantCombined(parseInt(event.target.value));
                    }}
                  />
                </Box>
                <Box>
                  <TextField
                    // {...register("vn_code")}
                    // error={!!errors?.vn_code}
                    // helperText={errors.vn_code?.message}
                    margin="normal"
                    required
                    type="number"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    // fullWidth
                    disabled={formLoading}
                    id="infant_female"
                    label={t("diseases_groups.fields.statistics_info.female")}
                    name="infant_female"
                    value={infantFemale}
                    onChange={(
                      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                    ) => {
                      setInfantFemale(parseInt(event.target.value));
                    }}
                  />
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        {/* <FormControl
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
        </FormControl> */}
      </Box>
    </Edit>
  );
};
