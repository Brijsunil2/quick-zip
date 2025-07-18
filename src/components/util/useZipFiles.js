import { useState } from "react";
import JSZip from "jszip";

export const useZipFiles = () => {
  const [isZipping, setIsZipping] = useState(false);

  const zipFiles = async (files, outputName = "my-files.zip") => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      for (const file of files) {
        const content = await file.arrayBuffer();
        zip.file(file.name, content);
      }

      const blob = await zip.generateAsync({ type: "blob" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = outputName;
      link.click();
    } finally {
      setIsZipping(false);
    }
  };

  return { zipFiles, isZipping };
};