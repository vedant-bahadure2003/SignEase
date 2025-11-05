import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ErrorBoundary from "./ErrorBoundary";

const Layout = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        {/* Navbar will be on all pages */}
        <Navbar />

        {/* Main content area - this will change based on the route */}
        <main className="flex-1">
          <Outlet />
        </main>

        {/* Footer will be on all pages */}
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
