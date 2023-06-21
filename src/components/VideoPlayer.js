import React, { useEffect } from "react";
import ReactPlayer from "react-player";

function VideoPlayer({
  playerRef,
  videoFilePath,
  // handleStart,
  // handleStop,
  // handleVideoUpload,
  // handleCSVUpload,
  // handleDownload,
}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();

      switch (event.key) {
        case " ":
          handleTogglePlay();
          break;
        case "ArrowLeft":
        case ",":
          handleRewind();
          break;
        case "ArrowRight":
        case ".":
          handleForward();
          break;
        // case "z":
        //   handleStart();
        //   break;
        // case "x":
        //   handleStop();
        //   break;
        // case "c":
        //   event.preventDefault();
        //   handleCSVUpload();
        //   break;
        // case "v":
        //   event.preventDefault();
        //   handleVideoUpload();
        //   break;
        // case "d":
        //   event.preventDefault();
        //   handleDownload();
        //   break;
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
        playerRef.current.getInternalPlayer().play();
      } else {
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
