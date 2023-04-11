import { Stack, Typography, Box, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";
import { useTranslate } from "@refinedev/core";

interface IDataItem {
  age: string;
  combined: number;
  female: number;
}

interface ageJSONStatisticsValue {
  combined: number;
  female: number;
}

interface DataProps {
  data?: Object;
}

function jsonToGraphArray(json?: Object) {
  console.log(JSON.stringify(json));
  const map = new Map(Object.entries(JSON.parse(JSON.stringify(json))));
  let graphArray = new Array<IDataItem>();
  map.forEach((value, key) => {
    graphArray.push({
      age: key,
      combined: (value as ageJSONStatisticsValue).combined,
      female: (value as ageJSONStatisticsValue).female,
    });
  });
  console.log(map);
  console.log(graphArray);
  return graphArray;
}

export const DiseasesGroupEditor: React.FC<DataProps> = ({ data }) => {
  const t = useTranslate();
  return (
    <Stack gap={1} direction="column">
      {/* <Stack
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
      </Stack> */}
    </Stack>
  );
};
