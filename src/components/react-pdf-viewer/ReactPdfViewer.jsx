import PropTypes from "prop-types";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useEffect, useState, useCallback } from "react";
import Comments from "../comment";
import { useRef } from "react";
import { useGlobalHook } from "../../context/Contexts";
// import Loader from "../loader"; // Assuming you have a loader component for loading spinner

const ReactPdfViewer = ({ pdfUrl }) => {
  const { darkMode } = useGlobalHook();
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const applyDarkModeStyles = useCallback(() => {
    const pdfPages = document.querySelectorAll(".rpv-core__inner-page");

    if (darkMode) {
      pdfPages.forEach((page) => {
        page.style.backgroundColor = "#343332";
        page.style.color = "#e0e0e0";
      });
    } else {
      pdfPages.forEach((page) => {
        page.style.backgroundColor = "white";
        page.style.color = "black";
      });
    }
  }, [darkMode]);

  useEffect(() => {
    if (pdfLoaded && !error) {
      applyDarkModeStyles();
    }
  }, [darkMode, pdfLoaded, error, applyDarkModeStyles]);

  const handleDocumentLoad = useCallback(() => {
    setPdfLoaded(true);
    setLoading(false); // Stop the loader when the document is loaded
    setError(null);
  }, []);

  const handleError = useCallback((err) => {
    setLoading(false); // Stop loading in case of an error
    setError(err);
    console.error("PDF Loading Error:", err);
  }, []);
  const pdfViewerRef = useRef(null);

  useEffect(() => {
    const pdfViewerElement = pdfViewerRef.current;

    // Only add event listener if the element exists
    if (pdfViewerElement) {
      const handleScroll = (event) => {
        // Your scroll logic here
        if (
          event.target.scrollTop + event.target.clientHeight >=
          event.target.scrollHeight
        ) {
          event.preventDefault();
          event.target.scrollTo(
            0,
            event.target.scrollHeight - event.target.clientHeight
          );
        }
      };

      pdfViewerElement.addEventListener("scroll", handleScroll);

      // Cleanup the event listener on component unmount
      return () => {
        pdfViewerElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  return (
    <div id="_pdf_viewer" className={darkMode ? "pdf-dark-mode" : ""}>
      {loading && ""} {/* Display a loader while the PDF is loading */}
      <Comments />
      <Worker
        workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js"
        onError={handleError}
      >
        <Viewer
          fileUrl={pdfUrl}
          defaultScale={1.0}
          withCredentials={false}
          onDocumentLoad={handleDocumentLoad}
          onError={handleError}
          renderMode="canvas" // Use canvas for better performance with large PDFs
          enableSmoothScroll={true} // Enable smooth scroll for better UX
        />
      </Worker>
      {error && <div>Error loading PDF. Please try again.</div>}{" "}
      {/* Error handling */}
    </div>
  );
};

ReactPdfViewer.propTypes = {
  pdfUrl: PropTypes.string.isRequired,
};

export default ReactPdfViewer;
