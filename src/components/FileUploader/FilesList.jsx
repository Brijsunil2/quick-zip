import { FaSquareXmark } from "react-icons/fa6";

const FilesList = ({ files }) => {
  return (
    <div className="files-list-container">
      {files.length > 0 && (
        <div className="file-list">
          <small className="files-list-title">
            Uploaded File Count: {files.length}
          </small>
          <ul className="file-list-items">
            {files.map((file, idx) => (
              <li className="file-list-item" key={idx}>
                <div className="file-info">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">
                    {file.size > 1024 * 1024
                      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
                      : `${(file.size / 1024).toFixed(2)} KB`}
                  </span>
                </div>
                <FaSquareXmark key={idx} className="remove-btn" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilesList;
