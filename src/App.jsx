import { useEffect, useState } from "react";
import "./App.css";
import ToasterContext from "./helpers/context/ToasterContext";
import Routers from "./routers";
import ThemeCustomization from "./themes";
import toast from "react-hot-toast";

export const baseUrl = "https://myzonehr.motilaloswal.com/boardmeetingapi";
// export const baseUrl = "https://myzonebeta.motilaloswal.com/BoardMeetingApi";
export const whiteColor = "#fff";
function App() {
  const [isAndroid, setIsAndroid] = useState(false);
  // Disable Print Screen (PrtSc)
  // useEffect(() => {
  //   const handlePrintScreen = (event) => {
  //     const isPrintScreen = event.key === "PrintScreen";
  //     const isWindowsShiftS =
  //       event.code === "KeyS" &&
  //       event.shiftKey &&
  //       (event.ctrlKey || event.metaKey);

  //     // if (event.key === "PrintScreen") {
  //     if (isPrintScreen || isWindowsShiftS) {
  //       event.preventDefault();
  //       // document.getElementById("root").innerHTML =
  //       //   "Screenshots are disabled on this application."; // Empty the #root element

  //       // toast.error("Screenshots are disabled, and the content is hidden.");
  //       // Get the root element
  //       const rootElement = document.getElementById("root");

  //       // Clear the content of the root element
  //       rootElement.innerHTML = "";

  //       // Create a container div to hold the message and button
  //       const container = document.createElement("div");
  //       container.style.display = "flex";
  //       container.style.flexDirection = "column";
  //       container.style.justifyContent = "center";
  //       container.style.alignItems = "center";
  //       container.style.position = "fixed";
  //       container.style.top = "50%";
  //       container.style.left = "50%";
  //       container.style.transform = "translate(-50%, -50%)";
  //       container.style.backgroundColor = "#f8f9fa";
  //       container.style.padding = "20px";
  //       container.style.borderRadius = "8px";
  //       container.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  //       container.style.textAlign = "center";

  //       // Create a message element
  //       const message = document.createElement("p");
  //       message.textContent = "Screenshots are disabled on this application.";
  //       message.style.marginBottom = "20px";
  //       message.style.fontSize = "18px";
  //       message.style.color = "#333";

  //       // Create a button element
  //       const refreshButton = document.createElement("button");
  //       refreshButton.textContent = "Refresh Page";
  //       refreshButton.style.padding = "10px 20px";
  //       refreshButton.style.fontSize = "16px";
  //       refreshButton.style.backgroundColor = "#ff7b00";
  //       refreshButton.style.color = "#fff";
  //       refreshButton.style.border = "none";
  //       refreshButton.style.borderRadius = "4px";
  //       refreshButton.style.cursor = "pointer";
  //       refreshButton.style.outline = "none";

  //       refreshButton.onmouseover = function () {
  //         refreshButton.style.backgroundColor = "#ff7b00";
  //       };
  //       refreshButton.onmouseout = function () {
  //         refreshButton.style.backgroundColor = "#ff7b00";
  //       };

  //       // Add an onClick event to the button to refresh the page
  //       refreshButton.addEventListener("click", () => {
  //         window.location.reload(); // Refresh the page
  //       });

  //       // Append the message and button to the container
  //       container.appendChild(message);
  //       container.appendChild(refreshButton);

  //       // Append the container to the root element
  //       rootElement.appendChild(container);

  //       // Show the toast notification
  //       toast.error("Screenshots are disabled, and the content is hidden.");
  //     }
  //   };

  //   window.addEventListener("keyup", handlePrintScreen);

  //   return () => {
  //     window.removeEventListener("keyup", handlePrintScreen);
  //   };
  // }, []);
  useEffect(() => {
    const handleKeyEvents = (event) => {
      const isPrintScreen = event.key === "PrintScreen";
      const isWindowsShiftS =
        event.code === "KeyS" &&
        event.shiftKey &&
        (event.ctrlKey || event.metaKey);
      // const isMeta = event.metaKey || event.key === "Meta";
      // Check if Meta (Command/Windows) and Shift are both pressed
      const isMetaWithShift =
        (event.metaKey || event.key === "Meta") && event.shiftKey;

      if (isPrintScreen || isWindowsShiftS || isMetaWithShift) {
        event.preventDefault();

        // Get the root element
        const rootElement = document.getElementById("root");

        // Clear the content of the root element
        rootElement.innerHTML = "";

        // Create a container div to hold the message and button
        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.justifyContent = "center";
        container.style.alignItems = "center";
        container.style.position = "fixed";
        container.style.top = "50%";
        container.style.left = "50%";
        container.style.transform = "translate(-50%, -50%)";
        container.style.backgroundColor = "#f8f9fa";
        container.style.padding = "20px";
        container.style.borderRadius = "8px";
        container.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        container.style.textAlign = "center";

        // Create a message element
        const message = document.createElement("p");
        message.textContent = "Screenshots are disabled on this application.";
        message.style.marginBottom = "20px";
        message.style.fontSize = "18px";
        message.style.color = "#333";

        // Create a button element
        const refreshButton = document.createElement("button");
        refreshButton.textContent = "Refresh Page";
        refreshButton.style.padding = "10px 20px";
        refreshButton.style.fontSize = "16px";
        refreshButton.style.backgroundColor = "#ff7b00";
        refreshButton.style.color = "#fff";
        refreshButton.style.border = "none";
        refreshButton.style.borderRadius = "4px";
        refreshButton.style.cursor = "pointer";
        refreshButton.style.outline = "none";

        refreshButton.onmouseover = function () {
          refreshButton.style.backgroundColor = "#ff7b00";
        };
        refreshButton.onmouseout = function () {
          refreshButton.style.backgroundColor = "#ff7b00";
        };

        // Add an onClick event to the button to refresh the page
        refreshButton.addEventListener("click", () => {
          window.location.reload(); // Refresh the page
        });

        // Append the message and button to the container
        container.appendChild(message);
        container.appendChild(refreshButton);

        // Append the container to the root element
        rootElement.appendChild(container);

        // Show the toast notification
        toast.error("Screenshots are disabled, and the content is hidden.");
      }
    };

    // Add event listeners for both keydown and keyup
    window.addEventListener("keydown", handleKeyEvents);
    window.addEventListener("keyup", handleKeyEvents);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyEvents);
      window.removeEventListener("keyup", handleKeyEvents);
    };
  }, []);

  //this is to handle the print
  useEffect(() => {
    const handlePrint = (event) => {
      if (event.ctrlKey && event.key === "p") {
        event.preventDefault();
        toast.error("Printing is disabled on this application.");
      }
    };

    const handleBeforePrint = () => {
      toast.error("Printing is disabled on this application.");
    };

    // Add event listeners
    window.addEventListener("keydown", handlePrint);
    window.addEventListener("beforeprint", handleBeforePrint);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("keydown", handlePrint);
      window.removeEventListener("beforeprint", handleBeforePrint);
    };
  }, []);

  //this is to block on the android
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      setIsAndroid(true);
    }
  }, []);

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
      toast.error("Right-click is disabled on this application.");
    };

    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  if (isAndroid) {
    return (
      <div>Sorry, this application is not supported on Android devices.</div>
    );
  }

  return (
    <ThemeCustomization>
      <ToasterContext />
      <Routers />
    </ThemeCustomization>
  );
}

export default App;
