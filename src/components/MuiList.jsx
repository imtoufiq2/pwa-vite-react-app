import PropTypes from "prop-types";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Pagination,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import EmptyState from "./EmptyState";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { useGlobalHook } from "../context/Contexts";

export const MuiList = ({
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

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate the items to show on the current page
  const paginatedList = listToShow.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

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
          paginatedList.map((cur, index) => (
            <ListItem
              id="_list_item"
              key={index}
              disablePadding
              onClick={() => {
                if (cur.CompanyID) {
                  navigate(`/boardmeeting/${nextRoute}/${cur.CompanyID ?? 0}`);
                } else if (cur.CommitteeID) {
                  navigate(
                    `/boardmeeting/${nextRoute}/${cur.CommitteeID ?? 0}`
                  );
                } else {
                  navigate(
                    `/boardmeeting/${nextRoute}/${cur.MeetingDetailID ?? 0}`
                  );
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
              }}
            >
              {console.log("curdata", cur)}
              <ListItemButton>
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
                        color: darkMode && "#ffae18",
                      }}
                    >
                      {location?.pathname === "/boardmeeting/companies"
                        ? cur?.CompanyName
                        : location.pathname.includes("/boardmeeting/reports")
                        ? cur?.ReportName
                        : location.pathname.includes("/boardmeeting/department")
                        ? cur.CommitteeName
                        : cur.name}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
      {/* Pagination Component */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "16px",
        }}
      >
        <Pagination
          count={Math.ceil(listToShow.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          variant="text"
          shape="rounded"
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              color: darkMode ? "White" : "black",
            },
          }}
        />
      </Box>
      {/* asdf */}
    </Box>
  );
};

MuiList.propTypes = {
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
