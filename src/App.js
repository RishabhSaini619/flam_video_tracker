import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { CSVLink } from "react-csv";
import { saveAs } from "file-saver";



function App() {
  const [startTimestamp, setStartTimestamp] = useState("");
  const [stopTimestamp, setStopTimestamp] = useState("");
  const [timestamps, setTimestamps] = useState([]);
  const [videoFilePath, setVideoFilePath] = useState(null);
  const playerRef = useRef(null);

  const handleVideoUpload = (event) => {
    setVideoFilePath(URL.createObjectURL(event.target.files[0]));
  };

  const formatTimestamp = () => {
    const time = playerRef.current.getCurrentTime().toPrecision(2);
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = time - hours * 3600 - minutes * 60;

    let timeString =
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");

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
      <ReactPlayer
        ref={playerRef}
        url={videoFilePath}
        width="50%"
        height="50%"
        controls={true}
      />
      <div>
      <input type="file" onChange={handleVideoUpload} />

        <button onClick={handleStart}>Start</button>
        <button disabled={startTimestamp === ""} onClick={handleStop}>
          Stop
        </button>
      </div>

      <div>
        <h2>Timestamps:</h2>

        <div>
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

        <CSVLink data={timestamps} filename="timestamps.csv"></CSVLink>
        <button onClick={handleDownload}>Download CSV</button>
      </div>
    </div>
  );
}

export default App;
