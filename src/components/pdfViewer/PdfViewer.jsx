import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Comments from "../comment";
import { useGlobalHook } from "../../context/Contexts";
import FileViewer from "react-file-viewer";

const PdfViewer = ({ pdfUrl }) => {
  console.log(pdfUrl);
  const { darkMode } = useGlobalHook();
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const fileType = "pdf"; // Set the file type

  const onError = (e) => {
    console.log(e, "error in file-viewer");
  };

  // Function to apply dark mode styles
  // const applyDarkModeStyles = () => {};

  // useEffect(() => {
  //   if (pdfLoaded) {
  //     applyDarkModeStyles();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [darkMode, pdfLoaded]); // Apply styles when darkMode or pdfLoaded state changes
  // const data = document.getElementsByClassName("pdf-viewer");
  // console.log("data000000000", data);
  // Function to apply dark mode styles
  const applyDarkModeStyles = () => {
    const data = document.getElementsByClassName("pdf-viewer");

    // Check if the pdf-viewer class exists
    if (data.length > 0) {
      const viewerElement = data[0]; // Get the first element
      if (darkMode) {
        viewerElement.style.filter = "invert(1)";
      } else {
        viewerElement.style.filter = "invert(0)";
      }
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
      // className={`file-viewer ${darkMode ? "pdf-dark-mode" : ""}`} // Add file-viewer class
    >
      <Comments />
      <FileViewer
        fileType={fileType}
        filePath={pdfUrl} // Use the passed pdfUrl
        onError={onError}
        allowFullScreen={true}
        onDocumentLoad={() => setPdfLoaded(true)} // Set pdfLoaded state on load
      />
    </div>
  );
};

PdfViewer.propTypes = {
  pdfUrl: PropTypes.string.isRequired,
};

export default PdfViewer;
