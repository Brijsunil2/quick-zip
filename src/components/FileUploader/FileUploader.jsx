import { useState } from "react";
import "./FileUploader.scss";

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (selectedFiles) => {
    setFiles((prev) => [...prev, ...Array.from(selectedFiles)]);
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
    console.log("Compressing files:", files);
  };

  return (
    <div className="file-uploader">
      <p className="intro">
        Fast and easy file compression. Upload and zip files right in your
        browser — no installation needed.
      </p>
      <div className="function-btns">
        <button onClick={handleCompress} disabled={files.length <= 0}>
          Compress
        </button>
      </div>
      <div
        className={`drop-zone ${dragActive ? "active" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p>Drag & Drop files here or click to browse</p>
        <label for="file-upload" class="custom-file-input-btn">
          📁 Upload Files
        </label>
        <input
          className="file-input"
          type="file"
          multiple
          onChange={handleFileChange}
        />
      </div>

      {files.length > 0 && (
        <div className="file-list">
          <ul>
            {files.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
