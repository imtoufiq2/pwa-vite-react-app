import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { Fab } from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalHook } from "../context/Contexts";
import { baseStr } from "../routers";

export default function FloatingFooterAction() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(1);
  const { darkMode } = useGlobalHook();
  const noShow = [
    `${baseStr}/sign-in`,
    `${baseStr}/verify-otp`,
    `${baseStr}/enter-mobile`,
    `${baseStr}/forgot-password`,
  ];
  const hidePrivateIcon = noShow.some((path) =>
    location?.pathname.includes(path)
  );

  return (
    <div style={{ display: hidePrivateIcon ? "none" : "flex" }}>
      <div id="_spacing" style={{ height: "56px" }} />
      <Box
        id="_FloatingFooterAction_box"
        style={{ width: "100vw" }}
        sx={{
          // position: {
          //   xs: "Fixed",
          //   md: "Static",
          // },
          position: "fixed",
          zIndex: "100",
          right: "0px",
          bottom: "0px",
          left: "0px",
          boxShadow:
            "0px -2px 4px -1px rgba(0,0,0,0.2), 0px -4px 5px 0px rgba(0,0,0,0.03), 0px -1px 0px 0px rgba(0,0,0,0.12)",
        }}
      >
        <BottomNavigation
          id="_bottom_navigation"
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            bgcolor: darkMode ? "#343332" : "background.paper",

            "& .MuiBottomNavigationAction-root": {
              color: "#fbb02f", // Set color of non-active icons
            },
            "& .Mui-selected": {
              border: "none",
              outline: "none",
              // color: "red", // Set color of active icon
              // Remove border or outline
              "& .MuiBottomNavigationAction-icon": {
                border: "none",
                outline: "none",
              },
            },
            "& .MuiBottomNavigationAction-label": {
              // Optional: You can style labels here if needed
            },
          }}
        >
          <BottomNavigationAction
            sx={{ display: hidePrivateIcon ? "none" : "flex" }}
            style={{ border: "none", outline: "none" }}
            label="Logout"
            onClick={() => {
              navigate(`${baseStr}/sign-in`);
              sessionStorage.clear();
            }}
            icon={<ExitToAppRoundedIcon />}
          />
          {/* <BottomNavigationAction
            // label="Favorites"
            id="_home_nav_button"
            onClick={() => navigate("/boardmeeting/companies")}
            disabled={location.pathname !== "/boardmeeting/companies"}
            sx={{
              display: hidePrivateIcon ? "none" : "flex",
              border: "none",
              outline: "none",
            }}
            icon={
              <Fab
                id="_home_nav_button_fab"
                color="primary"
                aria-label="add"
                style={{ border: "none", outline: "none" }}
                disabled={location.pathname !== "/boardmeeting/companies"}
              >
                <HomeRoundedIcon />
              </Fab>
            }
          /> */}
          <BottomNavigationAction
            id="_home_nav_button"
            onClick={() => navigate(`${baseStr}/companies`)}
            disabled={location.pathname !== `${baseStr}/companies`}
            sx={{
              display: hidePrivateIcon ? "none" : "flex",
              border: "none",
              outline: "none",
            }}
            icon={
              <Fab
                id="_home_nav_button_fab"
                aria-label="add"
                style={{
                  border: "none",
                  outline: "none",
                  backgroundColor:
                    location.pathname !== `${baseStr}/companies`
                      ? "#e0e0e0"
                      : "", // Light gray when disabled
                  color:
                    location.pathname !== `${baseStr}/companies`
                      ? "#ffffff"
                      : "orange", // White icon when disabled
                }}
                disabled={location.pathname !== `${baseStr}/companies`}
              >
                <HomeRoundedIcon />
              </Fab>
            }
          />

          <BottomNavigationAction
            id="_button_dark"
            disabled
            style={{
              border: "none",
              outline: "none",
              cursor: "default",
            }}
            label={
              JSON.parse(sessionStorage.getItem("loginData"))?.username ?? ""
            }
          />
        </BottomNavigation>
      </Box>
    </div>
  );
}
