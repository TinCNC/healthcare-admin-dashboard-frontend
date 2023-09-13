import React from "react";
import { ShowButton, EditButton, DeleteButton, TagField } from "@refinedev/mui";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
// import { useMany } from "@refinedev/core";
import { IDoctor } from "interfaces";

export type DataProps = {
  data?: IDoctor;
};

export const DoctorCard: React.FC<DataProps> = ({ data }) => {
  // const departmentIds = data?.departments || [];
  // const { data: departmentsData, isLoading: departmentsLoading } =
  //   useMany<IDepartment>({
  //     resource: "departments",
  //     ids: data?.departments || [],
  //     queryOptions: {
  //       enabled: data?.departments !== undefined || data !== undefined,
  //     },
  //   });

  // console.log(departmentsData);

  return (
    <Card
    // sx={{ maxWidth: 320 }}
    >
      <CardMedia
        component="img"
        height="240"
        image={
          data?.user_ref.info.avatar ||
          "https://opuqcfkadzuitwfpengj.supabase.co/storage/v1/object/public/placeholder-images/People_Placeholder.png"
        }
        alt="avatar"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data?.user_ref.info.first_name + " " + data?.user_ref.info.last_name}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          {data?.departments !== undefined &&
            data?.departments !== null &&
            data?.departments.length > 0 &&
            data?.departments_name.map((item) => {
              return <TagField sx={{ marginRight: "12px" }} value={item} />;
            })}

        </Typography> */}
      </CardContent>
      <CardActions>
        <ShowButton size="small" recordItemId={data?._id} />
        <EditButton size="small" recordItemId={data?._id} />
        <DeleteButton size="small" recordItemId={data?._id} />
      </CardActions>
    </Card>
  );
};
