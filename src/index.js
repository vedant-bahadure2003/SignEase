import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import EducationalSector from "./EducationalSector";
import UnderConstruction from "./UnderConstruction";
import Layout from "./components/Layout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Layout component wraps all routes with Navbar and Footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="learn" element={<EducationalSector />} />
          <Route path="hehe" element={<UnderConstruction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
