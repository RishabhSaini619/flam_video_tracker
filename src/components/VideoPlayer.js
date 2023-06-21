import React, { useRef } from "react";
import ReactPlayer from "react-player";

function VideoPlayer({
  playerRef,
  videoFilePath,
  handleStart,
  handleStop,
}) {
  const containerRef = useRef(null);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case " ":
        event.preventDefault();
        handleTogglePlay();
        break;
      case "ArrowLeft":
      case "<":
        event.preventDefault();
        handleRewind();
        break;
      case "ArrowRight":
      case ">":
        event.preventDefault();
        handleForward();
        break;
      case "z":
        event.preventDefault();
        handleStart();
        break;
      case "x":
        event.preventDefault();
        handleStop();
        break;
      default:
        break;
    }
  };

  const handleTogglePlay = () => {
    if (playerRef.current) {
      const isPaused = playerRef.current.getInternalPlayer().paused;
      if (isPaused) {
        handleStart();
        playerRef.current.getInternalPlayer().play();
      } else {
        handleStop();
        playerRef.current.getInternalPlayer().pause();
      }
    }
  };

  const handleRewind = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      const newTime = currentTime - 5; // Rewind 5 seconds
      playerRef.current.seekTo(newTime);
    }
  };

  const handleForward = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      const newTime = currentTime + 5; // Forward 5 seconds
      playerRef.current.seekTo(newTime);
    }
  };

  return (
    <div
      className="video-player-container"
      ref={containerRef}
      tabIndex="0"
      onKeyDown={handleKeyDown}
    >
      <ReactPlayer
        className="react-player"
        ref={playerRef}
        url={videoFilePath}
        controls={true}
      />
    </div>
  );
}

export default VideoPlayer;

