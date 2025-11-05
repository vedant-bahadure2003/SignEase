import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { languageMap } from "../config/languages";
import { API_CONFIG } from "../config/constants";

const API_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PREDICT}`;
const PREDICTION_INTERVAL = API_CONFIG.PREDICTION_INTERVAL;

export const useSignLanguagePrediction = (videoRef, isStreaming) => {
  const [predictedLetters, setPredictedLetters] = useState([]);
  const [predictedWord, setPredictedWord] = useState("");
  const [lastPredictedLetter, setLastPredictedLetter] = useState("");
  const [originalLetters, setOriginalLetters] = useState([]);
  const [processedImage, setProcessedImage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const translateLetters = useCallback((letters, language) => {
    const mapping = languageMap[language] || languageMap.en;
    return letters.map((letter) => mapping[letter] || letter);
  }, []);

  const handleSpaceInput = useCallback(() => {
    setPredictedWord((prevWord) => prevWord + " ");
    setPredictedLetters([]);
    setOriginalLetters([]);
    setLastPredictedLetter("");
  }, []);

  const handleLetterInput = useCallback(
    (predictedLetter) => {
      if (predictedLetter !== lastPredictedLetter) {
        setOriginalLetters((prev) => {
          const newOriginalLetters = [...prev, predictedLetter];
          const newTranslatedLetters = translateLetters(
            newOriginalLetters,
            selectedLanguage
          );

          setPredictedLetters(newTranslatedLetters);
          setPredictedWord(newTranslatedLetters.join(""));

          return newOriginalLetters;
        });
      }
      setLastPredictedLetter(predictedLetter);
    },
    [lastPredictedLetter, selectedLanguage, translateLetters]
  );

  const sendFrame = useCallback(async () => {
    if (!isStreaming || !videoRef.current) return;

    try {
      const canvas = document.createElement("canvas");
      canvas.width = API_CONFIG.VIDEO?.width || 640;
      canvas.height = API_CONFIG.VIDEO?.height || 480;
      const context = canvas.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg");

      const response = await axios.post(API_URL, {
        image: imageData.split(",")[1],
      });

      const predictedLetter = response.data.predicted_label;

      if (predictedLetter === "Space") {
        handleSpaceInput();
      } else {
        handleLetterInput(predictedLetter);
      }

      setProcessedImage(`data:image/jpeg;base64,${response.data.image}`);
    } catch (error) {
      console.error("Error fetching prediction: ", error);
    }
  }, [isStreaming, videoRef, handleSpaceInput, handleLetterInput]);

  const handleDeleteLetter = useCallback(() => {
    setOriginalLetters((prev) => {
      const newOriginalLetters = prev.slice(0, -1);
      const newTranslatedLetters = translateLetters(
        newOriginalLetters,
        selectedLanguage
      );

      setPredictedLetters(newTranslatedLetters);
      setPredictedWord(newTranslatedLetters.join(""));

      return newOriginalLetters;
    });
    setLastPredictedLetter("");
  }, [selectedLanguage, translateLetters]);

  const handleLanguageChange = useCallback(
    (e) => {
      const newLanguage = e.target.value;
      setSelectedLanguage(newLanguage);

      if (originalLetters.length > 0) {
        const retranslatedLetters = translateLetters(
          originalLetters,
          newLanguage
        );
        setPredictedLetters(retranslatedLetters);
        setPredictedWord(retranslatedLetters.join(""));
      }
    },
    [originalLetters, translateLetters]
  );

  useEffect(() => {
    const interval = setInterval(sendFrame, PREDICTION_INTERVAL);
    return () => clearInterval(interval);
  }, [sendFrame]);

  return {
    predictedLetters,
    predictedWord,
    lastPredictedLetter,
    originalLetters,
    processedImage,
    selectedLanguage,
    handleDeleteLetter,
    handleLanguageChange,
  };
};
