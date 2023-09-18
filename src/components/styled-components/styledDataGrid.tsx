import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  borderStyle: "none",

  ".blue-cell": {
    color: theme.palette.secondary.main,
  },
  ".linear-gradient": {
    ".MuiDataGrid-cellContent": {
      background:
        "linear-gradient(180deg, #4DB678 0%, #00F69E 48.96%, #15BFFD 77.08%, #0BF 100%)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontWeight: "bolder",
    },
  },
  ".MuiDataGrid-columnHeader": {
    ".MuiDataGrid-columnHeaderTitle": {
      color: theme.palette.secondary.dark,
      fontWeight: "bolder",
    },
  },
}));
