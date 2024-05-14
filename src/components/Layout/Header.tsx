import userAvatar from "@/assets/icons/user.png";
import { handleLogOut } from "@app/Services/AuthApi";
import { permissionFullExtractor } from "@app/utils/Processor";
import { getJwtCookie } from "@app/utils/constants/cookieHandler";
import { Avatar, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import jwtDecode from "jwt-decode";
import { FC, MouseEvent, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { defaultRoleV2 } from "../../utils/constants/routeData";
import { AppBar } from "../Drawer";

interface HeaderProp {
  open: boolean;
  handleDrawerOpen: () => void;
}

const Header: FC<HeaderProp> = ({ open, handleDrawerOpen }) => {
  const auth: any = jwtDecode(getJwtCookie() as string);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openedAcc = Boolean(anchorEl);
  const handleOpenAcc = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseAcc = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    defaultRoleV2.routes.filter((e) => {
      return e.isHidden == false;
    });
  }, [window.location.pathname, open]);

  return (
    <AppBar
      position="fixed"
      open={open}
      elevation={0}
      sx={{
        backgroundColor: "white",
        color: "#000",
      }}
      className="w-full"
    >
      <Toolbar>
        <div className="flex md:justify-between sm:justify-between tab:justify-between tab_port:justify-between justify-between w-full">
          <div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              className="transform duration-300"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                // display: {
                //   sm: "block",
                //   md: "none",
                //   lg: "none",
                // },
              }}
            >
              {open ? (
                <RxCross2
                  style={{
                    color: "red",
                    transition: "0.3s",
                  }}
                />
              ) : (
                <AiOutlineMenu
                  style={{
                    color: "red",
                    transition: "0.3s",
                  }}
                />
              )}
            </IconButton>
            <span></span>
          </div>
          <div className="flex gap-3 items-center">
            <Avatar
              sx={{
                width: "2rem",
                height: "2rem",
              }}
              src={userAvatar}
              alt="Radian Rasyid"
            />
            <div className="flex flex-col">
              <span className="text-xs mb-1 font-bold">
                {auth?.user?.fullName ?? ""}
              </span>
              <span className="text-xs text-gray-500" onClick={() => ""}>
                {(auth?.user?.activeRole?.group as string)
                  ?.toUpperCase()
                  ?.replaceAll("_", " ") ?? ""}
              </span>
            </div>
            <IconButton
              size="small"
              disableFocusRipple
              disableRipple
              disableTouchRipple
              onClick={handleOpenAcc}
            >
              <IoIosArrowDown
                className={`${
                  openedAcc ? "rotate-180" : ""
                } transition-all duration-300 ease-in-out`}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={openedAcc}
              onClose={handleCloseAcc}
              MenuListProps={{
                sx: {
                  padding: "0 !important",
                },
              }}
              slotProps={{
                paper: {
                  elevation: 1,
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleLogOut();
                }}
              >
                <span className="text-sm flex items-center gap-1">
                  <BiLogOut />
                  LogOut
                </span>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
