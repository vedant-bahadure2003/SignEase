import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./EducationalSector.css";

const EducationalSector = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-700 to-purple-800 animated-bg">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-violet-400/5 rounded-full blur-2xl"></div>
      </div>

      {/* Modern glassmorphism back button */}
      <button
        onClick={handleBack}
        className={`absolute top-6 left-6 z-20 flex items-center bg-white/10 backdrop-blur-md border border-white/20 text-white py-3 px-6 rounded-full hover:scale-105 hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
        style={{ transitionDelay: "0.2s" }}
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        Back
      </button>

      {/* Main content container */}
      <div className="relative  z-10 flex flex-col items-center justify-center min-h-screen p-6 ">
        <div
          className={`bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl overflow-hidden max-w-lg w-full  transform transition-all duration-1000 shadow-2xl hover:shadow-purple-500/25 hover:-translate-y-1 hover:scale-[1.01] ${
            isLoaded
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          {/* Image section with gradient overlay */}
          <div className="relative overflow-hidden">
            <img
              src="/sign-images.jpg"
              className="h-60 w-full object-cover transition-transform duration-700 hover:scale-110"
              alt="Educational Sector"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-4 text-white">
              <h3 className="text-base font-semibold opacity-90">
                Learn & Practice
              </h3>
              <p className="text-xs opacity-75">
                Interactive sign language learning
              </p>
            </div>
          </div>

          {/* Content section */}
          <div className="p-6 relative">
            <div className="mb-5">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent mb-3 drop-shadow-2xl">
                Educational Sector
              </h2>
              <p className="text-white/90 text-sm leading-relaxed mb-4">
                Enhance your sign language skills through our interactive
                educational platform. Practice with real-time recognition and
                get instant feedback to improve your communication abilities.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              <div className="flex items-center space-x-2 p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-lg flex items-center justify-center shadow-lg">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">
                    Real-time Recognition
                  </h4>
                  <p className="text-white/70 text-xs">
                    Instant feedback on your signs
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-lg flex items-center justify-center shadow-lg">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">
                    Progressive Learning
                  </h4>
                  <p className="text-white/70 text-xs">Structured curriculum</p>
                </div>
              </div>
            </div>

            {/* Call to action button */}
            <Link to="/hehe">
              <button className="btn-futuristic w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 active:scale-95">
                <span className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base">Start Practice Mode</span>
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalSector;
