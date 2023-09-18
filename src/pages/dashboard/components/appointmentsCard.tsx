import { getDayStringShort } from "@/components/getDayString";
import { Folder, MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  // SvgIcon,
  Typography,
} from "@mui/material";

import { StyledSelect } from "@/components/styled-components";

import { useTranslate } from "@refinedev/core";
import React from "react";

const options = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
  "Oberon",
  "Phobos",
  "Pyxis",
  "Sedna",
  "Titania",
  "Triton",
  "Umbriel",
];

export const AppointmentsCard: React.FC = () => {
  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const t = useTranslate();

  const mockAppoointments = [
    {
      _id: "343hsdghlweghlhselr",
      date: "2023-09-17",
      start_at: "2023-09-17T13:28:32.277Z",
      end_at: "2023-09-17T14:28:32.277Z",
      user_ref: {
        info: {
          first_name: "Cameron",
          last_name: "Cameron",
          avatar: null,
        },
      },
      created_at: "2023-09-14T13:28:32.277Z",
    },
    {
      _id: "j43epfghlwgegehselr",
      date: "2023-09-16",
      start_at: "2023-09-16T04:28:32.277Z",
      end_at: "2023-09-16T08:28:32.277Z",
      user_ref: {
        info: {
          first_name: "Sara",
          last_name: "Doe",
          avatar: null,
        },
      },
      created_at: "2023-09-16T13:28:32.277Z",
    },
    {
      _id: "j43epfghlwgegehselr",
      date: "2023-09-16",
      start_at: "2023-09-16T11:30:00.000Z",
      end_at: "2023-09-16T14:30:00.000Z",
      user_ref: {
        info: {
          first_name: "Robert",
          last_name: "Wilson",
          avatar: null,
        },
      },
      created_at: "2023-09-16T13:28:32.277Z",
    },
  ];

  return (
    <Paper sx={{ padding: "1rem 2rem" }}>
      <Stack gap={1} direction="row" justifyContent="space-between">
        <Stack gap={1} direction="row" alignSelf="end">
          <Typography fontWeight="bold" variant="body1">
            {t("dashboard.appointments.title")}
          </Typography>
        </Stack>
        <Stack gap={1} width="112px" alignSelf="center">
          <FormControl fullWidth size="small">
            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
            <StyledSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue="create_new"
              // value={age}
              // label="Age"
              // onChange={handleChange}
            >
              <MenuItem value="create_new">
                {t("dashboard.appointments.create_new")}
              </MenuItem>
              <MenuItem value="edit">
                {t("dashboard.appointments.edit")}
              </MenuItem>
              {/* <MenuItem value="completed">
                {t("dashboard.activity_feed.completed")}
              </MenuItem> */}
            </StyledSelect>
          </FormControl>
        </Stack>
      </Stack>
      <Box height="202px" sx={{ overflowY: "auto" }}>
        <List>
          {mockAppoointments !== undefined &&
            mockAppoointments !== null &&
            mockAppoointments.length > 0 &&
            mockAppoointments.map((item) => {
              return (
                <ListItem
                  sx={{
                    paddingLeft: "0px",
                    //   ".MuiListItem-secondaryAction": {
                    //     right: "0px",
                    //     backgroundColor: "black",
                    //   },
                  }}
                  secondaryAction={
                    <>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? "long-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        sx={{
                          backgroundColor: "background.default",
                          borderRadius: "8px",
                          color: "secondary.main",
                        }}
                        onClick={handleClick}
                      >
                        <MoreVert />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        MenuListProps={{
                          "aria-labelledby": "long-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        slotProps={{
                          paper: {
                            style: {
                              maxHeight: ITEM_HEIGHT * 4.5,
                              width: "20ch",
                            },
                          },
                        }}
                        // PaperProps={{
                        //   style: {
                        //     maxHeight: ITEM_HEIGHT * 4.5,
                        //     width: "20ch",
                        //   },
                        // }}
                      >
                        {options.map((option) => (
                          <MenuItem
                            key={option}
                            selected={option === "Pyxis"}
                            onClick={handleClose}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </Menu>
                    </>
                  }
                >
                  <ListItemAvatar>
                    <Box
                      bgcolor="background.default"
                      sx={{ width: "36px", height: "36px", lineHeight: "36px" }}
                      textAlign="center"
                      // alignSelf="center"
                      // alignItems="center"
                      // alignContent="center"
                    >
                      <Typography
                        variant="subtitle2"
                        color="#FFA600"
                        fontWeight="bold"
                        fontSize="12px"
                        lineHeight="1.5"
                      >
                        {getDayStringShort(new Date(item.date).getDay())}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        lineHeight="1.5"
                        fontSize="12px"
                      >
                        {new Date(item.date).getDate()}
                      </Typography>
                    </Box>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      "Dr " +
                      item.user_ref.info.first_name +
                      " " +
                      item.user_ref.info.last_name
                    }
                    secondary={
                      new Date(item.start_at).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }) +
                      " - " +
                      new Date(item.end_at).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    }
                  />
                </ListItem>
              );
            })}
        </List>
      </Box>
    </Paper>
  );
};
