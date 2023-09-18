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

import { StyledDataGrid } from "@/components/styled-components";

import { useTranslate } from "@refinedev/core";
import React from "react";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";

export const RecentTransactionsCard: React.FC = () => {
  const t = useTranslate();

  const rows: GridRowsProp = [
    {
      _id: 1,
      company_name: "Sikago & Sons",
      country: "UK",
      date: "2021-01-10",
      amount: "432.25",
      paid_by: "VHA Token",
    },
    {
      _id: 2,
      company_name: "Fast Tracks",
      country: "USA",
      date: "2021-10-05",
      amount: "563.25",
      paid_by: "VHA Token",
    },
    {
      _id: 3,
      company_name: "TinCNC",
      country: "VNM",
      date: "2023-09-16",
      amount: "256.25",
      paid_by: "VHA Token",
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "company_name",
      headerName: "Company Name",
      width: 250,
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
              primary={params.value}
              secondary={params.row.country}
            />
          </ListItem>
        );
        // return params.row.country;
      },
    },
    {
      field: "date",
      headerName: "Date",
      headerAlign: "center",
      align: "center",
      cellClassName: "blue-cell",
      renderCell(params) {
        return new Date(params.value).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },
      width: 150,
    },
    {
      field: "amount",
      headerName: "Amount",
      headerAlign: "center",
      type: "number",
      align: "center",
      width: 150,
      renderCell(params) {
        return (
          <>
            <Box component="span" marginRight="2px">
              $
            </Box>
            {params.value}
          </>
        );
        // return "$" + params.value;
      },
    },
    {
      field: "paid_by",
      headerName: "Paid By",
      headerAlign: "center",
      align: "center",
      cellClassName: "linear-gradient",
      width: 150,
    },
  ];

  return (
    <Paper sx={{ padding: "1rem 2rem" }}>
      {/* <Stack gap={1} direction="row" justifyContent="space-between">
        <Stack gap={1} direction="row" alignSelf="end">
          <Typography fontWeight="bold" variant="body1">
            {t("dashboard.recent_transactions.title")}
          </Typography>
        </Stack>
      </Stack> */}
      <Typography
        fontWeight="bold"
        variant="body1"
        marginTop="0.75rem"
        marginBottom="0.75rem"
      >
        {t("dashboard.recent_transactions.title")}
      </Typography>
      <Box height="265px" sx={{ overflowY: "auto" }}>
        <StyledDataGrid
          getRowId={(row) => row._id}
          rows={rows}
          columns={columns}
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
