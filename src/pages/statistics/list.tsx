import { Stack } from "@mui/system";
import React from "react";
import {
  AssetsCard,
  ConvertCard,
  DataAnalysisCard,
  HistoryCard,
  RecentAppointmentsCard,
} from "./components";

export const StatisticList = () => {
  return (
    <>
      <Stack gap={3}>
        <Stack gap={6} direction="row">
          <Stack width="50%">
            <AssetsCard />
          </Stack>
          <Stack width="50%">
            <ConvertCard />
          </Stack>
        </Stack>
        <HistoryCard />
        <Stack gap={6} direction="row">
          <Stack width="50%">
            <RecentAppointmentsCard />
          </Stack>
          <Stack width="50%">
            <DataAnalysisCard />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
