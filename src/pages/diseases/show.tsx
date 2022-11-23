import { useShow, useTranslate } from "@pankod/refine-core";
import { Show, Stack, Typography, TagField } from "@pankod/refine-mui";

import { IDisease } from "interfaces";

const getSeverityColor = (
  severity: string | undefined
):
  | "error"
  | "default"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | undefined => {
  switch (severity) {
    case "Low":
      return "default";
    case "Medium":
      return "warning";
    case "High":
      return "error";
    default:
      return "default";
  }
};

export const DiseaseShow: React.FC = () => {
  const t = useTranslate();
  const { queryResult } = useShow<IDisease>();

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
        <Stack gap={1}>
          <Typography variant="body1" fontWeight="bold">
            {t("diseases.fields.name")}
          </Typography>
          <Typography variant="body2">{record?.name}</Typography>
          <Typography variant="body1" fontWeight="bold">
            {t("diseases.fields.scientific_name")}
          </Typography>
          <Typography variant="body2">{record?.scientific_name}</Typography>
          <Typography variant="body1" fontWeight="bold">
            {t("diseases.fields.classification")}
          </Typography>
          <Typography variant="body2">
            <TagField value={record?.classification} />
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {t("diseases.fields.body_parts")}
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
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {t("diseases.fields.severity")}
          </Typography>
          <Typography variant="body2">
            <TagField
              color={getSeverityColor(record?.severity)}
              value={record?.severity}
            />
          </Typography>
        </Stack>
      )}
    </Show>
  );
};
