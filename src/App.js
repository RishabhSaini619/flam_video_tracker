import React, { useState } from 'react';

function App() {
  const [videoURL, setVideoURL] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const videoURL = URL.createObjectURL(file);
    setVideoURL(videoURL);
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {videoURL && (
        <video controls>
          <source src={videoURL} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

export default App;
