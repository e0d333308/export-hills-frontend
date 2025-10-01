
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { HelmetProvider } from "react-v19-helmet-async";
import ScrollToTop from "./components/scrollToTop";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    {/* <React.StrictMode> */}
      <BrowserRouter>
      <ScrollToTop/>
        <App />
      </BrowserRouter>
    {/* </React.StrictMode> */}
  </HelmetProvider>
);
