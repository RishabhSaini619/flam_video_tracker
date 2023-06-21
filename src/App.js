import React, { useRef, useState } from "react";
import { saveAs } from "file-saver";
import VideoPlayer from "./components/VideoPlayer";
import CSVTable from "./components/CSVTable";
import ControlsHeader from "./components/ControlsHeader";
import "./App.css";
function App() {
  // State variables
  const [startTimestamp, setStartTimestamp] = useState("");
  const [stopTimestamp, setStopTimestamp] = useState("");
  const [timestamps, setTimestamps] = useState([]);
  const [videoFilePath, setVideoFilePath] = useState(null);
  const [csvData, setCSVData] = useState([]);

  const playerRef = useRef(null);
  const inputCSVRef = useRef(null);
  const inputVideoRef = useRef(null);

  // Function to handle video upload
  const handleVideoUpload = (event) => {
    setVideoFilePath(URL.createObjectURL(event.target.files[0]));
  };

  // Function to handle CSV upload
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

  // Function to format timestamp
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

  // Function to handle start button click
  const handleStart = () => {
    const currentTime = playerRef.current.getCurrentTime();
    const formattedStartTimestamp = formatTimestamp(currentTime);

    setStartTimestamp(formattedStartTimestamp);
    console.log(startTimestamp, "app.js-handleStart");
  };

  const handleStop = () => {
    const currentTime = playerRef.current.getCurrentTime();
    const formattedStopTimestamp = formatTimestamp(currentTime);

    setStopTimestamp(formattedStopTimestamp);

    console.log(startTimestamp, "app.js-handleStop");
    console.log(formattedStopTimestamp, "app.js-handleStop");

    const newTimestamp = {
      start: startTimestamp,
      stop: formattedStopTimestamp,
    };

    setTimestamps((prevTimestamps) => [...prevTimestamps, newTimestamp]);
    setStartTimestamp("");
  };

  // Function to handle download button click
  const handleDownload = () => {
    const csvRows = [];
    timestamps.forEach((timestamp) => {
      csvRows?.push([timestamp.start, timestamp.stop]);
    });
    const csvData = csvRows?.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvData], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(blob, "timestamps.csv");
  };

  return (
    <div className="app-container">
      <ControlsHeader
        handleVideoUpload={handleVideoUpload}
        handleCSVUpload={handleCSVUpload}
        handleStart={handleStart}
        handleStop={handleStop}
        handleDownload={handleDownload}
        startTimestamp={startTimestamp}
        timestamps={timestamps}
        csvData={csvData}
        inputCSVRef={inputCSVRef}
        inputVideoRef={inputVideoRef}
      />
      <div className="body-container">
        <VideoPlayer
          playerRef={playerRef}
          videoFilePath={videoFilePath}
          // handleStart={handleStart}
          // handleStop={handleStop}
          // handleVideoUpload={handleVideoUpload}
          // handleCSVUpload={handleCSVUpload}
          // handleDownload={handleDownload}
        />
        <CSVTable
          timestamps={timestamps}
          startTimestamp={startTimestamp}
          inputVideoRef={inputVideoRef}
        />
      </div>
    </div>
  );
}

export default App;
