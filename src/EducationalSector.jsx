import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "./sign-images.jpg";
import { Link } from "react-router-dom";

const EducationalSector = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-400">
      {/* Back Button in the Leftmost Corner */}
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

      <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg overflow-hidden max-w-xl h-[650px] w-full m-10">
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
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EducationalSector;
