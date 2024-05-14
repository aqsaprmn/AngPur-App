import lrtLogo from "@/assets/img/lrtLogo.png";
import { handleLogOut } from "@app/Services/AuthApi";
import { removeHidden } from "@app/utils/Processor";
import { defaultRoleV2 } from "@app/utils/constants/routeData";
import { Route } from "@app/utils/constants/types";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC, Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GoSignOut } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Drawer, DrawerHeader } from "../Drawer";
import { HtmlTooltip } from "../Tooltip/HtmlTooltip";

interface SidebarProp {
  open: boolean;
}

const Sidebar: FC<SidebarProp> = ({ open }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmScreenOrLower = useMediaQuery(theme.breakpoints.down("md"));
  const [currentRoute, setCurrentRoute] = useState<Route[]>(
    removeHidden(defaultRoleV2.routes)
  );

  const handleOpenPerItem = (index: number) => {
    const dupMenu = [...currentRoute];
    dupMenu[index] = {
      ...dupMenu[index],
      expanded: !dupMenu[index].expanded,
    };
    setCurrentRoute(dupMenu);
  };

  const handleOpenPerItemClosed = (index: number) => {
    const dupMenu = [...currentRoute];
    navigate(dupMenu[index].children[0].route);
  };

  useEffect(() => {
    setCurrentRoute(removeHidden(defaultRoleV2.routes));
  }, []);

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      PaperProps={{
        className: "border-none border-r-none scrollbar-sidebar transition-all",
        style: {
          border: "none",
          display: "flex",
          justifyContent: "space-between",
        },
      }}
    >
      {isSmScreenOrLower ? (
        <>
          <div>
            <DrawerHeader
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
              className="mb-5"
            >
              <div className="font-bold text-4xl py-3">AngPur</div>
              <div className="w-full text-center">F&B</div>
            </DrawerHeader>
            <div>
              <List>
                {currentRoute.map((item, index) => {
                  if (item.isHidden == false) {
                    if (item.children?.length > 0) {
                      return (
                        <Fragment key={index}>
                          {open ? (
                            <ListItemButton
                              dense
                              onClick={
                                open == true
                                  ? () => {
                                      handleOpenPerItem(index);
                                    }
                                  : () => {
                                      handleOpenPerItemClosed(index);
                                    }
                              }
                              sx={{
                                marginTop: "1rem",
                                paddingLeft: open ? 2 : 0,
                                color: "#84848C",
                              }}
                              className={
                                window.location.pathname.includes(
                                  item.route as string
                                )
                                  ? "active-sidebar"
                                  : ""
                              }
                            >
                              <ListItemIcon
                                className={`flex justify-center ${
                                  window.location.pathname.includes(
                                    item.route as string
                                  )
                                    ? "active-sidebar-icon"
                                    : ""
                                }`}
                                sx={{
                                  color: "#84848C",
                                }}
                              >
                                {item.icon}
                              </ListItemIcon>
                              <ListItemText
                                className={`${
                                  open ? "" : "opacity-0"
                                } transition-all`}
                                primaryTypographyProps={{
                                  sx: {
                                    fontSize: "14px",
                                    fontWeight: "600",
                                  },
                                }}
                                primary={t(item.translationKey)}
                              />
                              <IoIosArrowDown
                                className={`${
                                  item.expanded ? "rotate-180" : ""
                                } transition-all duration-300 ease-in-out delay-150`}
                              />
                            </ListItemButton>
                          ) : (
                            <HtmlTooltip
                              arrow
                              title={
                                <div>
                                  <ul>
                                    {item.children.map((child, index) => {
                                      if (child.isHidden == false) {
                                        return (
                                          <li
                                            key={index}
                                            onClick={() =>
                                              navigate(child.route)
                                            }
                                            className={`${
                                              index ===
                                              item.children?.length - 1
                                                ? "mb-1"
                                                : "mb-2 mt-1"
                                            } text-black px-2 py-1 rounded-lg cursor-pointer ${
                                              window.location.pathname.includes(
                                                child.route as string
                                              )
                                                ? "active-sidebar-icon"
                                                : ""
                                            } hover:bg-main-red hover:text-white`}
                                          >
                                            <span>{child.title}</span>
                                          </li>
                                        );
                                      }
                                    })}
                                  </ul>
                                </div>
                              }
                              placement="right"
                              slotProps={{
                                arrow: {
                                  sx: {
                                    backgroundColor: "#B2BEB5",
                                    color: "#B2BEB5",
                                  },
                                },
                              }}
                            >
                              <ListItemButton
                                dense
                                onClick={
                                  open
                                    ? () => {
                                        handleOpenPerItem(index);
                                      }
                                    : () => {
                                        handleOpenPerItemClosed(index);
                                      }
                                }
                                sx={{
                                  marginTop: "1rem",
                                  paddingLeft: open ? 2 : 0,
                                  color: "#84848C",
                                }}
                                className={
                                  window.location.pathname.includes(
                                    item.route as string
                                  )
                                    ? "active-sidebar"
                                    : ""
                                }
                              >
                                <ListItemIcon
                                  className={`flex justify-center ${
                                    window.location.pathname.includes(
                                      item.route as string
                                    )
                                      ? "active-sidebar-icon"
                                      : ""
                                  }`}
                                  sx={{
                                    color: "#84848C",
                                  }}
                                >
                                  {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                  className={`${
                                    open ? "" : "opacity-0"
                                  } transition-all`}
                                  primaryTypographyProps={{
                                    sx: {
                                      fontSize: "14px",
                                      fontWeight: "600",
                                    },
                                  }}
                                  primary={t(item.translationKey)}
                                />
                                <IoIosArrowDown
                                  className={`${
                                    item.expanded ? "rotate-180" : ""
                                  } transition-all duration-300 ease-in-out delay-150`}
                                />
                              </ListItemButton>
                            </HtmlTooltip>
                          )}
                          <Collapse
                            in={item.expanded}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List
                              component="div"
                              disablePadding
                              className="first:mt-1"
                              // sx={{
                              //   border: "1px solid #E41205",
                              // }}
                            >
                              {item.children.map((child, i) => {
                                if (child.isHidden == false) {
                                  return (
                                    <div
                                      className="flex border-l-2 border-main-red ms-10"
                                      onClick={() => navigate(child.route)}
                                      key={i}
                                    >
                                      <div className="h-full border-r-1 border-main-red"></div>
                                      <ListItemButton
                                        sx={{
                                          fontSize: "12px",
                                          mr: 2.5,
                                          ml: open ? 1 : 0,
                                          paddingLeft: "0.5rem",
                                          borderRadius: "6px",
                                          backgroundColor:
                                            window.location.pathname.includes(
                                              child.route
                                            )
                                              ? "#E41205"
                                              : "",
                                          color:
                                            window.location.pathname.includes(
                                              child.route
                                            )
                                              ? "#FFF"
                                              : "",
                                          "&:hover": {
                                            backgroundColor:
                                              window.location.pathname.includes(
                                                child.route
                                              )
                                                ? "#E41205"
                                                : "",
                                            color:
                                              window.location.pathname.includes(
                                                child.route
                                              )
                                                ? "#FFF"
                                                : "",
                                          },
                                        }}
                                        className={`ms-3 w-fit`}
                                      >
                                        <div className="border-r-1 border-main-red"></div>
                                        {t(child.translationKey)}
                                      </ListItemButton>
                                    </div>
                                  );
                                }
                              })}
                            </List>
                          </Collapse>
                        </Fragment>
                      );
                    }

                    if (item.route !== "/") {
                      return (
                        <ListItemButton
                          dense
                          sx={{
                            marginTop: "1rem",
                            paddingLeft: open ? 2 : 0,
                            color: "#84848C",
                          }}
                          onClick={() => navigate(item.route as string)}
                          key={index}
                          className={
                            window.location.pathname.includes(
                              item.route as string
                            )
                              ? "active-sidebar"
                              : ""
                          }
                        >
                          <ListItemIcon
                            className={`flex justify-center ${
                              window.location.pathname.includes(
                                item.route as string
                              )
                                ? "active-sidebar-icon"
                                : ""
                            }`}
                            sx={{
                              color: "#84848C",
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText
                            primaryTypographyProps={{
                              sx: {
                                // color: isActive === index ? "#E41205" : null,
                                fontSize: "14px",
                                fontWeight: "600",
                                // "&:hover": {
                                //   color: "#E41205",
                                // },
                              },
                            }}
                            className={`${
                              open ? "" : "opacity-0"
                            } transition-all`}
                            primary={t(item.translationKey)}
                          />
                        </ListItemButton>
                      );
                    }

                    return (
                      <ListItemButton
                        dense
                        sx={{
                          marginTop: "1rem",
                          paddingLeft: open ? 2 : 0,
                          color: "#84848C",
                        }}
                        onClick={() => navigate(item.route as string)}
                        key={index}
                      >
                        <ListItemIcon
                          className={`flex justify-center`}
                          sx={
                            {
                              // color: isActive === index ? "#E41205" : null,
                              // "&:hover": {
                              //   color: "#E41205",
                              //   fill: "#E41205",
                              // },
                            }
                          }
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primaryTypographyProps={{
                            sx: {
                              // color: isActive === index ? "#E41205" : null,
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#84848C",
                            },
                          }}
                          className={`${
                            open ? "" : "opacity-0"
                          } transition-all`}
                          primary={t(item.translationKey)}
                        />
                      </ListItemButton>
                    );
                  }
                })}
              </List>
            </div>
          </div>

          <div className="pb-10">
            <List>
              <ListItemButton
                dense
                sx={{
                  marginTop: "1rem",
                  paddingLeft: open ? 2 : 0,
                }}
                onClick={() => {
                  handleLogOut();
                }}
              >
                <ListItemIcon
                  className="flex justify-center"
                  sx={{
                    color: "#84848C",
                  }}
                >
                  <GoSignOut />
                </ListItemIcon>
                {open ? (
                  <ListItemText
                    sx={{
                      color: "#84848C",
                    }}
                  >
                    {t("signOut")}
                  </ListItemText>
                ) : null}
              </ListItemButton>
            </List>
          </div>
        </>
      ) : (
        <>
          <DrawerHeader
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
            className="mb-5"
          >
            <div className="font-bold text-4xl py-3">AngPur</div>
            <div className="w-full text-center">F&B</div>
          </DrawerHeader>
          <div>
            <List>
              {currentRoute.map((item, index) => {
                if (item.isHidden == false) {
                  if (item.children?.length > 0) {
                    return (
                      <Fragment key={index}>
                        {open ? (
                          <ListItemButton
                            dense
                            onClick={
                              open == true
                                ? () => {
                                    handleOpenPerItem(index);
                                  }
                                : () => {
                                    handleOpenPerItemClosed(index);
                                  }
                            }
                            sx={{
                              marginTop: "1rem",
                              paddingLeft: open ? 2 : 0,
                              color: "#84848C",
                            }}
                            className={
                              window.location.pathname.includes(
                                item.route as string
                              )
                                ? "active-sidebar"
                                : ""
                            }
                          >
                            <ListItemIcon
                              className={`flex justify-center ${
                                window.location.pathname.includes(
                                  item.route as string
                                )
                                  ? "active-sidebar-icon"
                                  : ""
                              }`}
                              sx={{
                                color: "#84848C",
                              }}
                            >
                              {item.icon}
                            </ListItemIcon>
                            <ListItemText
                              className={`${
                                open ? "" : "opacity-0"
                              } transition-all`}
                              primaryTypographyProps={{
                                sx: {
                                  fontSize: "14px",
                                  fontWeight: "600",
                                },
                              }}
                              primary={t(item.translationKey)}
                            />
                            <IoIosArrowDown
                              className={`${
                                item.expanded ? "rotate-180" : ""
                              } transition-all duration-300 ease-in-out delay-150`}
                            />
                          </ListItemButton>
                        ) : (
                          <HtmlTooltip
                            arrow
                            title={
                              <div>
                                <ul>
                                  {item.children.map((child, index) => {
                                    return (
                                      <li
                                        key={index}
                                        onClick={() => navigate(child.route)}
                                        className={`${
                                          index === item.children?.length - 1
                                            ? "mb-1"
                                            : "mb-2 mt-1"
                                        } text-black hover:${
                                          window.location.pathname.includes(
                                            child.route as string
                                          )
                                            ? ""
                                            : "bg-main-red"
                                        } hover:${
                                          window.location.pathname.includes(
                                            child.route as string
                                          )
                                            ? ""
                                            : "text-white"
                                        } px-2 py-1 rounded-lg cursor-pointer ${
                                          window.location.pathname.includes(
                                            child.route as string
                                          )
                                            ? "active-sidebar-icon"
                                            : ""
                                        }`}
                                      >
                                        <span>{child.title}</span>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            }
                            placement="right"
                          >
                            <ListItemButton
                              dense
                              onClick={
                                open
                                  ? () => {
                                      handleOpenPerItem(index);
                                    }
                                  : () => {
                                      handleOpenPerItemClosed(index);
                                    }
                              }
                              sx={{
                                marginTop: "1rem",
                                paddingLeft: open ? 2 : 0,
                                color: "#84848C",
                              }}
                              className={`${
                                window.location.pathname.includes(
                                  item.route as string
                                )
                                  ? "active-sidebar"
                                  : ""
                              } transition-all`}
                            >
                              <ListItemIcon
                                className={`flex justify-center ${
                                  window.location.pathname.includes(
                                    item.route as string
                                  )
                                    ? "active-sidebar-icon"
                                    : ""
                                }`}
                                sx={{
                                  color: "#84848C",
                                }}
                              >
                                {item.icon}
                              </ListItemIcon>
                              <ListItemText
                                className={`${
                                  open ? "" : "opacity-0"
                                } transition-all`}
                                primaryTypographyProps={{
                                  sx: {
                                    fontSize: "14px",
                                    fontWeight: "600",
                                  },
                                }}
                                primary={t(item.translationKey)}
                              />
                              <IoIosArrowDown
                                className={`${
                                  item.expanded ? "rotate-180" : ""
                                } transition-all duration-300 ease-in-out`}
                              />
                            </ListItemButton>
                          </HtmlTooltip>
                        )}
                        <Collapse
                          in={item.expanded}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List
                            component="div"
                            disablePadding
                            className="first:mt-1"
                            // sx={{
                            //   border: "1px solid #E41205",
                            // }}
                          >
                            {item.children.map((child, i) => {
                              return (
                                <div
                                  className="flex border-l-2 border-main-red ms-10"
                                  onClick={() => navigate(child.route)}
                                  key={i}
                                >
                                  <div className="h-full border-r-1 border-main-red"></div>
                                  <ListItemButton
                                    sx={{
                                      fontSize: "12px",
                                      mr: 2.5,
                                      ml: open ? 1 : 0,
                                      paddingLeft: "0.5rem",
                                      borderRadius: "6px",
                                      backgroundColor:
                                        window.location.pathname.includes(
                                          child.route
                                        )
                                          ? "#E41205"
                                          : "",
                                      color: window.location.pathname.includes(
                                        child.route
                                      )
                                        ? "#FFF"
                                        : "",
                                      "&:hover": {
                                        backgroundColor:
                                          window.location.pathname.includes(
                                            child.route
                                          )
                                            ? "#E41205"
                                            : "",
                                        color:
                                          window.location.pathname.includes(
                                            child.route
                                          )
                                            ? "#FFF"
                                            : "",
                                      },
                                    }}
                                    className={`ms-3 w-fit`}
                                  >
                                    <div className="border-r-1 border-main-red"></div>
                                    {t(child.translationKey)}
                                  </ListItemButton>
                                </div>
                              );
                            })}
                          </List>
                        </Collapse>
                      </Fragment>
                    );
                  }

                  if (item.route !== "/") {
                    return (
                      <ListItemButton
                        dense
                        sx={{
                          marginTop: "1rem",
                          paddingLeft: open ? 2 : 0,
                          color: "#84848C",
                        }}
                        onClick={() => navigate(item.route as string)}
                        key={index}
                        className={
                          window.location.pathname.includes(
                            item.route as string
                          )
                            ? "active-sidebar"
                            : ""
                        }
                      >
                        <ListItemIcon
                          className={`flex justify-center ${
                            window.location.pathname.includes(
                              item.route as string
                            )
                              ? "active-sidebar-icon"
                              : ""
                          }`}
                          sx={{
                            color: "#84848C",
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primaryTypographyProps={{
                            sx: {
                              // color: isActive === index ? "#E41205" : null,
                              fontSize: "14px",
                              fontWeight: "600",
                              // "&:hover": {
                              //   color: "#E41205",
                              // },
                            },
                          }}
                          className={`${
                            open ? "" : "opacity-0"
                          } transition-all`}
                          primary={t(item.translationKey)}
                        />
                      </ListItemButton>
                    );
                  }

                  return (
                    <ListItemButton
                      dense
                      sx={{
                        marginTop: "1rem",
                        paddingLeft: open ? 2 : 0,
                        color: "#84848C",
                      }}
                      onClick={() => navigate(item.route as string)}
                      key={index}
                    >
                      <ListItemIcon
                        className={`flex justify-center`}
                        sx={
                          {
                            // color: isActive === index ? "#E41205" : null,
                            // "&:hover": {
                            //   color: "#E41205",
                            //   fill: "#E41205",
                            // },
                          }
                        }
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{
                          sx: {
                            // color: isActive === index ? "#E41205" : null,
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#84848C",
                          },
                        }}
                        className={`${open ? "" : "opacity-0"} transition-all`}
                        primary={t(item.translationKey)}
                      />
                    </ListItemButton>
                  );
                }
              })}
            </List>
          </div>
          <div className="pb-10">
            <List>
              <ListItemButton
                dense
                sx={{
                  marginTop: "1rem",
                  paddingLeft: open ? 2 : 0,
                  // "&:hover": {
                  //   color: "#E41205",
                  //   fill: "#E41205",
                  // },
                }}
                onClick={() => {
                  handleLogOut();
                }}
              >
                <ListItemIcon
                  className="flex justify-center"
                  sx={{
                    color: "#84848C",
                  }}
                >
                  <GoSignOut />
                </ListItemIcon>
                {open ? (
                  <ListItemText
                    sx={{
                      color: "#84848C",
                    }}
                  >
                    {t("signOut")}
                  </ListItemText>
                ) : null}
              </ListItemButton>
            </List>
          </div>
        </>
      )}
    </Drawer>
  );
};

export default Sidebar;
