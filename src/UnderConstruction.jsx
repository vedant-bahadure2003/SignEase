import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";

function EducationalApp() {
  const videoRef = useRef(null);
  const [predictedWord, setPredictedWord] = useState("");
  const [expectedLetters, setExpectedLetters] = useState(
    [...Array(26)].map((_, i) => String.fromCharCode(65 + i))
  ); // Letters A-Z
  const [selectedLetter, setSelectedLetter] = useState(expectedLetters[0]); // Default to first letter A
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null); // Feedback state (correct or incorrect)
  const [feedbackVisible, setFeedbackVisible] = useState(false); // Toggle feedback visibility
  const [isHandDetected, setIsHandDetected] = useState(false); // Hand detection state

  // Function to start camera stream
  const startCameraStream = async () => {
    try {
      console.log("Attempting to access camera...");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      console.log("Camera stream started successfully.");
    } catch (err) {
      console.error("Error accessing camera: ", err);
    }
  };

  // Function to send frame to prediction API
  const sendFrame = async () => {
    if (isCameraOpen) {
      console.log("Sending frame for prediction...");
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
        const predictedLabel = response.data.predicted_label; // Get predicted letter
        console.log("Received prediction: ", predictedLabel);

        setPredictedWord(predictedLabel); // Set the predicted word/letter

        // Check if prediction matches selected letter
        if (predictedLabel.toLowerCase() === selectedLetter.toLowerCase()) {
          setIsCorrect(true);
          setFeedbackVisible(true);
          console.log(
            `Prediction is correct! Predicted: ${predictedLabel}, Selected: ${selectedLetter}`
          );
        } else {
          // Only show feedback if hand is detected
          if (isHandDetected) {
            setIsCorrect(false);
            setFeedbackVisible(true);
            console.log(
              `Prediction is incorrect. Predicted: ${predictedLabel}, Selected: ${selectedLetter}`
            );
          } else {
            setFeedbackVisible(false); // Hide feedback if no hand detected
          }
        }
      } catch (error) {
        console.error("Error fetching prediction: ", error);
      }
    }
  };

  // Function to detect hand (this is a placeholder)
  const detectHand = () => {
    const handDetected = Math.random() < 0.5; // Simulate a 50% chance of hand being detected
    setIsHandDetected(handDetected);
    console.log("Hand detected: ", handDetected);
  };

  useEffect(() => {
    if (isCameraOpen) {
      console.log("Camera is open, starting stream...");
      startCameraStream(); // Start camera stream
      const interval = setInterval(() => {
        sendFrame();
        detectHand(); // Check for hand detection every interval
      }, 1000); // Send frame every second
      return () => {
        clearInterval(interval); // Cleanup interval
        console.log("Camera stream stopped.");
      };
    }
  }, [isCameraOpen]);

  const handleOpenCamera = () => {
    console.log("Opening camera...");
    setIsCameraOpen(true);
  };

  const handleCloseCamera = () => {
    console.log("Closing camera...");
    setIsCameraOpen(false);
    setFeedbackVisible(false); // Hide feedback when camera closes
  };

  // Check prediction and feedback based on selected letter change
  useEffect(() => {
    if (predictedWord) {
      console.log("Checking prediction for selected letter change...");
      if (predictedWord.toLowerCase() === selectedLetter.toLowerCase()) {
        setIsCorrect(true);
        setFeedbackVisible(true);
        console.log(
          `Updated Prediction is correct! Predicted: ${predictedWord}, Selected: ${selectedLetter}`
        );
      } else {
        // Only show feedback if hand is detected
        if (isHandDetected) {
          setIsCorrect(false);
          setFeedbackVisible(true);
          console.log(
            `Updated Prediction is incorrect. Predicted: ${predictedWord}, Selected: ${selectedLetter}`
          );
        } else {
          setFeedbackVisible(false); // Hide feedback if no hand detected
        }
      }
    }
  }, [predictedWord, selectedLetter, isHandDetected]); // Trigger this effect when either changes

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6 text-center">
        Educational Prediction Feedback
      </h1>

      {/* Conditional Camera Button */}
      <div className="mb-6 flex justify-center">
        {!isCameraOpen ? (
          <button
            onClick={handleOpenCamera}
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
          >
            Open Camera
          </button>
        ) : (
          <button
            onClick={handleCloseCamera}
            className="bg-red-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-red-700 transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
          >
            Close Camera
          </button>
        )}
      </div>

      {/* Video Stream Placeholder */}
      {isCameraOpen && (
        <div className="mb-4 flex justify-center border-4 border-gray-700 rounded-lg shadow-lg overflow-hidden">
          <video
            ref={videoRef}
            width="640"
            height="480"
            autoPlay
            className="rounded-lg border-4 border-gray-300 shadow-inner"
            style={{ transform: "scaleX(-1)" }}
          />
        </div>
      )}

      {/* Display Predicted Word */}
      <div className="text-center mb-4">
        <h2 className="text-3xl font-semibold text-gray-800">
          Predicted Letter:{" "}
          <span className="text-purple-600">{predictedWord}</span>
        </h2>
      </div>

      {/* Letter Selection Dropdown */}
      <div className="mb-4">
        <label className="text-lg text-gray-700 mr-2">Select Letter:</label>
        <select
          value={selectedLetter}
          onChange={(e) => {
            setSelectedLetter(e.target.value);
            console.log("Selected letter changed to: ", e.target.value); // Debugging line
          }}
          className="border-2 border-gray-400 rounded-lg p-2 text-lg w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {expectedLetters.map((letter) => (
            <option key={letter} value={letter}>
              {letter}
            </option>
          ))}
        </select>
      </div>

      {/* Feedback: Correct or Incorrect */}
      {feedbackVisible && (
        <div className="mt-4 text-center">
          {isCorrect ? (
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <span className="text-3xl">✅</span>
              <span className="text-2xl font-bold">Correct!</span>
            </div>
          ) : (
            // Show incorrect feedback only if hand is detected
            isHandDetected && (
              <div className="flex items-center justify-center space-x-2 text-red-600">
                <span className="text-3xl">❌</span>
                <span className="text-2xl font-bold">
                  Incorrect. Try again!
                </span>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default EducationalApp;
