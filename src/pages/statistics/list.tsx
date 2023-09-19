import { Stack } from "@mui/system";
import React from "react";
import { ActivityFeedCard } from "../dashboard/components/activityFeedCard";
import { AppointmentsCard } from "../dashboard/components/appointmentsCard";
import { RecentTransactionsCard } from "../dashboard/components/recentTransactions";
import { AssetsCard } from "./components";

export const StatisticList = () => {
  return (
    <>
      <Stack gap={3}>
        <Stack gap={6} direction="row">
          <Stack width="50%">
            <AssetsCard />
          </Stack>
          <Stack width="50%">
            <AppointmentsCard />
          </Stack>
        </Stack>
        <RecentTransactionsCard />
        <Stack gap={6} direction="row">
          <Stack width="50%">
            <ActivityFeedCard />
          </Stack>
          <Stack width="50%">
            <AppointmentsCard />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
