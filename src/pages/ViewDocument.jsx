import { Box } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";

import DescriptionIcon from "@mui/icons-material/Description";
import PdfViewer from "../components/pdfViewer/PdfViewer";
import { useCallback, useEffect, useState } from "react";
import encryptData from "../helpers/encryption";
import decryptData from "../helpers/decryption";
import Loader from "../components/loader/Loader";
import { slideInRight } from "../helpers/animations";
import { getDecryptedPDFForJWT } from "../helpers/pdfDecryption";
import DarkMode from "../components/DarkMode";
import { baseUrl } from "../App";

const ViewDocument = () => {
  const [loading, setLoading] = useState(false);
  const [reportFile, setReportFile] = useState("");

  const getReportDetails = useCallback(async () => {
    const body = { meetingDetailId: 4417 };
    try {
      setLoading(true);
      const encryptedData = encryptData(body);
      const response = await fetch(
        `${baseUrl}/api/Meeting/GetReportPathDetails`,
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

      if (responseData?.success) {
        setReportFile(responseData?.data?.ReportPath ?? "");
        sessionStorage.setItem(
          "xYz123!@#d",
          encryptData(
            JSON.stringify({
              docData: responseData?.data?.ReportPath ?? "",
            })
          )
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Error making POST request:", error);
      if (!navigator.onLine) {
        const storedData = sessionStorage.getItem("xYz123!@#d");
        if (storedData) {
          const decryptedData = JSON.parse(decryptData(storedData));
          setReportFile(decryptedData?.docData ?? "");
        } else {
          console.warn("No data found in session storage.");
        }
      }
      setLoading(false);
      // throw new Error("Somethings went wrong");
    }
  }, []);

  useEffect(() => {
    getReportDetails();
  }, [getReportDetails]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            animation: `${slideInRight} 0.3s ease-out`,
          }}
        >
          <ResponsiveAppBar
            icon={DescriptionIcon}
            title="View PDF"
            searchQuery={""}
            setSearchQuery={() => {}}
          />
          <DarkMode />
          <PdfViewer pdfUrl={getDecryptedPDFForJWT(reportFile)} />
        </Box>
      )}
    </>
  );
};

export default ViewDocument;
