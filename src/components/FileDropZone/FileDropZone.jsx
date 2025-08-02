import "./FileDropZone.scss";
import { FaUpload } from "react-icons/fa";

import { useEffect, useState } from "react";

const FileDropZone = ({ dragActive, setDragActive, handleFiles, handleUpload }) => {
  const [isChrome, setIsChrome] = useState(true);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isChromeBrowser = /chrome/.test(ua) && !/edg|opr|brave/.test(ua);
    setIsChrome(isChromeBrowser);
  }, []);

  const handleDrop = (e) => {
    if (!isChrome) return;
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    if (!isChrome) return;
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    if (!isChrome) return;
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  return (
    <div
      className={`drop-zone ${dragActive ? "active" : ""} ${!isChrome ? "disabled" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p>
        {isChrome
          ? "Drag & Drop files here or click to browse"
          : "Drag & Drop is only supported in Chrome. Use file upload instead."}
      </p>
      <label htmlFor="file-upload" className="custom-file-input-btn">
        <FaUpload /> Upload Files
      </label>
      <input
        id="file-upload"
        className="file-input"
        type="file"
        multiple
        onChange={handleUpload}
      />
    </div>
  );
};

export default FileDropZone;