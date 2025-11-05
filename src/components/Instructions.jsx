import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faHand,
  faLightbulb,
  faImage,
  faInfoCircle,
  faBullseye,
} from "@fortawesome/free-solid-svg-icons";

const Instructions = () => {
  const instructionCards = [
    {
      icon: faCamera,
      iconColor: "text-blue-400",
      title: "Webcam Setup",
      description: "Position camera at eye level, center hands",
    },
    {
      icon: faHand,
      iconColor: "text-emerald-400",
      title: "Hand Position",
      description: "Keep hands visible with clear movements",
    },
    {
      icon: faLightbulb,
      iconColor: "text-yellow-400",
      title: "Lighting",
      description: "Use bright, even lighting without shadows",
    },
    {
      icon: faImage,
      iconColor: "text-purple-400",
      title: "Background",
      description: "Plain, contrasting background works best",
    },
    {
      icon: faBullseye,
      iconColor: "text-red-400",
      title: "Clear View",
      description: "Remove jewelry and obstructions",
    },
  ];

  return (
    <div>
      <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/10 via-transparent to-purple-400/10"></div>

        {/* Header */}
        <div className="relative p-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="text-white text-sm"
                />
              </div>
              <div>
                <h2 className="text-white text-lg font-bold">Setup Guide</h2>
                <p className="text-white/70 text-xs">Quick setup tips</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips - Always Visible */}
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {instructionCards.map((card, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200 text-center"
              >
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon
                    icon={card.icon}
                    className={`${card.iconColor} text-sm`}
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-medium text-xs mb-1">
                    {card.title}
                  </h3>
                  <p className="text-white/60 text-xs leading-tight">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
