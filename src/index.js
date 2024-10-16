import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";
import EducationalSector from "./EducationalSector";
import UnderConstruction from "./UnderConstruction";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/edu" element={<EducationalSector />}></Route>
        <Route path="/hehe" element={<UnderConstruction />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
