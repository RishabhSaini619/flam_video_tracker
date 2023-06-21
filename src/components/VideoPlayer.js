import React, { useEffect } from "react";
import ReactPlayer from "react-player";

function VideoPlayer({ playerRef, videoFilePath, handleStart, handleStop }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case " ":
          event.preventDefault();
          handleTogglePlay();
          break;
        case "ArrowLeft":
        case ",":
          event.preventDefault();
          handleRewind();
          break;
        case "ArrowRight":
        case ".":
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

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
      const newTime = currentTime - 1; // Rewind 1 seconds
      playerRef.current.seekTo(newTime);
    }
  };

  const handleForward = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      const newTime = currentTime + 1; // Forward 1 seconds
      playerRef.current.seekTo(newTime);
    }
  };

  return (
    <div className="video-player-container">
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
