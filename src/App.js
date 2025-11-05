import React, { useCallback, useEffect } from "react";
import "./App.css";

// Components
import Instructions from "./components/Instructions";
import CameraSection from "./components/CameraSection";
import ControlPanel from "./components/ControlPanel";

// Hooks
import { useCamera } from "./hooks/useCamera";
import { useSpeechSynthesis } from "./hooks/useSpeechSynthesis";
import { useSignLanguagePrediction } from "./hooks/useSignLanguagePrediction";

// Utils
import { checkBrowserSupport, logError } from "./utils/helpers";

function App() {
  // Check browser support on mount
  useEffect(() => {
    const support = checkBrowserSupport();

    if (!support.getUserMedia) {
      logError("App", new Error("getUserMedia not supported"), { support });
    }

    if (!support.speechSynthesis) {
      logError("App", new Error("Speech Synthesis not supported"), { support });
    }

    if (!support.canvas) {
      logError("App", new Error("Canvas not supported"), { support });
    }
  }, []);

  // Custom hooks
  const { videoRef, isStreaming, isCameraOpen, openCamera, closeCamera } =
    useCamera();
  const {
    volume,
    pitch,
    rate,
    speakWord,
    handleVolumeChange,
    handlePitchChange,
    handleRateChange,
  } = useSpeechSynthesis();

  const {
    predictedLetters,
    predictedWord,
    originalLetters,
    selectedLanguage,
    handleDeleteLetter,
    handleLanguageChange,
  } = useSignLanguagePrediction(videoRef, isStreaming);

  // Handlers
  const handleSpeakAloud = useCallback(() => {
    if (predictedWord) {
      speakWord(predictedWord);
    }
  }, [predictedWord, speakWord]);

  return (
    <div className="App">
      <div className="main-container">
        <div className="grid-container">
          <div className="instructions-section">
            <Instructions />
          </div>

          <div className="main-content-row">
            <div className="camera-section">
              <CameraSection
                isCameraOpen={isCameraOpen}
                onOpenCamera={openCamera}
                onCloseCamera={closeCamera}
                videoRef={videoRef}
                predictedWord={predictedWord}
                predictedLetters={predictedLetters}
                selectedLanguage={selectedLanguage}
                originalLetters={originalLetters}
                onDeleteLetter={handleDeleteLetter}
                onSpeakAloud={handleSpeakAloud}
              />
            </div>

            <div className="control-panel">
              <ControlPanel
                volume={volume}
                pitch={pitch}
                rate={rate}
                selectedLanguage={selectedLanguage}
                onVolumeChange={handleVolumeChange}
                onPitchChange={handlePitchChange}
                onRateChange={handleRateChange}
                onLanguageChange={handleLanguageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
