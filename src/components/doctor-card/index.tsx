import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  ShowButton,
  EditButton,
  DeleteButton,
  Typography,
  TagField,
} from "@pankod/refine-mui";

import { useMany } from "@pankod/refine-core";
import { IDepartment, IDoctor } from "interfaces";

export type DataProps = {
  data?: IDoctor;
};

export const TrainerCard: React.FC<DataProps> = ({ data }) => {
  // const departmentIds = data?.departments || [];
  const { data: departmentsData, isLoading: departmentsLoading } =
    useMany<IDepartment>({
      resource: "departments",
      ids: data?.departments || [],
      queryOptions: {
        enabled: data?.departments !== undefined || data !== undefined,
      },
    });

  console.log(departmentsData);

  return (
    <Card
    // sx={{ maxWidth: 320 }}
    >
      <CardMedia
        component="img"
        height="240"
        image={data?.image || "images/People_Placeholder.png"}
        alt="avatar"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data?.first_name + " " + data?.last_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {!departmentsLoading || departmentsData !== undefined ? (
            departmentsData?.data.map((item) => {
              return (
                <TagField
                  sx={{ marginRight: "12px" }}
                  value={item.name}
                ></TagField>
              );
            })
          ) : (
            <TagField value="Loading..."></TagField>
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <ShowButton size="small" recordItemId={data?.id} />
        <EditButton size="small" recordItemId={data?.id} />
        <DeleteButton size="small" recordItemId={data?.id} />
      </CardActions>
    </Card>
  );
};
