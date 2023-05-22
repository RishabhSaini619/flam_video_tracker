import React, {useRef, useState } from "react";
import ReactPlayer from "react-player";


function App() {
  
  const [videoURL, setVideoURL] = useState('');
  const [startTimestamp, setStartTimestamp] = useState("");
  const [stopTimestamp, setStopTimestamp] = useState("");
  const [timestamps, setTimestamps] = useState([]);
  const [videoFilePath, setVideoFilePath] = useState(null);

  const playerRef = useRef(null);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   const videoURL = URL.createObjectURL(file);
  //   setVideoURL(videoURL);
  // };

  const handleVideoUpload = (event) => {
    setVideoFilePath(URL.createObjectURL(event.target.files[0]));
    };

  const formatTimestamp = () => {
    const time  = playerRef.current.getCurrentTime().toPrecision(2) ;
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - (hours * 3600)) / 60);
    const seconds = time - (hours * 3600) - (minutes * 60);

    let timeString = hours.toString().padStart(2, '0') + ':' +
        minutes.toString().padStart(2, '0') + ':' +
        seconds.toString().padStart(2, '0');

    return timeString ;


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

  return (
    <div>
      <input type="file" onChange={handleVideoUpload} />

    
      
      <ReactPlayer 
      ref={playerRef} 
      url={videoFilePath} width="50%" height="50%" 
      controls={true}/>
     <div>
    <button onClick={handleStart}>Start</button>
    <button disabled={startTimestamp === ""} onClick={handleStop}>
      Stop
    </button>
  </div>
    </div>
   

  );
}


export default App;
