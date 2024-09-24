import PropTypes from "prop-types";
import {
  Box,
  // Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import EmptyState from "./EmptyState";
import DateDisplay from "./dateDisplay/DateDisplay";
import getTimeFromDateTime from "../helpers/timeFromDateTime";
import getDateDetails from "../helpers/getDateDetails";
import { useState } from "react";
import { useGlobalHook } from "../context/Contexts";
import { baseStr } from "../routers";

export const MuiListMeeting = ({ listToShow, setSearchQuery, searchQuery }) => {
  const navigate = useNavigate();
  const { darkMode } = useGlobalHook();

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearchChange = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate the items to show on the current page
  const paginatedList = listToShow.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

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
        {paginatedList.length === 0 &&
        (searchQuery !== "" || searchQuery === "") ? (
          <EmptyState />
        ) : (
          paginatedList?.map((item) => (
            <ListItem
              onClick={() =>
                navigate(`${baseStr}/reports/${item.MeetingID ?? 0}`)
              }
              key={item.id}
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
                display: "flex",
                alignItems: "flex-start", // Align to the top
                cursor: "pointer",
                gap: {
                  xs: "8px",
                  lg: "12px",
                },
                borderRadius: "8px",
                overflow: "hidden",
                // bgcolor: "background.paper",
                bgcolor: darkMode ? "#343332" : "background.paper",

                margin: "4px 0",
                paddingRight: "12px",
                paddingLeft: "5px",
                boxShadow: 1,
              }}
              disablePadding
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "start",
                  height: "100%",
                  width: "100px",
                  padding: "8px",
                  textAlign: "center",
                  gap: "8px",
                }}
              >
                <DateDisplay
                  dateTorender={getDateDetails(item?.MeetingDate)?.day ?? 0}
                  monthTorender={getDateDetails(item?.MeetingDate)?.month ?? 0}
                  yearToRender={getDateDetails(item?.MeetingDate)?.year ?? 0}
                />
              </Box>
              <ListItemText
                primary={
                  <Typography
                    variant="h5"
                    component="h5"
                    sx={{
                      fontSize: {
                        xs: "16px",
                        lg: "18px",
                        color: darkMode && "#ffae18",
                      },
                      letterSpacing: "-0.3px",
                      fontWeight: "500",
                      marginBottom: {
                        xs: "4px",
                        md: "8px",
                      },
                    }}
                  >
                    {item.MeetingVenue
                      ? item.MeetingVenue
                      : "No venue specified"}
                  </Typography>
                }
                secondary={
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "4px",
                      color: darkMode && "#fff",
                    }}
                  >
                    <Typography variant="body2">
                      Start time: {getTimeFromDateTime(item.MeetingStartTime)}
                    </Typography>
                    <Typography variant="body2">
                      End time: {getTimeFromDateTime(item.MeetingEndTime)}
                    </Typography>
                  </Box>
                }
              />
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
    </Box>
  );
};

MuiListMeeting.propTypes = {
  listToShow: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      day: PropTypes.number.isRequired,
      month: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      MeetingVenue: PropTypes.string.isRequired,
    })
  ).isRequired,
  showIcon: PropTypes.bool,
  nextRoute: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

MuiListMeeting.defaultProps = {
  showIcon: false,
};
