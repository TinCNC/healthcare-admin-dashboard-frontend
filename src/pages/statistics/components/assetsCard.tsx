import { Folder } from "@mui/icons-material";
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

import { StyledDataGrid } from "@/components/styled-components";

import { useTranslate } from "@refinedev/core";
import React from "react";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";

export const AssetsCard: React.FC = () => {
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
      </Box>
    </Paper>
  );
};
