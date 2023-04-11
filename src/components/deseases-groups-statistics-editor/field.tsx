import { Stack, Box, TextField } from "@mui/material";
import { useTranslate } from "@refinedev/core";
import React, { ChangeEvent } from "react";

interface DataProps {
  combined: number;
  female: number;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isLoading?: boolean;
}

export const DiseasesGroupEditor: React.FC<DataProps> = ({
  combined,
  female,
  onChange,
  isLoading,
}) => {
  const t = useTranslate();
  return (
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
          disabled={isLoading || false}
          type="number"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          id="combined"
          label={t("diseases_groups.fields.statistics_info.combined")}
          name="combined"
          value={combined}
          onChange={onChange}
          //   onChange={(
          //     event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          //   ) => {
          //     setInfantCombined(parseInt(event.target.value));
          //   }}
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
          disabled={isLoading || false}
          id="female"
          label={t("diseases_groups.fields.statistics_info.female")}
          name="female"
          value={female}
          onChange={onChange}
          //   onChange={(
          //     event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          //   ) => {
          //     setInfantFemale(parseInt(event.target.value));
          //   }}
        />
      </Box>
    </Stack>
  );
};
