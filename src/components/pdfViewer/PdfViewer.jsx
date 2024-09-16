import PropTypes from "prop-types";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useEffect, useState } from "react";
import Comments from "../comment";
import { useGlobalHook } from "../../context/Contexts";

const PdfViewer = ({ pdfUrl }) => {
  const { darkMode } = useGlobalHook();
  const [pdfLoaded, setPdfLoaded] = useState(false);

  const applyDarkModeStyles = () => {
    const pdfPages = document.querySelectorAll(".rpv-core__inner-page");

    if (darkMode) {
      pdfPages.forEach((page) => {
        page.style.backgroundColor = "#343332"; // Dark background color
        page.style.color = "#e0e0e0"; // Light text color
      });
    } else {
      pdfPages.forEach((page) => {
        page.style.backgroundColor = "white"; // Default background
        page.style.color = "black"; // Default text color
      });
    }
  };

  useEffect(() => {
    if (pdfLoaded) {
      applyDarkModeStyles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode, pdfLoaded]); // Apply styles when darkMode or pdfLoaded state changes

  return (
    <div
      id="_pdf_viewer"
      // style={{ border: "2px solid red" }}
      className={darkMode ? "pdf-dark-mode" : ""}
    >
      <Comments />
      <Worker
        style={{ width: "100%", height: "100%" }}
        // workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js"
        Worker
        workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js"
      >
        <Viewer
          fileUrl={pdfUrl}
          onDocumentLoad={() => setPdfLoaded(true)} // Set pdfLoaded to true once the PDF is fully loaded
        />
      </Worker>
    </div>
  );
};

PdfViewer.propTypes = {
  pdfUrl: PropTypes.string.isRequired,
};

export default PdfViewer;
