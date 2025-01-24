import PropTypes from "prop-types";
import {
  Box,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import AddCommentIcon from "@mui/icons-material/AddComment"; // Import icon for Fab

import { useLocation, useNavigate } from "react-router-dom";
import EmptyState from "./EmptyState";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { useGlobalHook } from "../context/Contexts";
import { useTheme } from "@emotion/react";
import FormModalExample from "./addComment";
import ViewComments from "./viewComments";
import { baseStr } from "../routers";
import { whiteColor } from "../App";

export const MuiReportList = ({
  showIcon,
  nextRoute = "",
  setSearchQuery,
  searchQuery,
  listToShow,
  loading,
  logo,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useGlobalHook();
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);

  const handleSearchChange = (query) => {
    setSearchQuery(query.toLowerCase() ?? "");
  };

  return (
    <Box
      sx={{
        padding: {
          xs: "20px",
          lg: "0px",
        },
        paddingTop: {
          xs: "12px",
        },
      }}
    >
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange}
      />
      <List
        sx={{
          gap: {
            xs: "4px",
            md: "8px",
          },
          display: "flex",
          flexDirection: "column",
        }}
      >
        {listToShow.length === 0 && !loading ? (
          <EmptyState />
        ) : (
          listToShow?.map((cur, index) => (
            <ListItem
              id="_list_item"
              key={index}
              disablePadding
              onClick={() => {
                if (cur.CompanyID) {
                  navigate(`${baseStr}/${nextRoute}/${cur.CompanyID ?? 0}`);
                } else if (cur.CommitteeID) {
                  navigate(`${baseStr}/${nextRoute}/${cur.CommitteeID ?? 0}`);
                } else {
                  navigate(
                    `${baseStr}/${nextRoute}/${cur.MeetingDetailID ?? 0}`
                  );
                  sessionStorage.setItem("longId", cur.MeetingDetailID);

                  if (location.pathname.includes("/reports")) {
                    sessionStorage.setItem("url", cur?.ReportPath ?? "");
                  }
                }
              }}
              style={{
                boxShadow:
                  darkMode &&
                  `
                0px 2px 1px -1px rgba(249, 175, 41, 0.2),
                0px 1px 1px 0px rgba(249, 175, 41, 0.14),
                0px 1px 3px 0px rgba(249, 175, 41, 0.12)
              `,
              }}
              sx={{
                borderRadius: "8px",
                overflow: "hidden",
                bgcolor: darkMode ? "#343332" : "background.paper",
                margin: "4px 0",
                boxShadow: 1,
                paddingRight: isLgUp ? "0px" : "5px",
                paddingTop: isLgUp ? "0px" : "5px",
                "&:hover": {
                  backgroundColor: darkMode
                    ? "#2c2c2c"
                    : (theme) => theme.palette.action.hover, // Adjust hover background color
                  boxShadow: darkMode
                    ? "0px 4px 8px rgba(0, 0, 0, 0.5)"
                    : "0px 4px 8px rgba(0, 0, 0, 0.2)", // Corrected box shadow syntax
                  cursor: "pointer", // Change cursor to pointer to indicate clickability
                },
              }}
            >
              <ListItemButton id="_butn">
                {showIcon && (
                  <ListItemIcon>
                    <img
                      src={logo}
                      alt="pdf-icon"
                      style={{ width: "35px", height: "35px" }}
                    />
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={
                    <Typography
                      variant="h6"
                      component="h6"
                      sx={{
                        fontSize: "16px",
                        letterSpacing: "-0.3px",
                        fontWeight: "500",
                        // color: "red",
                        color: darkMode && whiteColor,
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        whiteSpace: "normal",
                      }}
                    >
                      {location?.pathname === `${baseStr}/companies`
                        ? cur?.CompanyName
                        : location.pathname.includes(`${baseStr}/reports`)
                        ? cur?.ReportName
                        : location.pathname.includes(`${baseStr}/department`)
                        ? cur.CommitteeName
                        : cur.name}
                    </Typography>
                  }
                />
              </ListItemButton>

              {location.pathname.includes(`${baseStr}/reports`) && (
                <Stack
                  zIndex={1}
                  direction={isLgUp ? "row" : "column"}
                  sx={{
                    paddingRight: {
                      xs: "4px",
                      md: "8px",
                    },
                  }}
                  spacing={1}
                >
                  {/* Tooltip for View Comment */}
                  <Tooltip title="View Comment" arrow>
                    <Fab
                      size="small"
                      color="secondary"
                      aria-label="visibility"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default navigation or behavior
                        e.stopPropagation(); // Stop event from bubbling up to ListItem
                        sessionStorage.setItem("longId", cur.MeetingDetailID);

                        setOpenView(true);
                      }}
                      style={{
                        outline: "none",
                        border: "none",
                        borderRadius: "50%",
                      }}
                    >
                      <VisibilityIcon sx={{ color: "#2b2e8c" }} />
                    </Fab>
                  </Tooltip>

                  {/* Tooltip for Add Comment */}
                  <Tooltip title="Add Comment" arrow>
                    <Fab
                      size="small"
                      color="secondary"
                      aria-label="add"
                      id="_add-icon"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        sessionStorage.setItem("longId", cur.MeetingDetailID);

                        setOpen(true);
                      }}
                      style={{
                        outline: "none",
                        border: "none",
                        borderRadius: "50%",
                        // marginTop: "4px",
                      }}
                    >
                      <AddIcon sx={{ color: "#2b2e8c" }} />
                    </Fab>
                  </Tooltip>
                </Stack>
              )}
            </ListItem>
          ))
        )}
      </List>

      <FormModalExample open={open} setOpen={setOpen} />
      <ViewComments open={openView} setOpen={setOpenView} />
    </Box>
  );
};

MuiReportList.propTypes = {
  showIcon: PropTypes.bool,
  loading: PropTypes.bool,
  nextRoute: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  listToShow: PropTypes.arrayOf(
    PropTypes.shape({
      CompanyID: PropTypes.number,
      CommitteeID: PropTypes.number,
      MeetingDetailID: PropTypes.number,
      ReportPath: PropTypes.string,
      CompanyName: PropTypes.string,
      ReportName: PropTypes.string,
      CommitteeName: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  logo: PropTypes.string,
};
