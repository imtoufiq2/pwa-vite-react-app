import { createRoot } from "react-dom/client";

import App from "./App.jsx";

import "./index.css";
import Contexts from "./context/Contexts.jsx";

createRoot(document.getElementById("root")).render(
  <Contexts>
    <App />
  </Contexts>
);
