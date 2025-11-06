import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { useErrorHandler } from "./hooks/useErrorHandler";

function EducationalApp() {
  const videoRef = useRef(null);
  const [predictedWord, setPredictedWord] = useState("");
  const [expectedLetters] = useState(
    [...Array(26)].map((_, i) => String.fromCharCode(65 + i))
  );
  const [selectedLetter, setSelectedLetter] = useState(expectedLetters[0]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [isHandDetected, setIsHandDetected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isComponentLoaded, setIsComponentLoaded] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [cameraError, setCameraError] = useState(null);
  const navigate = useNavigate();
  const { error, handleAsync, clearError } = useErrorHandler();

  useEffect(() => {
    setIsComponentLoaded(true);
  }, []);

  const startCameraStream = useCallback(async () => {
    return handleAsync(async () => {
      setIsLoading(true);
      setCameraError(null);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setCameraError("Unable to access camera. Please check permissions.");
        throw err;
      } finally {
        setIsLoading(false);
      }
    });
  }, [handleAsync]);

  // Use refs to store latest values without causing re-renders
  const latestValuesRef = useRef({
    selectedLetter,
    isHandDetected,
    isCameraOpen,
  });

  // Update refs when values change
  useEffect(() => {
    latestValuesRef.current = {
      selectedLetter,
      isHandDetected,
      isCameraOpen,
    };
  }, [selectedLetter, isHandDetected, isCameraOpen]);

  const sendFrame = useCallback(async () => {
    if (latestValuesRef.current.isCameraOpen && videoRef.current) {
      return handleAsync(async () => {
        const canvas = document.createElement("canvas");
        canvas.width = 640;
        canvas.height = 480;
        const context = canvas.getContext("2d");
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/jpeg");

        try {
          const response = await axios.post(
            " https://signease-backend-1.onrender.com/predict",
            {
              image: imageData.split(",")[1],
            },
            {
              timeout: 5000, // 5 second timeout
            }
          );
          const predictedLabel = response.data.predicted_label;
          setPredictedWord(predictedLabel);

          const {
            selectedLetter: currentSelected,
            isHandDetected: currentHandDetected,
          } = latestValuesRef.current;

          if (predictedLabel.toLowerCase() === currentSelected.toLowerCase()) {
            setIsCorrect(true);
            setFeedbackVisible(true);
            setScore((prev) => prev + 10);
            setStreak((prev) => prev + 1);
          } else if (currentHandDetected) {
            setIsCorrect(false);
            setFeedbackVisible(true);
            setStreak(0);
          } else {
            setFeedbackVisible(false);
          }
        } catch (error) {
          if (error.code === "ECONNABORTED") {
            console.warn("Request timeout - server may be slow");
          } else {
            console.error("Error fetching prediction: ", error);
          }
        }
      });
    }
  }, [handleAsync]);

  const detectHand = useCallback(() => {
    const handDetected = Math.random() < 0.5;
    setIsHandDetected(handDetected);
  }, []);

  useEffect(() => {
    let interval;

    if (isCameraOpen) {
      startCameraStream();
      interval = setInterval(() => {
        sendFrame().catch(() => {
          // Handle errors silently for frame processing
        });
        detectHand();
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isCameraOpen, sendFrame, detectHand, startCameraStream]);

  const handleOpenCamera = useCallback(() => {
    clearError();
    setIsCameraOpen(true);
  }, [clearError]);

  const handleCloseCamera = useCallback(() => {
    setIsCameraOpen(false);
    setFeedbackVisible(false);
    setCameraError(null);
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
  }, []);

  const handleLetterChange = useCallback((letter) => {
    setSelectedLetter(letter);
    setFeedbackVisible(false);
    setIsCorrect(null);
  }, []);

  const retryCamera = useCallback(() => {
    setCameraError(null);
    clearError();
    setIsCameraOpen(true);
  }, [clearError]);

  // Memoize the feedback logic to prevent unnecessary re-renders
  const feedbackLogic = useMemo(() => {
    if (predictedWord) {
      if (
        predictedWord.toLowerCase() === selectedLetter.toLowerCase() &&
        isHandDetected
      ) {
        return { isCorrect: true, feedbackVisible: true };
      } else if (isHandDetected) {
        return { isCorrect: false, feedbackVisible: true };
      } else {
        return { isCorrect: null, feedbackVisible: false };
      }
    }
    return { isCorrect: null, feedbackVisible: false };
  }, [predictedWord, selectedLetter, isHandDetected]);

  useEffect(() => {
    setIsCorrect(feedbackLogic.isCorrect);
    setFeedbackVisible(feedbackLogic.feedbackVisible);
  }, [feedbackLogic]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-700 to-purple-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-violet-400/5 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-10">
        {/* Header Section */}
        <div
          className={`text-center mb-4 transform transition-all duration-1000 ${
            isComponentLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-8"
          }`}
        >
          <h1 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent mb-2 drop-shadow-2xl">
            Practice Mode
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto">
            Master sign language with real-time AI feedback
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className={`absolute top-4 left-4 flex items-center bg-white/10 backdrop-blur-md border border-white/20 text-white py-2 px-4 rounded-full hover:scale-105 hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl text-sm ${
            isComponentLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          <svg
            className="w-4 h-4 mr-1"
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

        {/* Stats Section */}
        <div
          className={`flex justify-center space-x-4 mb-4 transform transition-all duration-1000 ${
            isComponentLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 px-4 py-2 rounded-xl shadow-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-white">{score}</div>
              <div className="text-xs text-white/70">Score</div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 px-4 py-2 rounded-xl shadow-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-white">{streak}</div>
              <div className="text-xs text-white/70">Streak</div>
            </div>
          </div>
        </div>

        {/* Main Content Container */}
        <div
          className={`bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-4 max-w-3xl w-full transform transition-all duration-1000 shadow-2xl hover:shadow-purple-500/25 hover:-translate-y-1 hover:scale-[1.01] ${
            isComponentLoaded
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
          style={{ transitionDelay: "0.6s" }}
        >
          {/* Camera Controls */}
          <div className="text-center mb-4">
            {!isCameraOpen ? (
              <button
                onClick={handleOpenCamera}
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 active:scale-95 disabled:opacity-50 relative overflow-hidden"
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{isLoading ? "Initializing..." : "Open Camera"}</span>
                </span>
              </button>
            ) : (
              <button
                onClick={handleCloseCamera}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 px-6 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-500/50 active:scale-95"
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Close Camera</span>
                </span>
              </button>
            )}
          </div>

          {/* Camera Feed */}
          {isCameraOpen && (
            <div className="mb-4 flex justify-center">
              {cameraError || error ? (
                <div className="bg-white/10 backdrop-blur-2xl border-2 border-red-400/50 rounded-xl p-4 text-center shadow-lg">
                  <div className="text-red-400 mb-3">
                    <svg
                      className="w-12 h-12 mx-auto mb-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="text-base font-semibold">Camera Error</div>
                    <div className="text-sm text-red-300">
                      {cameraError || error}
                    </div>
                  </div>
                  <button
                    onClick={retryCamera}
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-2 px-4 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 text-sm"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <div className="relative border-2 border-purple-400/30 bg-gradient-to-r from-purple-400/10 to-indigo-400/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-purple-500/50 transition-all duration-300">
                  <video
                    ref={videoRef}
                    className="w-full max-w-lg rounded-2xl"
                    autoPlay
                    style={{ transform: "scaleX(-1)" }}
                  />
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="flex items-center space-x-2 text-white">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                        <span className="text-lg shimmer">
                          Loading camera...
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Prediction Display */}
          <div className="text-center mb-4">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl p-4 inline-block shadow-lg">
              <h3 className="text-sm text-white/80 mb-1">Predicted Letter</h3>
              <div className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
                {predictedWord || "—"}
              </div>
            </div>
          </div>

          {/* Letter Selection */}
          <div className="mb-4">
            <label className="block text-base text-white/90 mb-3 text-center font-semibold">
              Target Letter
            </label>
            <div className="grid grid-cols-7 md:grid-cols-13 gap-1 max-w-3xl mx-auto">
              {expectedLetters.map((letter) => (
                <button
                  key={letter}
                  onClick={() => handleLetterChange(letter)}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 text-sm ${
                    selectedLetter === letter
                      ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg hover:shadow-purple-500/50"
                      : "bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-white/20"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Section */}
          {feedbackVisible && (
            <div
              className={`text-center transform transition-all duration-500 ${
                feedbackVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              {isCorrect ? (
                <div className="bg-white/10 backdrop-blur-2xl border-2 border-green-400/50 rounded-xl p-4 shadow-lg">
                  <div className="flex items-center justify-center space-x-3 text-green-400">
                    <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center animate-pulse">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">Perfect!</div>
                      <div className="text-sm">+10 points</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-2xl border-2 border-red-400/50 rounded-xl p-4 shadow-lg">
                  <div className="flex items-center justify-center space-x-3 text-red-400">
                    <div className="w-12 h-12 bg-red-400/20 rounded-full flex items-center justify-center animate-pulse">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">Try Again!</div>
                      <div className="text-sm">Keep practicing</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EducationalApp;
