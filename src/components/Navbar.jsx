import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faHandPaper,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className=" bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 backdrop-blur-lg border-b border-purple-500/30 shadow-2xl sticky top-0 z-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl animate-bounce"></div>
      </div>

      <div className="relative container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-purple-400/50 transition-all duration-300 group-hover:scale-110">
                <FontAwesomeIcon
                  icon={faHandPaper}
                  className="text-white text-lg animate-pulse"
                />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-lg blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
            </div>
            <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent hover:from-purple-200 hover:to-white transition-all duration-300">
              SignEase
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/">
              <div className="group relative px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300">
                <span className="text-white font-medium hover:text-purple-200 transition-colors flex items-center space-x-2">
                  <span>Home</span>
                </span>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
              </div>
            </Link>

            <Link to="/learn">
              <div className="group relative px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300">
                <span className="text-white font-medium hover:text-purple-200 transition-colors flex items-center space-x-2">
                  <FontAwesomeIcon
                    icon={faGraduationCap}
                    className="text-purple-300 group-hover:text-white transition-colors duration-300"
                  />
                  <span>Learn</span>
                </span>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative p-2 text-white hover:bg-white/10 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <FontAwesomeIcon
                icon={isMenuOpen ? faTimes : faBars}
                className={`text-xl transition-transform duration-300 ${
                  isMenuOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-4 pb-4">
            <Link to="/" onClick={toggleMenu}>
              <div className="group flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 rounded-lg flex items-center justify-center group-hover:from-purple-400/40 group-hover:to-indigo-400/40 transition-all duration-300">
                  <FontAwesomeIcon
                    icon={faHandPaper}
                    className="text-purple-300 text-sm"
                  />
                </div>
                <span className="text-white font-medium group-hover:text-purple-200 transition-colors">
                  Home
                </span>
              </div>
            </Link>

            <Link to="/learn" onClick={toggleMenu}>
              <div className="group flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 rounded-lg flex items-center justify-center group-hover:from-purple-400/40 group-hover:to-indigo-400/40 transition-all duration-300">
                  <FontAwesomeIcon
                    icon={faGraduationCap}
                    className="text-purple-300 text-sm"
                  />
                </div>
                <span className="text-white font-medium group-hover:text-purple-200 transition-colors">
                  Educational Section
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
