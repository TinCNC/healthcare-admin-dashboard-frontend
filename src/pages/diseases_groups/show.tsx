import { useShow, useTranslate } from "@pankod/refine-core";
import {
  // Show,
  Stack,
  Typography,
  // TagField,
  Paper,
} from "@pankod/refine-mui";

import { Show } from "components/crud/show";

import { IDiseasesGroup } from "interfaces";

// import {
//   Chart,
//   ArgumentAxis,
//   ValueAxis,
//   BarSeries,
//   Title,
// } from "@devexpress/dx-react-chart-material-ui";
// import React, { useState } from "react";
import React from "react";

// import { scaleBand } from "@devexpress/dx-chart-core";
// import { ArgumentScale, Stack as ChartStack } from "@devexpress/dx-react-chart";

import { DiseasesGroupStatistics } from "components/diseases-groups-statistics-chart";

export const DiseaseGroupShow: React.FC = () => {
  const t = useTranslate();
  const { queryResult } = useShow<IDiseasesGroup>();
  // const [chartData, setChartData] = useState([
  //   { year: "1950", population: 2.525, population2: 2.525 },
  //   { year: "1960", population: 3.018, population2: 2.525 },
  //   { year: "1970", population: 3.682, population2: 2.525 },
  //   { year: "1980", population: 4.44, population2: 2.525 },
  //   { year: "1990", population: 5.31, population2: 2.525 },
  //   { year: "2000", population: 6.127, population2: 2.525 },
  //   { year: "2010", population: 6.93, population2: 2.525 },
  // ]);

  const { data, isLoading } = queryResult;
  const record = data?.data;

  //   const { data: categoryData } = useOne<ICategory>({
  //     resource: "categories",
  //     id: record?.category.id || "",
  //     queryOptions: {
  //       enabled: !!record?.category.id,
  //     },
  //   });

  return (
    <Show isLoading={isLoading}>
      {!isLoading && (
        <React.Fragment>
          <Stack gap={1}>
            <Typography variant="body1" fontWeight="bold">
              {t("diseases_groups.fields.group_name")}
            </Typography>
            <Typography variant="body2">{record?.group_name}</Typography>
            <Typography variant="body1" fontWeight="bold">
              {t("diseases_groups.fields.icd10_code")}
            </Typography>
            <Typography variant="body2">{record?.icd10_code}</Typography>
            <Typography variant="body1" fontWeight="bold">
              {t("diseases_groups.fields.vn_code")}
            </Typography>
            <Typography variant="body2">{record?.vn_code}</Typography>
          </Stack>
          <Stack gap={1} sx={{ marginTop: "16px" }}>
            <Paper sx={{ alignItems: "center" }}>
              <Typography variant="h5" fontWeight="bold" textAlign="center">
                {t("diseases_groups.fields.statistics")}
              </Typography>
              <DiseasesGroupStatistics data={record?.statistics} />
            </Paper>
          </Stack>
        </React.Fragment>
      )}
    </Show>
  );
};
