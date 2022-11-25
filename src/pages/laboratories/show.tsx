import { useShow, useTranslate, useOne } from "@pankod/refine-core";
import { Show, Stack, Typography, TagField } from "@pankod/refine-mui";

import { ILaboratory, ITechnician } from "interfaces";

// const getSeverityColor = (
//   severity: string | undefined
// ):
//   | "error"
//   | "default"
//   | "primary"
//   | "secondary"
//   | "info"
//   | "success"
//   | "warning"
//   | undefined => {
//   switch (severity) {
//     case "Low":
//       return "default";
//     case "Medium":
//       return "warning";
//     case "High":
//       return "error";
//     default:
//       return "default";
//   }
// };

export const LaboratoryShow: React.FC = () => {
  const t = useTranslate();
  const { queryResult } = useShow<ILaboratory>();

  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: directorData, isLoading: directorLoading } =
    useOne<ITechnician>({
      resource: "technicians",
      id: record?.director || 0,
      queryOptions: {
        enabled: !!record?.id,
      },
    });

  //   const { data: categoryData } = useOne<ICategory>({
  //     resource: "categories",
  //     id: record?.category.id || "",
  //     queryOptions: {
  //       enabled: !!record?.category.id,
  //     },
  //   });

  return (
    <Show isLoading={isLoading}>
      {!isLoading && !directorLoading && (
        <Stack gap={1}>
          <Typography variant="body1" fontWeight="bold">
            {t("laboratories.fields.name")}
          </Typography>
          <Typography variant="body2">{record?.name}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("laboratories.fields.address")}
          </Typography>
          <Typography variant="body2">{record?.address}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("laboratories.fields.director")}
          </Typography>
          <Typography variant="body2">
            {directorData?.data.first_name + " " + directorData?.data.last_name}
          </Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("laboratories.fields.email")}
          </Typography>
          <Typography variant="body2">{record?.email}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("laboratories.fields.phone")}
          </Typography>
          <Typography variant="body2">{record?.phone}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("laboratories.fields.website")}
          </Typography>
          <Typography variant="body2">{record?.website}</Typography>

          <Typography variant="body1" fontWeight="bold">
            {t("laboratories.fields.workload_capacity")}
          </Typography>
          <Typography variant="body2">
            <TagField value={record?.workload_capacity} />
          </Typography>

          {/* <Typography variant="body1" fontWeight="bold">
            {t("laboratories.fields.body_parts")}
          </Typography>
          <Typography variant="body2">
            {record?.body_parts !== undefined &&
            record?.body_parts !== null &&
            record?.body_parts.length > 0 ? (
              record?.body_parts.map((item) => {
                return <TagField sx={{ marginRight: "12px" }} value={item} />;
              })
            ) : (
              <TagField sx={{ marginRight: "12px" }} value={"Not specified"} />
            )}
          </Typography> */}

          {/* <Typography variant="body1" fontWeight="bold">
            {t("laboratories.fields.severity")}
          </Typography>
          <Typography variant="body2">
            <TagField
              color={getSeverityColor(record?.severity)}
              value={record?.severity}
            />
          </Typography> */}
        </Stack>
      )}
    </Show>
  );
};
