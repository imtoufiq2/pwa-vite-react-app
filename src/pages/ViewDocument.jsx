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
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ReactPdfViewer from "../components/react-pdf-viewer/ReactPdfViewer";

const ViewDocument = () => {
  const [loading, setLoading] = useState(false);
  const [reportFile, setReportFile] = useState("");
  const { id } = useParams();
  const [isLargeFile, setIsLargeFile] = useState(false);
  const [showFileViwer, setShowFileViewer] = useState(false);

  const limitToChangeViwer = 10000000;
  // function to get the file size

  const handleGet = useCallback(async (pdfUrl) => {
    try {
      const response = await fetch(pdfUrl);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Read the response body as text
      const data = await response.text();
      const dataSize = new Blob([data])?.size ?? 0;
      if (dataSize > limitToChangeViwer) {
        setIsLargeFile(true);
      }
      setShowFileViewer(false);
      console.log(`Data size: ${dataSize} bytes`); // Log the size of the data
    } catch (error) {
      console.error("Fetch error:", error);
      setShowFileViewer(false);
    }
  }, []);

  const getReportDetails = useCallback(async () => {
    if (!id) {
      toast.error("Id is missing");
      return;
    }
    const body = { meetingDetailId: id ?? "0" };
    try {
      setLoading(true);
      setShowFileViewer(true);
      const encryptedData = encryptData(body);
      const response = await fetch(
        `${baseUrl}/api/Meeting/GetReportPathDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            iPadId: "B9952D24-61A4-4D7F-8302-4702B5387BD5",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
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

        //checking the file size
        handleGet(getDecryptedPDFForJWT(responseData?.data?.ReportPath));

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
      setShowFileViewer(false);
      // throw new Error("Somethings went wrong");
    }
  }, [handleGet, id]);

  useEffect(() => {
    getReportDetails();
  }, [getReportDetails]);

  return (
    <>
      {loading || showFileViwer ? (
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
          {!loading &&
            !showFileViwer &&
            (!isLargeFile ? (
              <ReactPdfViewer pdfUrl={getDecryptedPDFForJWT(reportFile)} />
            ) : (
              <PdfViewer pdfUrl={getDecryptedPDFForJWT(reportFile)} /> // this is the blur
            ))}
        </Box>
      )}
    </>
  );
};

export default ViewDocument;
