import { defaultRoleV2 } from "@app/utils/constants/routeData";
import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MiniDrawer() {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  // console.log("roling", role);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    const dupMenu = [...Menus];
    const result = dupMenu.map((item) => {
      return {
        ...item,
        expanded: false,
      };
    });
    setMenus(result);
    setOpen(!open);
  };

  const [Menus, setMenus] = useState<
    {
      title: string;
      icon: any;
      children: any[];
      route?: string;
      expanded: boolean;
      translationKey: string;
    }[]
  >(defaultRoleV2.routes);

  useMemo((): any => {
    setMenus(defaultRoleV2.routes);
  }, [defaultRoleV2.routes]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* APPBAR */}
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />

      {/* SIDEBAR */}
      <div hidden={(xs || sm) && open == false ? true : false}>
        <Sidebar open={open} />
      </div>

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, paddingTop: "5rem" }}
        className={`bg-content-main-bg h-full ${open ? "w-9/12" : "w-[91vw]"}`}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
