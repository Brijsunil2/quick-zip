import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { MdOutlineFolderZip } from "react-icons/md";
import FilesList from "./FilesList";
import "./FileUploader.scss";
import { useZipFiles } from "../util/useZipFiles";

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const { zipFiles, progress, zippedFiles } = useZipFiles();

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

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleCompress = () => {
    zipFiles(files);
  };

  return (
    <div className="file-uploader">
      <p className="intro">
        Fast and easy file compression. Upload and zip files right in your
        browser — no installation needed.
      </p>
      <div className="function-btns">
        <button onClick={handleCompress} disabled={files.length <= 0}>
          <MdOutlineFolderZip /> Compress (zip)
        </button>
      </div>
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
          onChange={handleFileChange}
        />
      </div>

      <FilesList
        files={files}
        handleRemoveFile={handleRemoveFile}
        handleRemoveAllFiles={handleRemoveAllFiles}
      />
    </div>
  );
};

export default FileUploader;
