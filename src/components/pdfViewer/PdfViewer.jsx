import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import Loader from "../loader/Loader";

const PdfViewer = ({ pdfUrl }) => {
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(10000); // Default timer duration

  // Fetch PDF file size and adjust timer based on size
  const handleGet = useCallback(async () => {
    try {
      const response = await fetch(pdfUrl);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Read the response body as text
      const data = await response.text();
      const dataSize = new Blob([data]).size;

      // Set timer based on the size of the fetched data
      if (dataSize > 23557111) {
        setTimer(10000); // Set longer timer for larger files
      } else {
        setTimer(5000); // Set shorter timer for smaller files
      }

      console.log(`Data size: ${dataSize} bytes`); // Log the size of the data

      // Automatically hide the loader after the timer duration
      setLoading(true); // Set loading to true before starting timer
      setTimeout(() => {
        setLoading(false); // Hide loader after timer duration
      }, timer);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, [pdfUrl, timer]);

  useEffect(() => {
    if (!pdfUrl) return; // If no URL, exit
    handleGet(); // Fetch the PDF
  }, [handleGet, pdfUrl]);
  useEffect(() => {
    // Scroll to the top of the page on component mount
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const iframe = document.getElementById("my-iframe");
    if (iframe) {
      const style = document.createElement("style");
      style.textContent = `
        @media print {
          body {
            display: none !important;
          }
        }
      `;
      iframe.contentWindow.document.head.appendChild(style);
    }
  }, []);

  return (
    <>
      <h3 style={{ display: loading ? "inline" : "none" }}>
        <Loader />
      </h3>
      <>
        <iframe
          id="my-iframe"
          onKeyDown={(e) => {
            if (e.ctrlKey && e.key === "s") {
              e.preventDefault();
              alert("Save function is disabled.");
            }
            // debugger;
          }}
          // id="pdfIframe"
          // src={loading ? undefined : `${pdfUrl}#toolbar=0`} // Load only when not loading
          src={`${pdfUrl}#toolbar=0`}
          name="iframe_a"
          height={"100vh"}
          width={"100%"}
          style={{
            minHeight: "100vh",
            display: loading ? "none" : "inline", // Hide iframe while loading
          }}
          onContextMenu="return false;"
          // title="Iframe Example"
          onLoad={() => {
            console.log("Iframe content loaded");
            setLoading(false); // Set loading to false when iframe is loaded
          }}
        />
        {/* <div
          className="overlay"
          onContextMenu={(e) => e.preventDefault()}
        ></div> */}
      </>
    </>
  );
};

export default PdfViewer;

PdfViewer.propTypes = {
  pdfUrl: PropTypes.string.isRequired,
};
