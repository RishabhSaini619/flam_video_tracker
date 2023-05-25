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
            class="d-inline-block align-text-top"
          />
          {" Flam Video Tracker"}
        </div>
        <div className="navbar-links">
          <button
            className="btn btn-outline-success"
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
            className="btn btn-outline-success"
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
            className="btn btn-outline-success"
            onClick={handleStart}
            disabled={!timestamps.length}
          >
            Start
          </button>
          <button
            className="btn btn-outline-success"
            onClick={handleStop}
            disabled={startTimestamp === ""}
          >
            Stop
          </button>

          {csvData.length > 0 || timestamps.length > 0 ? (
            <button
              className="btn btn-outline-success"
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
