import React from "react";

function ControlsHeader({
  handleVideoUpload,
  handleCSVUpload,
  handleStart,
  handleStop,
  handleDownload,
  startTimestamp,
  timestamps,
  csvData,
  inputCSVRef,
  inputVideoRef,
}) {
  return (
    <nav className="navbar-container">
      
        <div className="navbar-brand" href="#">
          <img src={process.env.PUBLIC_URL + "favicon.ico"}
            alt="image"
            width="30"
            height="24"
          />
          {" Flam Video Tracker"}
        </div>
        <div className="navbar-links">
          <button
            className="button "
            type="file"
            onClick={() => inputVideoRef.current.click()}
          >
            Pick Video
            <input
              type="file"
              ref={inputVideoRef}
              className="file-input"
              style={{ display: "none" }}
              onChange={handleVideoUpload}
              accept="video/*"
            />
          </button>

          <button
            className="button"
            type="button"
            onClick={() => inputCSVRef.current.click()}
          >
            Pick CSV
            <input
              type="file"
              className="file-input"
              style={{ display: "none" }}
              onChange={handleCSVUpload}
              ref={inputCSVRef}
              accept=".csv"
            />
          </button>

          <button
            className="button"
            onClick={handleStart}
          >
            Start
          </button>
          <button
            className="button"
            onClick={handleStop}
            disabled={startTimestamp === ""}
          >
            Stop
          </button>

          {csvData.length > 0 || timestamps.length > 0 ? (
            <button
              className="button"
              onClick={handleDownload}
              disabled={!timestamps.length}
            >
              Download
            </button>
          ) : null}
        </div>
      
    </nav>
  );
}

export default ControlsHeader;
