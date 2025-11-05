import { useState, useRef, useEffect, useCallback } from "react";
import { CAMERA_CONFIG } from "../config/constants";

export const useCamera = () => {
  const videoRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const startVideoStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        CAMERA_CONFIG.CONSTRAINTS
      );
      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        if (videoRef.current.paused) {
          await videoRef.current.play();
        }

        setIsStreaming(true);
      }
    } catch (err) {
      console.error("Error starting video stream:", err);
    }
  }, []);

  const stopVideoStream = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  }, []);

  const openCamera = useCallback(() => {
    setIsCameraOpen(true);
  }, []);

  const closeCamera = useCallback(() => {
    setIsCameraOpen(false);
    stopVideoStream();
  }, [stopVideoStream]);

  useEffect(() => {
    if (isCameraOpen) {
      startVideoStream();
    }

    return () => {
      stopVideoStream();
    };
  }, [isCameraOpen, startVideoStream, stopVideoStream]);

  return {
    videoRef,
    isStreaming,
    isCameraOpen,
    openCamera,
    closeCamera,
  };
};
