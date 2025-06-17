import "./FileUploader.scss";
import { useState } from "react";

const FileUploader = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleCompress = () => {
    console.log("Compressing files:", files);
  };

  return (
    <div className="file-uploader-container">
      <h2>File Uploader</h2>
      <input type="file" multiple onChange={handleFileChange} />
      {files.length > 0 && (
        <div className="file-list">
          <ul>
            {files.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
          <button onClick={handleCompress}>Compress</button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
