import { useState } from "react";
import { MdOutlineFolderZip } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";
import FilesList from "./FilesList";
import FileDropZone from "../FileDropZone/FileDropZone";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useZipWorker } from "../util/useZipWorker";
import "./FileUploader.scss";

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const { progress, zippedBlob, zipFiles } = useZipWorker();

  const handleFiles = (selectedFiles) => {
    setFiles((prev) => [...prev, ...Array.from(selectedFiles)]);
  };

  const handleRemoveFile = (fileToRemove) => {
    setFiles((prev) => prev.filter((file) => file !== fileToRemove));
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  const handleUpload = (e) => {
    handleFiles(e.target.files);
  };

 const handleZip = () => {
  if (files.length === 0) return;

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  const MAX_SAFE_SIZE = 500 * 1024 * 1024;

  if (totalSize > MAX_SAFE_SIZE) {
    alert("These files are too large to zip in the browser. Please choose smaller files or fewer files.");
    return;
  }

  zipFiles(files);
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
        <>
          <FileDropZone
            dragActive={dragActive}
            setDragActive={setDragActive}
            handleFiles={handleFiles}
            handleUpload={handleUpload}
          />

          <FilesList
            files={files}
            handleRemoveFile={handleRemoveFile}
            handleRemoveAllFiles={handleRemoveAllFiles}
          />
        </>
      )}
    </div>
  );
};

export default FileUploader;
