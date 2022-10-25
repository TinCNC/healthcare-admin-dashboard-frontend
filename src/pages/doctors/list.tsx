// import React from "react";
// import { useTranslate, useMany } from "@pankod/refine-core";
// import {
//   useDataGrid,
//   DataGrid,
//   GridColumns,
//   List,
//   Stack,
//   EditButton,
//   DeleteButton,
// } from "@pankod/refine-mui";

// import { IDoctor } from "interfaces";

// export const DoctorList: React.FC = () => {
//   const t = useTranslate();

//   const { dataGridProps } = useDataGrid<IDoctor>();

//   // const categoryIds = dataGridProps.rows.map((item) => item.category.id);
//   // const { data: categoriesData, isLoading } = useMany<ICategory>({
//   //   resource: "categories",
//   //   ids: categoryIds,
//   //   queryOptions: {
//   //     enabled: categoryIds.length > 0,
//   //   },
//   // });

//   const columns: GridColumns<IDoctor> = [
//     {
//       field: "id",
//       headerName: t("doctors.fields.id"),
//       type: "number",
//       width: 50,
//     },
//     {
//       field: "username",
//       headerName: t("doctors.fields.username"),
//       minWidth: 200,
//       flex: 1,
//     },
//     {
//       field: "first_name",
//       headerName: t("doctors.fields.firstName"),
//       minWidth: 200,
//       flex: 1,
//     },
//     {
//       field: "last_name",
//       headerName: t("doctors.fields.lastName"),
//       minWidth: 200,
//       flex: 1,
//     },
//     {
//       field: "faculty",
//       headerName: t("doctors.fields.faculty"),
//       minWidth: 200,
//       flex: 1,
//     },
//     {
//       field: "created_at",
//       headerName: t("doctors.fields.createdAt"),
//       minWidth: 400,
//       flex: 1,
//     },
//     {
//       field: "updated_at",
//       headerName: t("doctors.fields.updatedAt"),
//       minWidth: 400,
//       flex: 1,
//     },
//     {
//       field: "actions",
//       type: "actions",
//       headerName: t("table.actions"),
//       renderCell: function render({ row }) {
//         return (
//           <Stack direction="row" spacing={1}>
//             <EditButton size="small" hideText recordItemId={row.id} />
//             <DeleteButton size="small" hideText recordItemId={row.id} />
//           </Stack>
//         );
//       },
//       align: "center",
//       headerAlign: "center",
//       minWidth: 80,
//     },
//   ];

//   return (
//     <List>
//       <DataGrid {...dataGridProps} columns={columns} autoHeight />
//     </List>
//   );
// };

import React from "react";
import {
  // useTranslate,
  // useMany,
  useList,
} from "@pankod/refine-core";
import {
  // useDataGrid,
  // DataGrid,
  // GridColumns,
  List,
  Box,
  // Stack,
  // EditButton,
  // DeleteButton,
  Grid,
  CircularProgress,
  Typography,
} from "@pankod/refine-mui";

import { IDoctor } from "interfaces";

import { TrainerCard } from "../../components/doctor-card";

export const DoctorList: React.FC = () => {
  // const t = useTranslate();

  // const { dataGridProps } = useDataGrid<ITrainer>();

  const trainerListQueryResult = useList<IDoctor>({
    resource: "doctors",
    config: {
      pagination: { current: 1, pageSize: 10 },
    },
  });

  console.log(trainerListQueryResult);

  console.log(trainerListQueryResult.data);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {trainerListQueryResult.isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "calc(100vh - 112px)",
          }}
        >
          <CircularProgress />
          <Typography>Loading Doctors</Typography>
        </Box>
      ) : trainerListQueryResult.data !== undefined &&
        trainerListQueryResult.data.total > 0 ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
        >
          {trainerListQueryResult.data.data.map((row, index) => (
            <Grid item xs={3} sm={3} md={3} lg={3} key={index}>
              <TrainerCard data={row}></TrainerCard>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 112px)",
          }}
        >
          No Doctors Found
        </Box>
        // <Box sx={{ display: "flex", lineHeight: "calc(100vh - 112px)" }}>
        //   No Doctors Found
        // </Box>
      )}
    </Box>
  );
};
