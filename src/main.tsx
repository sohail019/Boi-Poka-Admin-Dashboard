import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { Provider } from "react-redux";
import "./index.css";
import App from "./App";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <App />
  </StrictMode>
);
