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
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
        <img src={process.env.PUBLIC_URL + "favicon.ico"} alt="image" width="30" height="24" class="d-inline-block align-text-top"/>
      {" Flam Video Tracker"}
    </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                <button
                  className="btn btn-outline-success"
                  type="file"
                  onClick={() => inputVideoRef.current.click()}
                >
                  Pick Video
                </button>
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleVideoUpload}
                  ref={inputVideoRef}
                />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                <button
                  className="btn btn-outline-success"
                  type="button"
                  onClick={() => inputCSVRef.current.click()}
                >
                  Pick CSV
                </button>
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleCSVUpload}
                  ref={inputCSVRef}
                />
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="#"
                onClick={handleStart}
              >
                <button
                  className="btn btn-outline-success"
                  type="button"
                  onClick={handleStart}
                >
                  Start
                </button>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="#"
                onClick={handleStop}
              >
                <button
                  className="btn btn-outline-success"
                  type="button"
                  disabled={startTimestamp === ""}
                  onClick={handleStop}
                >
                  Stop
                </button>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                {csvData.length > 0 || timestamps.length > 0 ? (
                  <button
                    className="btn btn-outline-success"
                    type="button"
                    disabled={!timestamps.length}
                    onClick={handleDownload}
                  >
                    Download
                  </button>
                ) : null}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default ControlsHeader;
