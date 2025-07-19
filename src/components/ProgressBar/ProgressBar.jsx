import './ProgressBar.scss';

const ProgressBar = ({ progress = 0 }) => {
  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{ width: `${progress}%` }}
      />
      <span className="progress-label">{progress}%</span>
    </div>
  );
};

export default ProgressBar;