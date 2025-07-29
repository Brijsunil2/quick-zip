import { FaUpload } from "react-icons/fa";

const FileDropZone = ({ dragActive, setDragActive, handleFiles, handleUpload }) => {
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

  return (
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
  );
};

export default FileDropZone;
