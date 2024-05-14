import { defaultRoleV2 } from "@app/utils/constants/routeData";
import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { permissionFullExtractor } from "@app/utils/Processor";
import { useAuthStore } from "@app/zustand/Auth/auth";

export default function MiniDrawer() {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const sm = useMediaQuery(theme.breakpoints.only("sm"));
  // console.log("roling", role);
  const [open, setOpen] = useState(false);
  const { role } = useAuthStore((state: any) => state);

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
      route?: string;
      expanded: boolean;
      translationKey: string;
    }[]
  >(defaultRoleV2.routes);

  useMemo((): any => {
    const newMenus = [...defaultRoleV2.routes].map((item) => {
      item.isHidden = !permissionFullExtractor({
        env: import.meta.env.VITE_ALLOWED_USER_MANAGEMENT,
        role: role,
      });

      return item;
    });
    setMenus(newMenus);
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
