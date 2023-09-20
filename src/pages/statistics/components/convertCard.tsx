import { Folder } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputBase,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { StyledDataGrid, StyledSelect } from "@/components/styled-components";

import { useTranslate } from "@refinedev/core";
import React from "react";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { AssetsPieChart } from "@/components/assets-pie-chart";
import { Menu, Search, Directions } from "@mui/icons-material";

export const ConvertCard: React.FC = () => {
  const t = useTranslate();

  return (
    <Paper sx={{ padding: "1rem 2rem" }}>
      <Typography
        fontWeight="bold"
        variant="body1"
        marginTop="0.75rem"
        marginBottom="0.75rem"
      >
        {t("statistics.convert.title")}
      </Typography>

      <Stack gap={2}>
        <Paper
          component="form"
          sx={{
            p: "6px 8px",
            display: "flex",
            alignItems: "center",
            borderRadius: "8px",
            backgroundColor: "#121212",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Enter your amount of money"
          />
          <FormControl sx={{ width: "80px" }} size="small">
            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
            <StyledSelect
              sx={{
                borderRadius: "10px",
                fontSize: "12px",
                color: "success.main",
                backgroundColor: "rgba(56, 203, 137, 0.40)",
                // padding: "0px",
              }}
              defaultValue="USDT"
              // value={age}
              // label="Age"
              // onChange={handleChange}
            >
              <MenuItem value="USDT">USDT</MenuItem>
              <MenuItem value="VND">VND</MenuItem>
              <MenuItem value="JP">JP</MenuItem>
            </StyledSelect>
          </FormControl>
        </Paper>
        <Paper
          component="form"
          sx={{
            p: "6px 8px",
            display: "flex",
            alignItems: "center",
            borderRadius: "8px",
            backgroundColor: "#121212",
          }}
        >
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Results" />
          <FormControl sx={{ width: "80px" }} size="small">
            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
            <StyledSelect
              sx={{
                borderRadius: "10px",
                fontSize: "12px",
                color: "warning.main",
                backgroundColor: "rgba(244, 208, 100, 0.20)",
                // padding: "0px",
              }}
              defaultValue="USDT"
              // value={age}
              // label="Age"
              // onChange={handleChange}
            >
              <MenuItem value="USDT">USDT</MenuItem>
              <MenuItem value="VND">VND</MenuItem>
              <MenuItem value="JP">JP</MenuItem>
            </StyledSelect>
          </FormControl>
        </Paper>
        <Button
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: "bold",
            backgroundImage:
              "linear-gradient(265deg, #46AA72 0%, #2DA0A4 77.48%)",
          }}
          fullWidth
          size="large"
          variant="contained"
        >
          {t("statistics.convert.convert_now")}
        </Button>
        <Typography variant="subtitle2" fontSize="10px">
          {t("statistics.convert.notes_message")}
        </Typography>
      </Stack>

      {/* <AssetsPieChart data={data} /> */}
    </Paper>
  );
};
