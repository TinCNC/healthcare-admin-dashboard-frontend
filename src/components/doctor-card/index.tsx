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
} from "@pankod/refine-mui";
import { IDoctor } from "interfaces";

export type DataProps = {
  data?: IDoctor;
};

export const TrainerCard: React.FC<DataProps> = ({ data }) => {
  return (
    <Card
    // sx={{ maxWidth: 320 }}
    >
      <CardMedia
        component="img"
        height="240"
        image={data?.image}
        alt="avatar"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data?.first_name + " " + data?.last_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data?.departments}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">View Details</Button> */}
        <ShowButton size="small" recordItemId={data?.id} />
        <EditButton size="small" recordItemId={data?.id} />
        <DeleteButton size="small" recordItemId={data?.id} />
      </CardActions>
    </Card>
  );
};
