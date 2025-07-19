import { useState } from "react";
import JSZip from "jszip";

export const useZipFiles = () => {
  const [progress, setProgress] = useState(0);
  const [zippedFiles, setZippedFiles] = useState(null);

  const zipFiles = async (files) => {
    setProgress(0);

    const zip = new JSZip();

    for (const file of files) {
      const content = await file.arrayBuffer();
      zip.file(file.name, content);
    }

    const blob = await zip.generateAsync(
      { type: "blob" },
      (metadata) => {
        setProgress(Math.floor(metadata.percent));
        console.log(`Zipping progress: ${metadata.percent}%`);
      }
    );

    setZippedFiles(blob);
    setProgress(100);

  };

  return { zipFiles, progress, zippedFiles };
};