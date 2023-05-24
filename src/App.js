import React, { useRef, useState } from "react";
import { saveAs } from "file-saver";
import VideoPlayer from "./components/VideoPlayer";
import CSVTable from "./components/CSVTable";
import ControlsHeader from "./components/ControlsHeader";

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
    const formattedTimestamp = formatTimestamp(currentTime);
    setStartTimestamp(formattedTimestamp);
  };

  // Function to handle stop button click
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

  // Function to handle download button click
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

  return (
    <>
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
      <VideoPlayer
        playerRef={playerRef}
        videoFilePath={videoFilePath}
        handleStart={handleStart}
        startTimestamp={startTimestamp}
      />
      <CSVTable timestamps={timestamps} />
    </>
  );
}

export default App;
