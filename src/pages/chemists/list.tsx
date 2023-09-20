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
  Button,
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
        biography:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus fuga amet quaerat eum omnis odit saepe harum hic exercitationem commodi!",
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
        biography:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, veniam quod laboriosam in nemo temporibus nobis dicta modi soluta, tempore facilis ad consectetur numquam voluptatum necessitatibus iusto est! Officiis beatae ipsum at? Quasi, quis hic. Qui modi placeat tempora provident.",
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
        biography:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, veniam quod laboriosam in nemo temporibus nobis dicta modi soluta, tempore facilis ad consectetur numquam voluptatum necessitatibus iusto est! Officiis beatae ipsum at? Quasi, quis hic. Qui modi placeat tempora provident.",
        role: "Chemist",
        review_count: 800,
        task_count: 100,
        rating: 5,
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
        biography:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, veniam quod laboriosam in nemo temporibus nobis dicta modi soluta, tempore facilis ad consectetur numquam voluptatum necessitatibus iusto est! Officiis beatae ipsum at? Quasi, quis hic. Qui modi placeat tempora provident.",
        role: "Chemist",
        review_count: 800,
        task_count: 100,
        rating: 5,
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
        biography:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, veniam quod laboriosam in nemo temporibus nobis dicta modi soluta, tempore facilis ad consectetur numquam voluptatum necessitatibus iusto est! Officiis beatae ipsum at? Quasi, quis hic. Qui modi placeat tempora provident.",
        role: "Chemist",
        review_count: 800,
        task_count: 100,
        rating: 5,
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
        biography:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, veniam quod laboriosam in nemo temporibus nobis dicta modi soluta, tempore facilis ad consectetur numquam voluptatum necessitatibus iusto est! Officiis beatae ipsum at? Quasi, quis hic. Qui modi placeat tempora provident.",
        role: "Chemist",
        review_count: 800,
        task_count: 100,
        rating: 5,
      },
      status: "Connected",
    },
  ];

  return (
    <Stack gap={5}>
      <Stack gap={2}>
        <Typography variant="h5">{t("chemists.your_connection")}</Typography>
        <Box sx={{ overflowX: "auto" }} width="100%">
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
                      sx={{
                        alignSelf: "center",
                      }}
                      action={<Button>{item.status}</Button>}
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
                          <Typography alignSelf="center">
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
                          <Typography alignSelf="center">
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
      </Stack>
      <Stack gap={2}>
        <Typography variant="h5">{t("chemists.all_chemists")}</Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {mockConnection !== undefined &&
            mockConnection !== null &&
            mockConnection.length > 0 &&
            mockConnection.map((item, index) => {
              return (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Card
                    sx={{
                      minWidth: 345,
                      maxWidth: 345,
                      minHeight: 256,
                      maxHeight: 256,
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          R
                        </Avatar>
                      }
                      sx={{
                        alignSelf: "center",
                      }}
                      action={
                        <Button sx={{ color: "success.light" }}>
                          {t("chemists.chat")}
                        </Button>
                      }
                      title={
                        item.chemist.user_ref.info.first_name +
                        " " +
                        item.chemist.user_ref.info.last_name
                      }
                      subheader={item.chemist.role}
                    />
                    <CardContent
                      sx={{
                        display: "-webkit-box",
                        height: 128,
                        // display: "flex",
                        flexDirection: "row",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                          lineClamp: 4,
                          overflowY: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.chemist.biography}
                      </Box>
                    </CardContent>
                    <CardActions disableSpacing>
                      <Stack
                        gap={1}
                        direction="row"
                        justifyContent="space-between"
                        width="100%"
                        paddingX="8px"
                      >
                        <Stack gap={1} direction="row">
                          <IconButton>
                            <Task />
                          </IconButton>
                          <Typography alignSelf="center">
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
                          <Typography alignSelf="center">
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
                </Grid>
              );
            })}
        </Grid>
      </Stack>
    </Stack>
  );
};
