import { useEffect, useState, useRef } from "react";

export const useZipWorker = () => {
  const [progress, setProgress] = useState(0);
  const [zippedBlob, setZippedBlob] = useState(null);
  const workerRef = useRef(null);

  useEffect(() => {
    workerRef.current = new Worker(new URL("../../workers/zipWorker.js", import.meta.url), {
      type: "module",
    });

    workerRef.current.onmessage = (e) => {
      const { type, percent, blob } = e.data;
      if (type === "progress") {
        setProgress(Math.floor(percent));
      } else if (type === "done") {
        setZippedBlob(blob);
      }
    };

    return () => {
      workerRef.current.terminate();
    };
  }, []);

  const zipFiles = (files) => {
    setProgress(0);
    setZippedBlob(null);
    workerRef.current.postMessage({ files });
  };

  return { progress, zippedBlob, zipFiles };
};