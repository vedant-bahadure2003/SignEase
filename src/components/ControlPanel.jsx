import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeUp,
  faMusic,
  faTachometerAlt,
  faGlobe,
  faSliders,
  faMagic,
} from "@fortawesome/free-solid-svg-icons";
import { languageNames } from "../config/languages";

const ControlPanel = ({
  volume,
  pitch,
  rate,
  selectedLanguage,
  onVolumeChange,
  onPitchChange,
  onRateChange,
  onLanguageChange,
}) => {
  return (
    <div className="space-y-4">
      {/* Control Panel Header */}
      <div className="relative bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-transparent to-indigo-400/10 rounded-xl"></div>
        <div className="relative">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg">
              <FontAwesomeIcon
                icon={faSliders}
                className="text-white text-sm"
              />
            </div>
            <div>
              <h2 className="text-white text-lg font-bold">Voice Controls</h2>
              <p className="text-white/70 text-sm">Audio settings</p>
            </div>
          </div>

          {/* Volume Control */}
          <div className="space-y-6">
            <div className="group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-md flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300">
                    <FontAwesomeIcon
                      icon={faVolumeUp}
                      className="text-blue-400 text-sm"
                    />
                  </div>
                  <span className="text-white font-medium text-sm">Volume</span>
                </div>
                <div className="bg-white/10 px-3 py-1 rounded-lg">
                  <span className="text-purple-300 font-mono text-sm">
                    {volume}
                  </span>
                </div>
              </div>
              <div className="relative">
                <input
                  type="range"
                  id="volume"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={onVolumeChange}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer slider-modern"
                  style={{
                    background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${
                      volume * 100
                    }%, rgba(255,255,255,0.1) ${
                      volume * 100
                    }%, rgba(255,255,255,0.1) 100%)`,
                  }}
                />
                <div
                  className="absolute top-1/2 transform -translate-y-1/2 pointer-events-none"
                  style={{ left: `${volume * 100}%`, marginLeft: "-5px" }}
                >
                  <div className="w-2.5 h-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-lg border border-white"></div>
                </div>
              </div>
            </div>

            {/* Pitch Control */}
            <div className="group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-1">
                  <div className="w-5 h-5 bg-emerald-500/20 rounded-md flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors duration-300">
                    <FontAwesomeIcon
                      icon={faMusic}
                      className="text-emerald-400 text-xs"
                    />
                  </div>
                  <span className="text-white font-medium text-xs">Pitch</span>
                </div>
                <div className="bg-white/10 px-2 py-0.5 rounded-md">
                  <span className="text-emerald-300 font-mono text-xs">
                    {pitch}
                  </span>
                </div>
              </div>
              <div className="relative">
                <input
                  type="range"
                  id="pitch"
                  min="-10"
                  max="10"
                  step="0.1"
                  value={pitch}
                  onChange={onPitchChange}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer slider-modern"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${
                      ((parseFloat(pitch) + 10) / 20) * 100
                    }%, rgba(255,255,255,0.1) ${
                      ((parseFloat(pitch) + 10) / 20) * 100
                    }%, rgba(255,255,255,0.1) 100%)`,
                  }}
                />
                <div
                  className="absolute top-1/2 transform -translate-y-1/2 pointer-events-none"
                  style={{
                    left: `${((parseFloat(pitch) + 10) / 20) * 100}%`,
                    marginLeft: "-5px",
                  }}
                >
                  <div className="w-2.5 h-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg border border-white"></div>
                </div>
              </div>
            </div>

            {/* Rate Control */}
            <div className="group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-1">
                  <div className="w-5 h-5 bg-orange-500/20 rounded-md flex items-center justify-center group-hover:bg-orange-500/30 transition-colors duration-300">
                    <FontAwesomeIcon
                      icon={faTachometerAlt}
                      className="text-orange-400 text-xs"
                    />
                  </div>
                  <span className="text-white font-medium text-xs">Speed</span>
                </div>
                <div className="bg-white/10 px-2 py-0.5 rounded-md">
                  <span className="text-orange-300 font-mono text-xs">
                    {rate}
                  </span>
                </div>
              </div>
              <div className="relative">
                <input
                  type="range"
                  id="rate"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={rate}
                  onChange={onRateChange}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer slider-modern"
                  style={{
                    background: `linear-gradient(to right, #f97316 0%, #f97316 ${
                      ((parseFloat(rate) - 0.1) / 2.9) * 100
                    }%, rgba(255,255,255,0.1) ${
                      ((parseFloat(rate) - 0.1) / 2.9) * 100
                    }%, rgba(255,255,255,0.1) 100%)`,
                  }}
                />
                <div
                  className="absolute top-1/2 transform -translate-y-1/2 pointer-events-none"
                  style={{
                    left: `${((parseFloat(rate) - 0.1) / 2.9) * 100}%`,
                    marginLeft: "-5px",
                  }}
                >
                  <div className="w-2.5 h-2.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg border border-white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Language Selector */}
      <div className="relative bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/10 via-transparent to-purple-400/10 rounded-xl"></div>
        <div className="relative">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-7 h-7 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
              <FontAwesomeIcon icon={faGlobe} className="text-white text-xs" />
            </div>
            <div>
              <h3 className="text-white text-sm font-bold">Language</h3>
              <p className="text-white/70 text-xs">Select language</p>
            </div>
          </div>

          <div className="relative group">
            <select
              id="language"
              value={selectedLanguage}
              onChange={onLanguageChange}
              className="w-full bg-white/10 border border-white/20 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent backdrop-blur-sm font-medium cursor-pointer hover:bg-white/20 transition-all duration-300 appearance-none text-xs"
            >
              {Object.entries(languageNames).map(([code, name]) => (
                <option
                  key={code}
                  value={code}
                  className="bg-gray-800 text-white"
                >
                  {name}
                </option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <FontAwesomeIcon
                icon={faMagic}
                className="text-purple-400 text-xs group-hover:text-white transition-colors duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ControlPanel.propTypes = {
  volume: PropTypes.number.isRequired,
  pitch: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
  onPitchChange: PropTypes.func.isRequired,
  onRateChange: PropTypes.func.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
};

export default ControlPanel;
