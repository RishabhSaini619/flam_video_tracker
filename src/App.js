import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { saveAs } from "file-saver";
import { Table } from "react-bootstrap";

function App() {
  const [startTimestamp, setStartTimestamp] = useState("");
  const [stopTimestamp, setStopTimestamp] = useState("");
  const [timestamps, setTimestamps] = useState([]);
  const [videoFilePath, setVideoFilePath] = useState(null);
  const [csvData, setCSVData] = useState([]);
  const playerRef = useRef(null);
  const inputCSVRef = useRef(null);
  const inputVideoRef = useRef(null);

  const handleVideoUpload = (event) => {
    setVideoFilePath(URL.createObjectURL(event.target.files[0]));
  };

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const contents = e.target.result;
      const parsedCSV = contents
        .split("\n")
        .map((row) => row.split(","))
        .filter((row) => row.length === 2)
        .map((row) => ({ start: row[0].trim(), stop: row[1].trim() }));

      setCSVData(parsedCSV);

      setTimestamps(parsedCSV);
    };

    reader.readAsText(file);
  };

  const formatTimestamp = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = Math.floor(time - hours * 3600 - minutes * 60);

    let timeString =
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");

    return timeString;
  };

  const handleStart = () => {
    const currentTime = playerRef.current.getCurrentTime();
    const formattedTimestamp = formatTimestamp(currentTime);
    setStartTimestamp(formattedTimestamp);
  };

  const handleStop = () => {
    const currentTime = playerRef.current.getCurrentTime();
    const formattedTimestamp = formatTimestamp(currentTime);

    setStopTimestamp(formattedTimestamp);
    setTimestamps([
      ...timestamps,
      { start: startTimestamp, stop: formattedTimestamp },
    ]);
    setStartTimestamp("");
  };

  const handleDownload = () => {
    const csvRows = [null];
    timestamps.forEach((timestamp) => {
      csvRows?.push([timestamp.start, timestamp.stop]);
    });
    const csvData = csvRows?.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvData], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(blob, "timestamps.csv");
  };

  const [showHead, setShowHead] = useState(false);

  return (
    <>
      {/* Nav Bar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Flam Video Tracker
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

      {/* Player */}
      <div className="video-player-container">
        <ReactPlayer
          ref={playerRef}
          url={videoFilePath}
          width="70%"
          height="10%"
          controls={true}
        />
      </div>
      {/* csv Table */}
      <div className="card-table">
        <Table >
          {timestamps.length >= 1 && (
            <thead
              style={{
                backgroundColor: "lightgrey",
                color: "blue",
                borderStyle: "soild",
                borderColor: "black",
              }}
            >
              {" "}
              <tr>
                <th>S No.</th>
                <th>Start Time</th>
                <th>Stop Time</th>
              </tr>
            </thead>
          )}

          <tbody
            className="table-group-divider"
            style={{
              backgroundColor: "white",
              color: "black",
              borderStyle: "solid",
              borderColor: "black",
            }}
          >
            {timestamps.map((timestamp, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{timestamp.start}</td>
                <td>{timestamp.stop}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default App;
