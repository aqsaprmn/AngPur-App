import { darken, lighten, styled } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
import { DataGridPremium } from "@mui/x-data-grid-premium";

const getBackgroundColor = (color: string, mode: string) =>
  mode === "dark" ? darken(color, 0.7) : lighten(color, 0.7);

const getHoverBackgroundColor = (color: string, mode: string) =>
  mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

const getSelectedBackgroundColor = (color: string, mode: string) =>
  mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

export const StyledDataGrid = styled(DataGridPremium)(({ theme }) => ({
  "& .super-app-theme--sign": {
    backgroundColor: getBackgroundColor(
      theme.palette.error.main,
      theme.palette.mode
    ),
    "&:hover": {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.error.main,
        theme.palette.mode
      ),
    },
    "&.Mui-selected": {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.error.main,
        theme.palette.mode
      ),
    },
  },
  color: "rgba(0,0,0,.85)",
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",
  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: "#fafafa",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    borderRight: `0.5px ${"#f0f0f0"} !important`,
    borderTop: `0.1px  ${"#cfcfcf"} !important`,
    borderLeft: `0.1px  ${"#cfcfcf"} !important`,
    borderBottom: `0.1px ${"#f0f0f0"} !important`,
  },
  "& .MuiDataGrid-columnHeaderTitleContainerContent": {
    paddingRight: "0.5rem",
  },
  "& .MuiDataGrid-columnHeaders": {
    // paddingTop: "0.5rem !important",
    // borderTop: `0.1px unset ${"#cfcfcf"} !important`,
    border: "none",
    backgroundColor: "#F9F9F9",
    borderRadius: "9px",
    textTransform: "uppercase",
    color: "#0669AC",
    fontWeight: "500",
  },
  "&.MuiDataGrid-root": {
    border: "none",
  },

  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    // borderBottom: `0.1px unset ${"#cfcfcf"} !important`,
    // borderTop: "none !important",
    // backgroundColor: "red",
    color: "#545454",
    fontWeight: "500",
  },
  "& MuiDataGrid-row--lastVisible": {
    border: "none",
  },
  "& .MuiDataGrid-row": {
    // backgroundColor: "#F9F9F9",
    paddingTop: "0.2rem",
    paddingBottom: "0.2rem",
  },
  "& .MuiDataGrid-footerContainer": {
    border: "none",
  },
  "& .MuiDataGrid-cell": {
    color: "rgba(0,0,0,.85)",
    "& .MuiFormControl-root": {
      "& .MuiInputBase-root": {
        marginTop: "0 !important",
      },
    },
  },
  "& .MuiPaginationItem-root": {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
  },
  "& .MuiPaginationItem-root.Mui-selected": {
    background: "#CAFAE0",
    color: "#141313",
  },
  "& .MuiDataGrid-cellContent": {
    fontSize: "12px",
  },
  // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  backgroundColor: "white",
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: "600",
    fontSize: "12px",
  },
  // marginTop: "1rem",
}));
