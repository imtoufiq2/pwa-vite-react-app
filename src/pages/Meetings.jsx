import { Box } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Groups2Icon from "@mui/icons-material/Groups2";
import { MuiListMeeting } from "../components/MuiListMeeting";
// import { MeetingLists } from "../data/MeetingList";
import { useCallback, useEffect, useState } from "react";

import useScrollToTop from "../hooks/useScrollToTop";
import encryptData from "../helpers/encryption";
import decryptData from "../helpers/decryption";
import Loader from "../components/loader/Loader";
// import EmptyState from "../components/EmptyState";
import { useNavigate, useParams } from "react-router-dom";
import { slideInRight } from "../helpers/animations";
import DarkMode from "../components/DarkMode";

const Meetings = () => {
  const navigate = useNavigate();
  useScrollToTop();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [meetingsData, setMeetingsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!JSON.parse(sessionStorage.getItem("loginData"))?.accessToken) {
      navigate("/boardmeeting/sign-in");
      return;
    }
  }, [navigate]);

  // const handleSearch = (value) => {
  //   setSearchQuery(value.trim().toLowerCase());
  // };
  function sortMeetingsByDateAndTimeDesc(meetings) {
    return meetings.sort((a, b) => {
      // Convert MeetingDate to Date objects for comparison
      const dateA = new Date(a.MeetingDate);
      const dateB = new Date(b.MeetingDate);

      // Compare by MeetingDate first (in descending order)
      if (dateA > dateB) return -1;
      if (dateA < dateB) return 1;

      // If MeetingDate is the same, compare by MeetingStartTime (in descending order)
      const timeA = new Date(a.MeetingStartTime);
      const timeB = new Date(b.MeetingStartTime);

      return timeB - timeA;
    });
  }

  const filteredList = searchQuery
    ? meetingsData.filter(
        (meeting) =>
          meeting.MeetingVenue.toLowerCase().includes(searchQuery) ||
          meeting.MeetingStartTime.toLowerCase().includes(searchQuery) ||
          meeting.MeetingEndTime.toLowerCase().includes(searchQuery) ||
          meeting.MeetingDate.toLowerCase().includes(searchQuery) ||
          meeting.MeetingID.toString().includes(searchQuery)
      )
    : meetingsData;

  const getMeetings = useCallback(async () => {
    const body = { committeid: id ?? 0 };
    try {
      setLoading(true);
      const encryptedData = encryptData(body);
      const response = await fetch("/BoardMeetingApi/api/Meeting/GetMeetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          iPadId: "B9952D24-61A4-4D7F-8302-4702B5387BD5",
          Authorization: `Bearer ${
            JSON.parse(sessionStorage.getItem("loginData"))?.accessToken
          }`,
          clientCode: JSON.parse(
            decryptData(sessionStorage.getItem("a3YvZ1qP"))
          )?.clientCode,
          "Accept-Encoding": "br",
        },
        body: encryptedData,
      });
      // Handle non-JSON responses
      const result = await response.text();

      const responseData = decryptData(result);
      console.log(
        "responseData",
        sortMeetingsByDateAndTimeDesc(responseData?.data)
      );
      if (responseData?.success) {
        setMeetingsData(
          sortMeetingsByDateAndTimeDesc(responseData?.data) ?? []
        );
        // setMeetingsData([]);
        // const previousData = JSON.parse(
        //   decryptData(sessionStorage.getItem("xYz123!@#"))
        // );
        sessionStorage.setItem(
          "xYz123!@#m",
          encryptData(
            JSON.stringify({
              meetingData:
                sortMeetingsByDateAndTimeDesc(responseData?.data) ?? [],
            })
          )
        );
        // sessionStorage.setItem(
        //   "xYz123!@#",
        //   encryptData(
        //     JSON.stringify({
        //       meetingData:
        //         sortMeetingsByDateAndTimeDesc(responseData?.data) ?? [],
        //     })
        //   )
        // );
      }
    } catch (error) {
      console.error("Error making POST request:", error);
      if (!navigator.onLine) {
        const storedData = sessionStorage.getItem("xYz123!@#m");
        if (storedData) {
          const decryptedData = JSON.parse(decryptData(storedData));
          setMeetingsData(decryptedData?.meetingData ?? []);
        } else {
          console.warn("No data found in session storage.");
        }
      }
    } finally {
      setLoading(false);
    }
  }, [id]);
  useEffect(() => {
    getMeetings();
  }, [getMeetings]);

  return (
    <>
      {/* {console.log("asdfasdfasd", loading, !searchQuery)} */}
      {loading && !searchQuery ? (
        <Loader />
      ) : (
        <Box
          sx={{
            animation: `${slideInRight} 0.3s ease-out`,
          }}
        >
          <ResponsiveAppBar
            icon={Groups2Icon}
            title="Meetings"
            // handleSearch={handleSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <Box
            className="poppins"
            sx={{
              // minHeight: "fitContent",
              // overflow: "scroll",
              maxWidth: "592px",
              margin: "auto",
              marginTop: {
                lg: "24px",
              },
            }}
          >
            <MuiListMeeting
              listToShow={filteredList}
              nextRoute="department"
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
            />
          </Box>
        </Box>
      )}
      <DarkMode />
    </>
  );
};

export default Meetings;
