import { useState, useCallback } from "react";
import { SPEECH_CONFIG } from "../config/constants";

export const useSpeechSynthesis = () => {
  const [volume, setVolume] = useState(SPEECH_CONFIG.DEFAULT_VOLUME);
  const [pitch, setPitch] = useState(SPEECH_CONFIG.DEFAULT_PITCH);
  const [rate, setRate] = useState(SPEECH_CONFIG.DEFAULT_RATE);

  const mapPitch = useCallback((value) => {
    return (
      (value + SPEECH_CONFIG.PITCH_MAPPING.scale) /
      SPEECH_CONFIG.PITCH_MAPPING.scale
    );
  }, []);

  const speakWord = useCallback(
    (word) => {
      if (!word) return;

      const utterance = new SpeechSynthesisUtterance(word);
      utterance.volume = volume;
      utterance.pitch = mapPitch(pitch);
      utterance.rate = rate;

      window.speechSynthesis.speak(utterance);
    },
    [volume, pitch, rate, mapPitch]
  );

  const handleVolumeChange = useCallback((event) => {
    setVolume(parseFloat(event.target.value));
  }, []);

  const handlePitchChange = useCallback((event) => {
    setPitch(parseFloat(event.target.value));
  }, []);

  const handleRateChange = useCallback((event) => {
    setRate(parseFloat(event.target.value));
  }, []);

  return {
    volume,
    pitch,
    rate,
    speakWord,
    handleVolumeChange,
    handlePitchChange,
    handleRateChange,
  };
};
