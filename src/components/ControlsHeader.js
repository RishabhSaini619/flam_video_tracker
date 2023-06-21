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

  console.log(startTimestamp,"controlsheader-props");
  return (
    <nav className="navbar-container">
      <div className="navbar-brand" href="#">
        <img
          src={process.env.PUBLIC_URL + "flam.svg"}
          alt="image"
          width="100"
          height="50"
        />
        <h3 className="title" style={{marginTop:20}}>Video Tracker</h3>
      </div>
      <div className="navbar-links">
        {/* Download btn */}
        {csvData.length > 0 || timestamps.length > 0 ? (
          <button
            className="button"
            onClick={handleDownload}
            disabled={!timestamps.length}
          >
            Download
          </button>
        ) : null}
        {/* Pick Video btn */}
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
        {/*  Pick CSV btn */}
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

        {/* Start btn */}
        <button className="button" onClick={handleStart}>
          Start
        </button>
        {/* Stop btn */}
        <button
          className="button"
          onClick={handleStop}
          disabled={startTimestamp === ""}
        >
          Stop
        </button>
      </div>
    </nav>
  );
}

export default ControlsHeader;
