import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { CSVLink } from "react-csv";
import { saveAs } from "file-saver";

function App() {
  const [startTimestamp, setStartTimestamp] = useState("");
  const [stopTimestamp, setStopTimestamp] = useState("");
  const [timestamps, setTimestamps] = useState([]);
  const [videoFilePath, setVideoFilePath] = useState(null);
  const [csvData, setCSVData] = useState([]);
  const playerRef = useRef(null);

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

  const formatTimestamp = () => {
    const time = playerRef.current.getCurrentTime().toPrecision(1);
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = time - hours * 3600 - minutes * 60;


    let timeString =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0") ;

    return timeString;
  };

  const handleStart = () => {
    setStartTimestamp(formatTimestamp());
  };

  const handleStop = () => {
    setStopTimestamp(formatTimestamp());
    setStartTimestamp("");
    setTimestamps([
      ...timestamps,
      { start: startTimestamp, stop: formatTimestamp() },
    ]);
  };

  const handleDownload = () => {
    const csvData = [["Start Time", "Stop Time"]];
    timestamps.forEach((timestamp) => {
      csvData.push([timestamp.start, timestamp.stop]);
    });
    const blob = new Blob([csvData.join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(blob, "timestamps.csv");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Flam Video Tracker
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="button-container">
        <input type="file" onChange={handleVideoUpload} />

        <button onClick={handleStart}>Start</button>
        <button disabled={startTimestamp === ""} onClick={handleStop}>
          Stop{" "}
        </button>

        <input type="file" onChange={handleCSVUpload} />
        {csvData.length > 0 && (
          <button disabled={!csvData.length} onClick={handleDownload}>
            Download CSV
          </button>
        )}
      </div>

      <div class="float-container">
        <div class="float-child">
            <div className="video-player-container">
              <ReactPlayer
                ref={playerRef}
                url={videoFilePath}
                width="50%"
                height="50%"
                controls={true}
              />
            </div>
        </div>

        <div class="float-child">
            <div className="table-container">
              <h5>Table:</h5>
              <table>
                <thead
                  style={{
                    backgroundColor: "lightgray",
                    color: "blue",
                    borderStyle: "groove",
                    borderColor: "black",
                  }}
                >
                  {" "}
                  <tr>
                    <th> S No.</th>
                    <th>Start</th>
                    <th>Stop</th>
                  </tr>
                </thead>
                <tbody>
                  {timestamps.map((timestamp, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{timestamp.start}</td>
                      <td>{timestamp.stop}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
