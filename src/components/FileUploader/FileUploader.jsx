import { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import { MdOutlineFolderZip } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";
import FilesList from "./FilesList";
import "./FileUploader.scss";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useZipWorker } from "../util/useZipWorker";
import { readableFileSize } from "../util/readableFileSize";

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const {progress, zippedBlob, zipFiles} = useZipWorker();
  const [totalFileSize, setTotalFileSize] = useState(0);


   const getTotalFileSize = () => {
    return files.reduce((total, file) => total + parseInt(file.size), 0);
  };

  useEffect(() => {
    setTotalFileSize(getTotalFileSize());
  }, [files]);

  const handleFiles = (selectedFiles) => {
    setFiles((prev) => [...prev, ...Array.from(selectedFiles)]);
  };

  const handleRemoveFile = (fileToRemove) => {
    setFiles((prev) => prev.filter((file) => file !== fileToRemove));
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleUpload = (e) => {
    handleFiles(e.target.files);
  };

  const handleZip = () => {
    if (files.length > 0) zipFiles(files);
  };

  const handleDownload = () => {
    if (!zippedBlob) return;
    const url = URL.createObjectURL(zippedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "archive.zip";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="file-uploader">
      <p className="intro">
        Fast and easy file compression. Upload and zip files right in your
        browser — no installation needed.
      </p>
      <div className="function-btns">
        <button
          onClick={handleZip}
          disabled={files.length <= 0 || (progress > 0 && progress < 100)}
        >
          <MdOutlineFolderZip /> Zip Files
        </button>
      </div>
      {progress > 0 && progress < 100 && <ProgressBar progress={progress} />}
      {progress === 100 && (
        <p>Zip completed! Click the download button to get your zipped file.</p>
      )}
      {zippedBlob && (
        <div className="download-btns">
          <button onClick={handleDownload}>
            <FaDownload /> Zip Download
          </button>
        </div>
      )}

      {(progress === 0 || progress === 100) && (
        <div
          className={`drop-zone ${dragActive ? "active" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p>Drag & Drop files here or click to browse</p>
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
      )}
      {files.length > 0 && (
        <p className="total-file-size">
          Total File Size: {readableFileSize(totalFileSize)}
        </p>
      )}
      <FilesList
        files={files}
        handleRemoveFile={handleRemoveFile}
        handleRemoveAllFiles={handleRemoveAllFiles}
      />
    </div>
  );
};

export default FileUploader;
