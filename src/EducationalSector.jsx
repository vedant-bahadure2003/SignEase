import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "./sign-images.jpg";
import { Link } from "react-router-dom";
import "./EducationalSector.css";

const EducationalSector = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      <div
        className="absolute inset-0 bgbgbg"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      ></div>

      <button
        onClick={handleBack}
        className="absolute top-4 left-4 flex items-center bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out"
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

      <div className="flex flex-col justify-center items-center bg-gray-100 shadow-lg rounded-lg overflow-hidden max-w-xl w-full m-10 relative z-10">
        <img
          src={Image}
          className="h-[420px] w-full object-cover"
          alt="Educational Sector"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Educational Sector
          </h2>
          <p className="text-gray-600 mb-4">
            This is a brief description of the educational sector and its
            importance in fostering growth and knowledge.
          </p>
          <Link to={"/hehe"}>
            <button className="mt-4 bg-purple-400 border border-black text-black py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-300">
              Practice Mode
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EducationalSector;
