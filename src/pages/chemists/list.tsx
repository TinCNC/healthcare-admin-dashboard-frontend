import {
  Typography,
  Box,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Stack,
  Grid,
} from "@mui/material";
import React from "react";
import { useTranslate } from "@refinedev/core";
import { Star, Task } from "@mui/icons-material";
import { red } from "@mui/material/colors";

export const ChemistList: React.FC = () => {
  const t = useTranslate();
  const mockConnection = [
    {
      _id: "gsdgsegsegsegseg",
      chemist: {
        // _id: "gsdgsegecececece",
        user_ref: {
          info: {
            first_name: "Jessica",
            last_name: "Jane",
            avatar: null,
          },
        },
        role: "Chemist",
        review_count: 250,
        task_count: 20,
        rating: 4.7,
        // reviews: [
        //   {
        //     _id: 1,
        //     task_name: "Example",
        //     rating: 5,
        //   },
        //   {
        //     _id: 2,
        //     task_name: "Example",
        //     rating: 3,
        //   },
        //   {
        //     _id: 3,
        //     task_name: "Example",
        //     rating: 4.5,
        //   },
        //   {
        //     _id: 4,
        //     task_name: "Example",
        //     rating: 4,
        //   },
        //   {
        //     _id: 5,
        //     task_name: "Example",
        //     rating: 2.5,
        //   },
        // ],
        // tasks: [
        //   {
        //     _id: 1,
        //     task_name: "Example",
        //   },
        //   {
        //     _id: 2,
        //     task_name: "Example",
        //   },
        //   {
        //     _id: 3,
        //     task_name: "Example",
        //   },
        //   {
        //     _id: 4,
        //     task_name: "Example",
        //   },
        // ],
      },
      status: "Connected",
    },
    {
      _id: "gsdgse85832evbjfg",
      chemist: {
        user_ref: {
          info: {
            first_name: "Thomas",
            last_name: "Edison",
            avatar: null,
          },
        },
        role: "Chemist",
        review_count: 512,
        task_count: 32,
        rating: 4,
      },
      status: "Connected",
    },
    {
      _id: "gsdgse8ttw182vbjfg",
      chemist: {
        user_ref: {
          info: {
            first_name: "Lan Chi",
            last_name: "Vu",
          },
        },
        role: "Chemist",
        review_count: 800,
        task_count: 100,
        rating: 5,
      },
      status: "Connected",
    },
  ];

  return (
    <>
      <Box maxWidth="100vw" overflow="auto">
        <Typography variant="h5">{t("chemists.your_connection")}</Typography>
        <Stack gap={2} direction="row">
          {mockConnection !== undefined &&
            mockConnection !== null &&
            mockConnection.length > 0 &&
            mockConnection.map((item) => {
              return (
                <Card sx={{ minWidth: 345, maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                      </Avatar>
                    }
                    action={<Typography>{item.status}</Typography>}
                    title={
                      item.chemist.user_ref.info.first_name +
                      " " +
                      item.chemist.user_ref.info.last_name
                    }
                    subheader={item.chemist.role}
                  />
                  <CardActions disableSpacing>
                    <Stack
                      gap={1}
                      direction="row"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Stack gap={1} direction="row">
                        <IconButton>
                          <Task />
                        </IconButton>
                        <Typography>
                          {item.chemist.task_count}&nbsp;
                          {item.chemist.task_count > 1
                            ? t("chemists.task_plural")
                            : t("chemists.task_singular")}
                        </Typography>
                      </Stack>
                      <Stack gap={1} direction="row">
                        <IconButton>
                          <Star />
                        </IconButton>
                        <Typography>
                          {item.chemist.rating}({item.chemist.review_count}
                          &nbsp;
                          {item.chemist.review_count > 1
                            ? t("chemists.review_plural")
                            : t("chemists.review_singular")}
                          )
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardActions>
                </Card>
              );
            })}
        </Stack>
      </Box>
    </>
  );
};
