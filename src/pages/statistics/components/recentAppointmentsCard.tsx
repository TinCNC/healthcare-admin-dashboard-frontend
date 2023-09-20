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

import { StyledDataGrid, StyledSelect } from "@/components/styled-components";

import { useTranslate } from "@refinedev/core";
import React from "react";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";

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

export const RecentAppointmentsCard: React.FC = () => {
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

  // const mockAppoointments = [
  //   {
  //     _id: "343hsdghlweghlhselr",
  //     date: "2023-09-17",
  //     start_at: "2023-09-17T13:28:32.277Z",
  //     end_at: "2023-09-17T14:28:32.277Z",
  //     user_ref: {
  //       info: {
  //         first_name: "Cameron",
  //         last_name: "Cameron",
  //         avatar: null,
  //       },
  //     },
  //     created_at: "2023-09-14T13:28:32.277Z",
  //   },
  //   {
  //     _id: "j43epfghlwgegehselr",
  //     date: "2023-09-16",
  //     start_at: "2023-09-16T04:28:32.277Z",
  //     end_at: "2023-09-16T08:28:32.277Z",
  //     user_ref: {
  //       info: {
  //         first_name: "Sara",
  //         last_name: "Doe",
  //         avatar: null,
  //       },
  //     },
  //     created_at: "2023-09-16T13:28:32.277Z",
  //   },
  //   {
  //     _id: "j43epfghlwgegehselr",
  //     date: "2023-09-16",
  //     start_at: "2023-09-16T11:30:00.000Z",
  //     end_at: "2023-09-16T14:30:00.000Z",
  //     user_ref: {
  //       info: {
  //         first_name: "Robert",
  //         last_name: "Wilson",
  //         avatar: null,
  //       },
  //     },
  //     created_at: "2023-09-16T13:28:32.277Z",
  //   },
  // ];

  const rows: GridRowsProp = [
    {
      _id: 1,
      name: "Theresa Web",
      country: "UK",
      scheduled_at: "2021-01-10T10:15:00.000Z",
      amount: "432.25",
    },
    {
      _id: 2,
      name: "Theresa Web",
      country: "USA",
      scheduled_at: "2021-01-10T10:15:00.000Z",
      amount: "563.25",
    },
    {
      _id: 3,
      name: "Theresa Web",
      country: "VNM",
      scheduled_at: "2021-01-10T10:15:00.000Z",
      amount: "256.25",
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "orders",
      headerName: t("statistics.recent_appointments.orders"),
      flex: 1,
      renderCell(params) {
        return (
          <ListItem
            sx={{
              paddingLeft: "0px",
              //   ".MuiListItem-secondaryAction": {
              //     right: "0px",
              //     backgroundColor: "black",
              //   },
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <Folder />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={"Dr." + params.row.name}
              secondary={params.row.scheduled_at}
            />
          </ListItem>
        );
        // return params.row.country;
      },
    },
    {
      field: "amount",
      headerName: t("statistics.recent_appointments.amount"),
      headerAlign: "center",
      type: "number",
      align: "center",
      maxWidth: 120,
      // flex: 2,
      renderCell(params) {
        return (
          <Chip
            sx={{
              color: "success.light",
              backgroundColor: "rgba(56, 203, 137, 0.20)",
            }}
            label={
              <>
                <Box component="span" marginRight="2px">
                  $
                </Box>
                {params.value}
              </>
            }
          />
        );
        // return "$" + params.value;
      },
    },
  ];

  return (
    <Paper sx={{ padding: "2rem 2rem" }}>
      <Typography fontWeight="bold" variant="body1">
        {t("statistics.recent_appointments.title")}
      </Typography>
      <Box height="300px" sx={{ overflowY: "auto" }}>
        <StyledDataGrid
          getRowId={(row) => row._id}
          rowSelection={false}
          disableRowSelectionOnClick={true}
          rows={rows}
          columns={columns}
          hideFooterPagination={true}
          pagination={undefined}
        />
        {/* <List>
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
        </List> */}
      </Box>
    </Paper>
  );
};
