import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Toolbar } from "@mui/material";

export default function DrawerAppBar() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />
      <Box component="main" sx={{ p: 3, width: "100%" }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
