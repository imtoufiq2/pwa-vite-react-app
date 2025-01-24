import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
// import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import PropTypes from "prop-types";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { Button, IconButton, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useGlobalHook } from "../context/Contexts";
import { baseStr } from "../routers";
import { whiteColor } from "../App";
// import { useGlobalHook } from "../Contexts";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  // backgroundColor: "red",
  border: "1px solid red",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  // border: "2px solid red",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar({
  icon: Icon,
  title,
  searchQuery,
  setSearchQuery,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Auto-focus the input field on component mount
    }
  }, []);

  const { darkMode } = useGlobalHook();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        // position="static"
        id="_app_bar"
        sx={{
          zIndex: "1000",
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.03), 0px 1px 0px 0px rgba(0,0,0,0.12)",
        }}
      >
        <Toolbar
          id="_tool_bar"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#fff",
            // color: "#2b2e8c", //todo darkMode ? "white" : "#343332",
            color: darkMode ? whiteColor : "#2b2e8c",
          }}
          style={{ backgroundColor: darkMode ? "#343332" : "#fff" }}
        >
          <Stack
            id="_first_stack"
            direction="row"
            gap={2}
            flexGrow={1}
            alignItems="center"
          >
            {location?.pathname !== `${baseStr}/companies` && (
              <>
                <IconButton
                  id="_icon_btn"
                  onClick={() => navigate(-1)}
                  aria-label="back button"
                  sx={{
                    display: { xs: "block", lg: "none" },
                    maxHeight: { xs: "38px", lg: "auto" },
                    // backgroundColor: "#2b2e8c",
                    backgroundColor: `${darkMode ? whiteColor : "#474bb7"}`,
                    // backgroundColor: "#000",
                    "&:hover": {
                      // backgroundColor: "red",
                      backgroundColor: `${!darkMode ? whiteColor : "#474bb7"}`,
                    },
                    "&:focus": {
                      outline: "none",
                      border: "none",
                    },
                  }}
                >
                  <ArrowBackIosIcon
                    id="_icon"
                    sx={{
                      fontSize: 20,
                      color: `${!darkMode ? whiteColor : "#2b2e8c"}`,
                      position: "relative", // Set position to relative
                      top: "-2px", // Move the icon upwards
                      left: "3px", // Move the icon to the right
                    }}
                  />
                </IconButton>
                <Button
                  onClick={() => navigate(-1)}
                  variant="contained"
                  sx={{
                    display: { xs: "none", lg: "block" },
                    // backgroundColor: "#f9af29",     color: darkMode ? whiteColor : "#2b2e8c",
                    backgroundColor: darkMode ? "#343332" : "#fff",
                    border: `2px solid ${darkMode ? whiteColor : "#2b2e8c"}`,
                    maxHeight: "38px", // Updated maxHeight
                    // color: "white",
                    color: `${darkMode ? whiteColor : "#2b2e8c"}`,
                    borderRadius: "8px",
                    padding: "6px 12px", // Adjusted padding to fit within maxHeight
                    fontSize: "0.875rem", // Adjusted font size
                    lineHeight: "1.5", // Ensures text fits well
                    "&:hover": {
                      backgroundColor: `${!darkMode ? whiteColor : "#2b2e8c"}`,
                      // border: "2px solid red",
                      opacity: "0.6",
                    },
                    "&:focus": {
                      outline: "none",
                      border: "none",
                    },
                    "&:active": {
                      outline: "none",
                      border: "none",
                    },
                  }}
                >
                  Back
                </Button>
              </>
            )}
            <Stack
              direction={"row"}
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                paddingRight:
                  location?.pathname !== `${baseStr}/companies`
                    ? "38px"
                    : "0px",
              }}
            >
              <Icon sx={{ fontSize: 40 }} />
              {/* <img src={logo} alt="" /> */}
              <Typography
                sx={{
                  fontSize: {
                    xs: "20px", // For small screens (<md)
                    md: "24px", // For medium screens (>=md)
                  },
                }}
                variant="h2"
                noWrap
                component="div"
              >
                {title}
              </Typography>
            </Stack>
          </Stack>

          <Search
            sx={{
              visibility: location.pathname?.includes("/file/view")
                ? "hidden"
                : "visible",
              display: {
                xs: "none",
                lg: "block",
                border: `1.3px solid ${darkMode ? whiteColor : "#2b2e8c"}`,
                "& .MuiInputBase-input::placeholder": {
                  color: `${darkMode ? whiteColor : "#2b2e8c"}`,
                },
              },
            }}
          >
            <SearchIconWrapper id="_search_wrapper">
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              // inputRef={inputRef}
            />

            {searchQuery?.length > 0 && (
              <IconButton
                aria-label="clear"
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  height: "100%",
                  outline: "none",
                }}
              >
                <ClearIcon color="warning" />
              </IconButton>
            )}
          </Search>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          minHeight: "63.99px",
          // minHeight: {
          //   xs: "0px",
          //   md: "63.99px",
          // },
        }}
      ></Box>
    </Box>
  );
}

SearchAppBar.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  // handleSearch: PropTypes.func,
  setSearchQuery: PropTypes.func.isRequired,
};
