import { Box } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { MuiList } from "../components/MuiList";
// import { reportsList } from "../data/reports";
import { useCallback, useEffect, useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import encryptData from "../helpers/encryption";
import decryptData from "../helpers/decryption";
import Loader from "../components/loader/Loader";
import useScrollToTop from "../hooks/useScrollToTop";
import { slideInRight } from "../helpers/animations";
import { useNavigate, useParams } from "react-router-dom";
import pdfLogo from "/icons8-export-pdf-50.png";

import DarkMode from "../components/DarkMode";

const Reports = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  useScrollToTop();

  const [searchQuery, setSearchQuery] = useState("");
  const [reportsData, setReportsData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!JSON.parse(sessionStorage.getItem("loginData"))?.accessToken) {
      navigate("/boardmeeting/sign-in");
      return;
    }
  }, [navigate]);
  // Filter reportsList based on searchQuery
  const filteredList = searchQuery
    ? reportsData.filter(
        (report) =>
          report.ReportName?.toLowerCase()?.includes(
            searchQuery.toLowerCase()
          ) || report?.MeetingDetailID?.toString()?.includes(searchQuery)
      )
    : reportsData;

  const getReports = useCallback(async () => {
    if (!id) {
      return;
    }
    const body = { meetingDetailId: id ?? "0" };
    sessionStorage.setItem("idr", body?.meetingDetailId);
    try {
      setLoading(true);
      const encryptedData = encryptData(body);
      const response = await fetch(
        "/BoardMeetingApi/api/Meeting/GetMeetingDetails",
        {
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
        }
      );
      // Handle non-JSON responses
      const result = await response.text();

      const responseData = decryptData(result);
      console.log({ responseData });
      if (responseData?.success) {
        setReportsData(responseData?.data);
        sessionStorage.setItem(
          "xYz123!@#r",
          encryptData(
            JSON.stringify({
              reportData: responseData?.data,
            })
          )
        );
      }
      setLoading(false);
    } catch (error) {
      console.error("Error making POST request:", error);
      if (!navigator.onLine) {
        const storedData = sessionStorage.getItem("xYz123!@#r");
        if (storedData) {
          const decryptedData = JSON.parse(decryptData(storedData));
          setReportsData(decryptedData?.reportData ?? []);
        } else {
          console.warn("No data found in session storage.");
        }
      }
      setLoading(false);
    }
  }, [id]);
  useEffect(() => {
    getReports();
  }, [getReports]);
  return (
    <>
      {loading && !searchQuery ? (
        <Loader />
      ) : (
        <Box
          sx={{
            animation: `${slideInRight} 0.3s ease-out`,
          }}
        >
          <ResponsiveAppBar
            icon={DescriptionIcon}
            title="Reports"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {/* <img src={pdfLogo} alt="" /> */}

          <Box
            className="poppins"
            sx={{
              minHeight: "100vh",
              overflow: "hidden",
              maxWidth: "592px",
              margin: "auto",
              marginTop: {
                // xs: "24px",
                lg: "24px",
              },
            }}
          >
            <MuiList
              listToShow={filteredList}
              showIcon
              nextRoute="file/view"
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
              logo={pdfLogo}
            />
          </Box>
        </Box>
      )}
      <DarkMode />
    </>
  );
};

export default Reports;
