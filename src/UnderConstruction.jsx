import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

function EducationalApp() {
  const videoRef = useRef(null);
  const [predictedWord, setPredictedWord] = useState("");
  const [expectedLetters, setExpectedLetters] = useState(
    [...Array(26)].map((_, i) => String.fromCharCode(65 + i))
  );
  const [selectedLetter, setSelectedLetter] = useState(expectedLetters[0]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [isHandDetected, setIsHandDetected] = useState(false);
  const navigate = useNavigate();

  const startCameraStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing camera: ", err);
    }
  };

  const sendFrame = async () => {
    if (isCameraOpen) {
      const canvas = document.createElement("canvas");
      canvas.width = 640;
      canvas.height = 480;
      const context = canvas.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg");

      try {
        const response = await axios.post("http://localhost:5000/predict", {
          image: imageData.split(",")[1],
        });
        const predictedLabel = response.data.predicted_label;
        setPredictedWord(predictedLabel);

        if (predictedLabel.toLowerCase() === selectedLetter.toLowerCase()) {
          setIsCorrect(true);
          setFeedbackVisible(true);
        } else if (isHandDetected) {
          setIsCorrect(false);
          setFeedbackVisible(true);
        } else {
          setFeedbackVisible(false);
        }
      } catch (error) {
        console.error("Error fetching prediction: ", error);
      }
    }
  };

  const detectHand = () => {
    const handDetected = Math.random() < 0.5; // Replace with actual hand detection logic if available
    setIsHandDetected(handDetected);
  };

  useEffect(() => {
    if (isCameraOpen) {
      startCameraStream();
      const interval = setInterval(() => {
        sendFrame();
        detectHand();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isCameraOpen]);

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
    setFeedbackVisible(false);
  };

  useEffect(() => {
    if (predictedWord) {
      if (
        predictedWord.toLowerCase() === selectedLetter.toLowerCase() &&
        isHandDetected
      ) {
        setIsCorrect(true);
        setFeedbackVisible(true);
      } else if (isHandDetected) {
        setIsCorrect(false);
        setFeedbackVisible(true);
      } else {
        setFeedbackVisible(false);
      }
    }
  }, [predictedWord, selectedLetter, isHandDetected]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-white flex flex-col items-center justify-center p-4 md:p-8 relative">
      <h1 className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-6 text-center">
        Educational Prediction Feedback
      </h1>

      
      <button
        onClick={() => navigate(-1)}
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

 
      <div className="mb-6">
        {!isCameraOpen ? (
          <button
            onClick={handleOpenCamera}
            className="bg-purple-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-purple-700 transition duration-300 ease-in-out shadow-md transform hover:scale-105"
          >
            Open Camera
          </button>
        ) : (
          <button
            onClick={handleCloseCamera}
            className="bg-red-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-red-700 transition duration-300 ease-in-out shadow-md transform hover:scale-105"
          >
            Close Camera
          </button>
        )}
      </div>

      
      {isCameraOpen && (
        <div className="mb-4  flex justify-center border-4 border-purple-300 rounded-lg shadow-lg overflow-hidden">
          <video
            ref={videoRef}
            className="w-full md:w-3/4 lg:w-1/2 rounded-lg"
            autoPlay
            style={{ transform: "scaleX(-1)" }}
          />
        </div>
      )}


      <div className="text-center mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Predicted Letter:{" "}
          <span className="text-purple-600 font-bold">{predictedWord}</span>
        </h2>
      </div>

     
      <div className="mb-4">
        <label className="text-lg text-gray-700 mr-2">Select Letter:</label>
        <select
          value={selectedLetter}
          onChange={(e) => setSelectedLetter(e.target.value)}
          className="border-2 border-purple-400 rounded-lg p-2 text-lg w-48 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {expectedLetters.map((letter) => (
            <option key={letter} value={letter}>
              {letter}
            </option>
          ))}
        </select>
      </div>

    
      {feedbackVisible && (
        <div className="mt-4 text-center">
          {isCorrect ? (
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <span className="text-3xl">✅</span>
              <span className="text-2xl font-bold">Correct!</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2 text-red-600">
              <span className="text-3xl">❌</span>
              <span className="text-2xl font-bold">Incorrect. Try again!</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EducationalApp;
