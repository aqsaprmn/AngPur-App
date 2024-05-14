import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Badge,
  Box,
  createTheme,
  Menu,
  MenuItem,
  ThemeProvider,
  Tooltip,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { getJwtCookie } from "@app/utils/constants/cookieHandler";
import jwtDecode from "jwt-decode";
import { useAuthStore } from "@app/zustand/Auth/auth";
import { handleLogOut } from "@app/Services/AuthApi";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "@app/zustand/Cart/Cart";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { id: 1, title: "Product", to: "/" },
  { id: 2, title: "Order", to: "/order" },
];
const settings = [
  { id: 1, title: "Profile", to: "/profile" },
  { id: 2, title: "Shipping", to: "/shipping" },
  { id: 3, title: "Logout", to: "" },
];

const Navbar: React.FC<Props> = (props) => {
  const router = useLocation();
  const [auth, setAuth] = React.useState({});
  const { email, name } = useAuthStore((state: any) => state);
  const { totalProduct } = useCartStore((state) => state);
  const [user, setUser] = React.useState<{ email: string; name: string }>({
    name: "",
    email: "",
  });

  const pathName = router.pathname;

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        AngPur F&B
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText>
                <Link
                  to={item.to}
                  key={item.id}
                  className={`hover:bg-gray-600 px-3 py-2 rounded duration-500 ${
                    pathName === item.to && "bg-gray-600"
                  }`}
                >
                  {item.title}
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });

  React.useEffect(() => {
    if (getJwtCookie() !== undefined) {
      setAuth(jwtDecode(getJwtCookie() as string));

      setUser({
        email,
        name,
      });
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <AppBar color="primary" component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <div className="flex items-center justify-between w-full">
              <div>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                >
                  AngPur F&B
                </Typography>
              </div>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <div className="flex gap-3">
                  {navItems.map((item) => (
                    <Link
                      to={item.to}
                      key={item.id}
                      className={`hover:bg-gray-600 px-3 py-2 rounded duration-500 ${
                        pathName === item.to && "bg-gray-600"
                      }`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </Box>

              <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 4 }}>
                <Box
                  sx={{
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  <Link to={"/order"}>
                    <IconButton size="large" aria-label="" color="inherit">
                      <Badge badgeContent={totalProduct} color="error">
                        <FaShoppingCart size={20} />
                      </Badge>
                    </IconButton>
                  </Link>
                </Box>
                {Object.keys(auth).length > 0 ? (
                  <>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="" />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem
                          key={setting.id}
                          onClick={handleCloseUserMenu}
                        >
                          {setting.title === "Logout" ? (
                            <button
                              onClick={() => {
                                handleLogOut();
                              }}
                            >
                              <Typography textAlign="center">
                                {setting.title}
                              </Typography>
                            </button>
                          ) : (
                            <Link to={setting.to}>
                              <Typography textAlign="center">
                                {setting.title}
                              </Typography>
                            </Link>
                          )}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <>
                    <Link
                      className="hover:bg-gray-700 bg-gray-600 px-3 py-2 rounded duration-500"
                      to={"/login"}
                    >
                      Login
                    </Link>
                  </>
                )}
              </Box>
            </div>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

export default Navbar;
