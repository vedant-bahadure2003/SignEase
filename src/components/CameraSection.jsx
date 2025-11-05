import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faTrash,
  faCameraRetro,
  faRobot,
  faMicrophone,
  faWaveSquare,
} from "@fortawesome/free-solid-svg-icons";
import { languageNames } from "../config/languages";

const CameraSection = ({
  isCameraOpen,
  onOpenCamera,
  onCloseCamera,
  videoRef,
  predictedWord,
  predictedLetters,
  selectedLanguage,
  originalLetters,
  onDeleteLetter,
  onSpeakAloud,
}) => {
  return (
    <div className="flex flex-col space-y-4 w-full">
      {/* Camera Control Section */}
      <div className="relative w-full">
        {!isCameraOpen ? (
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 rounded-xl blur opacity-60 group-hover:opacity-90 transition duration-300"></div>
            <button
              onClick={onOpenCamera}
              className="relative w-full bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-700 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-600 hover:via-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-xl transform hover:scale-[1.01]"
            >
              <div className="flex items-center justify-center space-x-3">
                <FontAwesomeIcon
                  icon={faCameraRetro}
                  className="text-xl animate-pulse"
                />
                <div className="text-center">
                  <div className="text-lg font-bold">Activate Camera</div>
                  <div className="text-purple-200 text-sm font-medium">
                    Start recognition
                  </div>
                </div>
              </div>
            </button>
          </div>
        ) : (
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl blur opacity-60 group-hover:opacity-90 transition duration-300"></div>
            <button
              onClick={onCloseCamera}
              className="relative w-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-4 px-6 rounded-xl hover:from-red-500 hover:to-pink-500 transition-all duration-300 shadow-xl transform hover:scale-[1.01]"
            >
              <div className="flex items-center justify-center space-x-3">
                <FontAwesomeIcon icon={faCamera} className="text-xl" />
                <div className="text-center">
                  <div className="text-lg font-bold">Stop Camera</div>
                  <div className="text-red-200 text-sm font-medium">
                    End session
                  </div>
                </div>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Camera Feed */}
      <div className="relative w-full">
        <div className="relative bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-transparent to-indigo-400/10 rounded-xl"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-white font-medium text-sm">
                  Live Feed
                </span>
              </div>
              <div className="text-white/70 text-xs font-medium">
                {languageNames[selectedLanguage]}
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden border border-white/20">
              <video
                ref={videoRef}
                autoPlay
                className={`w-full h-auto aspect-video object-cover ${
                  !isCameraOpen ? "hidden" : ""
                }`}
                style={{ transform: "scaleX(-1)" }}
              />
              {!isCameraOpen && (
                <div className="w-full aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center text-white/60">
                    <FontAwesomeIcon
                      icon={faCameraRetro}
                      className="text-3xl mb-2 opacity-50"
                    />
                    <p className="text-xs">Camera is off</p>
                    <p className="text-xs text-white/40">Activate to start</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Prediction Results */}
      <div className="w-full max-w-2xl space-y-2">
        {/* Predicted Word - Chat Bubble Style */}
        <div className="relative">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-3 shadow-lg relative">
            <div className="absolute inset-0 bg-white/10 rounded-xl backdrop-blur-sm"></div>
            <div className="relative flex items-center space-x-2">
              <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faRobot}
                  className="text-white text-xs"
                />
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-xs font-medium mb-0.5">
                  AI Predicted Word
                </div>
                <div className="text-white text-sm font-bold break-words">
                  {predictedWord || "Waiting for sign..."}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-1 left-4 w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rotate-45"></div>
        </div>

        {/* Predicted Letters - Dynamic Bar */}
        <div className="bg-white/10 backdrop-blur-xl rounded-lg p-2 border border-white/20">
          <div className="flex items-center space-x-2 mb-1">
            <FontAwesomeIcon
              icon={faWaveSquare}
              className="text-purple-400 text-xs"
            />
            <span className="text-white font-medium text-xs">Letters</span>
          </div>
          <div className="bg-black/20 rounded-md p-2 font-mono text-sm tracking-wider text-center min-h-[30px] flex items-center justify-center">
            <span className="text-purple-300">
              {predictedLetters.join("") || "No letters detected"}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-2xl grid grid-cols-2 gap-2">
        <button
          onClick={onDeleteLetter}
          className="group relative bg-white/10 backdrop-blur-xl border border-white/20 text-white py-2 px-3 rounded-lg hover:bg-white/20 transition-all duration-300 shadow-lg transform hover:scale-[1.02]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-center space-x-1">
            <div className="w-5 h-5 bg-red-500/20 rounded-md flex items-center justify-center group-hover:bg-red-500/30 transition-colors duration-300">
              <FontAwesomeIcon
                icon={faTrash}
                className="text-red-400 text-xs"
              />
            </div>
            <span className="font-medium text-xs">Delete</span>
          </div>
        </button>

        <button
          onClick={onSpeakAloud}
          className="group relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-3 rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-lg transform hover:scale-[1.02]"
        >
          <div className="flex items-center justify-center space-x-1">
            <div className="w-5 h-5 bg-white/20 rounded-md flex items-center justify-center">
              <FontAwesomeIcon
                icon={faMicrophone}
                className="text-white text-xs"
              />
            </div>
            <span className="font-medium text-xs">Speak</span>
          </div>
        </button>
      </div>
    </div>
  );
};

CameraSection.propTypes = {
  isCameraOpen: PropTypes.bool.isRequired,
  onOpenCamera: PropTypes.func.isRequired,
  onCloseCamera: PropTypes.func.isRequired,
  videoRef: PropTypes.object.isRequired,
  predictedWord: PropTypes.string.isRequired,
  predictedLetters: PropTypes.array.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
  originalLetters: PropTypes.array.isRequired,
  onDeleteLetter: PropTypes.func.isRequired,
  onSpeakAloud: PropTypes.func.isRequired,
};

export default CameraSection;
