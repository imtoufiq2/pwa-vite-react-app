import PropTypes from "prop-types";
// export default PdfViewer;
import { Worker } from "@react-pdf-viewer/core";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
// import { useGlobalHook } from "../../Contexts";
import { useEffect } from "react";
import Comments from "../comment";
import { useGlobalHook } from "../../context/Contexts";

const PdfViewer = ({ pdfUrl }) => {
  const { darkMode } = useGlobalHook();
  console.log({ darkMode });
  useEffect(() => {
    // Select all elements with the class 'rpv-core__inner-page'
    const pdfPages = document.querySelectorAll(".rpv-core__inner-page");

    if (darkMode) {
      // Apply dark mode styles
      pdfPages.forEach((page) => {
        page.style.backgroundColor = "#343332"; // Dark background color
        page.style.color = "#e0e0e0"; // Light text color
      });
    } else {
      // Revert back to light mode styles
      pdfPages.forEach((page) => {
        page.style.backgroundColor = ""; // Default background
        page.style.color = ""; // Default text color
      });
    }
  }, [darkMode]); // Run effect when darkMode changes
  return (
    <div
      id="_pdf_viewer"
      style={{ border: "2px solid red" }}
      className={darkMode ? "pdf-dark-mode" : ""}
    >
      <Comments />
      <Worker
        style={{ width: "100%", height: "100%" }}
        workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js"
      >
        <Viewer fileUrl={pdfUrl} style={{ width: "100%", height: "100%" }} />
      </Worker>
    </div>
  );
};
PdfViewer.propTypes = {
  pdfUrl: PropTypes.string.isRequired,
};
export default PdfViewer;
