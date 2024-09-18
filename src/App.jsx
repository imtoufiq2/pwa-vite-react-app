import { useEffect, useState } from "react";
import "./App.css";
import ToasterContext from "./helpers/context/ToasterContext";
import Routers from "./routers";
import ThemeCustomization from "./themes";
import toast from "react-hot-toast";

function App() {
  const [isAndroid, setIsAndroid] = useState(false);

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
