import { FaSquareXmark } from "react-icons/fa6";
import { useReadableFileSize } from "../util/useReadableFileSize";

const FilesList = ({ files, handleRemoveFile, handleRemoveAllFiles }) => {
  return (
    <div className="files-list-container">
      {files.length > 0 && (
        <div className="file-list">
          <div className="files-list-header">
            <small className="files-list-title">
              Uploaded File Count: {files.length}
            </small>
            <button className="remove-all-btn" onClick={handleRemoveAllFiles}>
              Remove All Files
            </button>
          </div>
          <ul className="file-list-items">
            {files.map((file, idx) => (
              <li className="file-list-item" key={idx}>
                <div className="file-info">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">
                    {useReadableFileSize(parseInt(file.size))}
                  </span>
                </div>
                <FaSquareXmark
                  key={idx}
                  className="remove-btn"
                  onClick={() => handleRemoveFile(file)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilesList;
