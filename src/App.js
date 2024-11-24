import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Image from "./background.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";

function App() {
  const videoRef = useRef(null);
  const [predictedLetters, setPredictedLetters] = useState([]);
  const [predictedWord, setPredictedWord] = useState("");
  const [lastPredictedLetter, setLastPredictedLetter] = useState("");
  const [processedImage, setProcessedImage] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [volume, setVolume] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  useEffect(() => {
    let stream;

    const startVideoStream = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;

        if (videoRef.current.paused) {
          await videoRef.current.play();
        }

        setIsStreaming(true);
      } catch (err) {
        console.error("Error starting video stream:", err);
      }
    };

    const stopVideoStream = () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
        setIsStreaming(false);
      }
    };

    const sendFrame = async () => {
      if (isStreaming) {
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

          const predictedLetter = response.data.predicted_label;

          if (predictedLetter === "Space") {
            setPredictedWord((prevWord) => prevWord + " ");
            setPredictedLetters([]);
            setLastPredictedLetter("");
          } else {
            if (predictedLetter !== lastPredictedLetter) {
              setPredictedLetters((prev) => [...prev, predictedLetter]);
              setPredictedWord((prevWord) => prevWord + predictedLetter);
            }
            setLastPredictedLetter(predictedLetter);
          }

          setProcessedImage(`data:image/jpeg;base64,${response.data.image}`);
        } catch (error) {
          console.error("Error fetching prediction: ", error);
        }
      }
    };

    if (isCameraOpen) {
      startVideoStream();
    }

    const interval = setInterval(sendFrame, 1000);

    return () => {
      clearInterval(interval);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isStreaming, isCameraOpen, lastPredictedLetter, predictedWord]);

  const handleDeleteLetter = () => {
    setPredictedWord((prevWord) => prevWord.slice(0, -1));
    setPredictedLetters((prev) => prev.slice(0, -1));
    setLastPredictedLetter("");
  };

  const mapPitch = (value) => {
    return (value + 10) / 10;
  };

  const speakWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.volume = volume;
    utterance.pitch = mapPitch(pitch);
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  };

  const handleSpeakAloud = () => {
    if (predictedWord) {
      speakWord(predictedWord);
    }
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const handlePitchChange = (event) => {
    setPitch(event.target.value);
  };

  const handleRateChange = (event) => {
    setRate(event.target.value);
  };

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
    const videoElement = videoRef.current;
    videoElement.classList.add("hidden");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 via-emerald-50 to-purple-300">
      <nav className="bg-purple-900 border-b border-gray-600 p-4 shadow-2xl">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-3xl font-mono font-bold">SignEase</h1>
          <Link to={"/edu"}>
            <h2 className="text-white text-lg font-semibold hover:text-black flex items-center space-x-2">
              <FontAwesomeIcon icon={faBook} className="text-white" />
              <span>Educational Section</span>
            </h2>
          </Link>
        </div>
      </nav>

      <div
        className="container mx-auto mt-10 p-8 bg-white shadow-xl rounded-2xl bg-cover bg-center"
        style={{
          backgroundImage: `url(${Image})`,
        }}
      >
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3 space-y-6 h-[450px] bg-gray-100 p-4  rounded-lg bg-opacity-30 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-gray-800">
              Instructions
            </h2>
            <p className="text-gray-600">
              1. <b>Webcam Setup:</b> Place webcam at eye level, center hands.
            </p>
            <p className="text-gray-600">
              2. <b>Hand Positioning:</b> Keep hands visible, clear movements.
            </p>
            <p className="text-gray-600">
              3. <b>Lighting:</b> Use bright, even light. Avoid shadows or
              backlighting.
            </p>
            <p className="text-gray-600">
              4. <b>Background:</b> Plain, contrasting background.
            </p>
            <p className="text-gray-600">
              5. <b>Avoid Obstructions:</b> Clear hands from objects or jewelry.
            </p>
          </div>

          <div className="col-span-6 flex flex-col items-center">
            {!isCameraOpen ? (
              <button
                onClick={handleOpenCamera}
                className="bg-purple-700 text-white font-semibold py-3 px-8 rounded-full hover:bg-purple-800 transition duration-300 ease-in-out mb-6 shadow-lg transform hover:scale-105 flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faCamera} className="text-white" />
                <span>Tap to Open Camera</span>
              </button>
            ) : (
              <button
                onClick={handleCloseCamera}
                className="bg-red-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-red-600 transition duration-300 ease-in-out mb-6 shadow-lg transform hover:scale-105 flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faCamera} className="text-white" />
                <span>Tap to close Camera</span>
              </button>
            )}

            <div className="relative border-4 border-gray-700 rounded-2xl mb-4">
              <video
                ref={videoRef}
                width="360"
                height="270"
                autoPlay
                className={`rounded-lg border-4 border-gray-300 ${
                  !isCameraOpen ? "hidden" : ""
                } w-full h-auto md:w-72 md:h-56`}
                style={{ transform: "scaleX(-1)" }}
              />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                Predicted Word:{" "}
                <span className="text-purple-600">{predictedWord}</span>
              </h2>
              <h3 className="text-lg text-gray-600">
                Predicted Letters:{" "}
                <span className="font-mono">{predictedLetters.join("")}</span>
              </h3>
            </div>

            <div className="flex justify-center space-x-5 mt-4">
              <button
                onClick={handleDeleteLetter}
                className="bg-gray-200 border-2 border-purple-900 text-black py-2 px-6 rounded-lg hover:bg-white transition ease-in-out duration-300 flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faTrash} className="text-purple-900" />
                <span>Delete Last Letter</span>
              </button>
              <button
                onClick={handleSpeakAloud}
                className="bg-purple-800 border-2 border-white text-white py-2 px-6 rounded-lg hover:bg-purple-900 transition ease-in-out duration-300 flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faVolumeUp} className="text-white" />
                <span>Speak Aloud</span>
              </button>
            </div>
          </div>

          <div className="col-span-3 flex flex-col items-center space-y-8 p-6 h-[450px] bg-gray-100 shadow-xl rounded-xl bg-opacity-30 backdrop-blur-sm">
            <div className="w-64">
              <label
                htmlFor="volume"
                className="block mb-2 text-lg font-semibold text-gray-700 flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faVolumeUp} className="text-gray-700" />
                <span>Volume</span>
              </label>
              <input
                type="range"
                id="volume"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-2 border border-gray-400 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 hover:accent-purple-700"
              />
              <div className="text-center mt-2 text-sm font-medium text-purple-600">
                {volume}
              </div>
            </div>

            <div className="w-64">
              <label
                htmlFor="pitch"
                className="block mb-2 text-lg font-semibold text-gray-700 flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faMusic} className="text-gray-700" />
                <span>Pitch</span>
              </label>
              <input
                type="range"
                id="pitch"
                min="-10"
                max="10"
                step="0.1"
                value={pitch}
                onChange={handlePitchChange}
                className="w-full h-2 border border-gray-400 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 hover:accent-purple-700"
              />
              <div className="text-center mt-2 text-sm font-medium text-purple-600">
                {pitch}
              </div>
            </div>

            <div className="w-64">
              <label
                htmlFor="rate"
                className="block mb-2 text-lg font-semibold text-gray-700 flex items-center space-x-2"
              >
                <FontAwesomeIcon
                  icon={faTachometerAlt}
                  className="text-gray-700"
                />
                <span>Speed</span>
              </label>
              <input
                type="range"
                id="rate"
                min="0.1"
                max="3"
                step="0.1"
                value={rate}
                onChange={handleRateChange}
                className="w-full h-2 border border-gray-400 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 hover:accent-purple-700"
              />
              <div className="text-center mt-2 text-sm font-medium text-purple-600">
                {rate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
