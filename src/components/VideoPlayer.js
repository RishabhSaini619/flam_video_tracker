import React from "react";
import ReactPlayer from "react-player";

function VideoPlayer({
  playerRef,
  videoFilePath,
}) {
  return (
    <div className="video-player-container">
      <ReactPlayer className="react-player"
        ref={playerRef}
        url={videoFilePath}
        controls={true}
        
      />
    </div>
  );
}

export default VideoPlayer;
