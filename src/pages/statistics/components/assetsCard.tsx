import { Folder } from "@mui/icons-material";
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

import { StyledDataGrid } from "@/components/styled-components";

import { useTranslate } from "@refinedev/core";
import React from "react";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { AssetsPieChart } from "@/components/assets-pie-chart";

export const AssetsCard: React.FC = () => {
  const t = useTranslate();

  const data = [
    { name: "BTC", value: 400 },
    { name: "ETH", value: 300 },
    { name: "VHA Token", value: 300 },
    { name: "Others", value: 200 },
  ];

  return (
    <Paper sx={{ padding: "1rem 2rem" }}>
      <Typography
        fontWeight="bold"
        variant="body1"
        marginTop="0.75rem"
        marginBottom="0.75rem"
      >
        {t("statistics.assets.title")}
      </Typography>
      <AssetsPieChart data={data} />
    </Paper>
  );
};
