import React from "react";
import ReactPlayer from "react-player";

function VideoPlayer({
  playerRef,
  videoFilePath,
  handleStart,
  startTimestamp,
}) {
  return (
    <div className="video-player-container">
      <ReactPlayer
        ref={playerRef}
        url={videoFilePath}
        width="70%"
        height="10%"
        controls={true}
        
      />
    </div>
  );
}

export default VideoPlayer;
