import React, { useState, useEffect } from "react";
import {
  useTranslate,
  CrudFilters,
  useList,
  // CrudFilter,
} from "@refinedev/core";
import {
  useDataGrid,
  EditButton,
  DeleteButton,
  ShowButton,
} from "@refinedev/mui";
import {
  Stack,
  Divider,
  IconButton,
  InputBase,
  Paper,
  FormControl,
  Autocomplete,
  Chip,
  TextField,
  Typography,
  Box,
  SvgIcon,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@mui/material";
import { StatisticsCard } from "./components";
import { ActivityFeedCard } from "./components/activityFeedCard";
import { AppointmentsCard } from "./components/appointmentsCard";
import { Banner } from "./components/banner";
import { RecentTransactionsCard } from "./components/recentTransactions";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";

// import { List } from "components/crud/list";

// import { IHospital, IMedicine } from "interfaces";

// import { Search } from "@mui/icons-material";

export const DashboardPage: React.FC = () => {
  const t = useTranslate();

  return (
    <Container>
      <Stack gap={3}>
        <Stack gap={1} direction="row" alignItems="self-end">
          <Typography variant="h6" sx={{ marginBottom: "0px" }}>
            {t("dashboard.good_morning")}
          </Typography>
          <Typography variant="h5" fontWeight="bold" color="primary.main">
            John Doe
          </Typography>
        </Stack>
        <Banner />
        <StatisticsCard />
        <Stack gap={6} direction="row">
          <Stack width="60%">
            <ActivityFeedCard />
          </Stack>
          <Stack width="40%">
            <AppointmentsCard />
          </Stack>
        </Stack>
        <RecentTransactionsCard />
      </Stack>
    </Container>
  );
};
