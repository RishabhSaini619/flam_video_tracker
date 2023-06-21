## App.js:

- The main component of the application that manages state and renders other components.
- It imports necessary dependencies and components such as React, useState, saveAs, VideoPlayer, CSVTable, and ControlsHeader.
- It defines state variables such as startTimestamp, stopTimestamp, timestamps, videoFilePath, and csvData using the useState hook.
- It defines playerRef, inputCSVRef, and inputVideoRef using the useRef hook.
- It defines several functions to handle video and CSV uploads, formatting timestamps, handling start and stop button clicks, and downloading timestamps.
- It renders the ControlsHeader component and the container for VideoPlayer and CSVTable components.

## ControlsHeader.js:

- A functional component responsible for rendering the header section of the application with navigation links and buttons.
- It receives several props related to event handlers, timestamps, and input references.
- It renders a navigation bar with a title, buttons for downloading, picking a video or CSV file, and start/stop buttons.

## CSVTable.js:

- A functional component responsible for rendering the table that displays the timestamps.
- It receives timestamps, startTimestamp, and inputVideoRef as props.
- It renders a table with the table header and rows for each timestamp. The startTimestamp is also included if available.

## VideoPlayer.js:

- A functional component responsible for rendering the video player and handling keyboard controls.
- It receives playerRef, videoFilePath, handleStart, and handleStop as props.
- It uses the useRef hook to create a reference to the container element.
- It defines functions to handle keyboard events for play/pause, rewind, and forward actions.
- It renders a container with the ReactPlayer component and applies keyboard event handling to the container.

## App.css:

- A CSS file defining styles for the application components.
- Based on the code review, here is a README file that provides an overview and usage instructions for the application:

# Video Tracker:

`Video Tracker` is a web application that allows you to track and manage timestamps while watching a video. It provides features to upload videos and corresponding CSV files containing start and stop timestamps. You can start, stop, and download the timestamps recorded during video playback.

### Getting Started:

- To get started with the Video Tracker application, follow the steps below:

### Prerequisites:

- ``Node.js`` installed on your machine
- Modern web browser (Chrome, Firefox, Safari, etc.)

### Installation:

- Clone the repository or download the source code.
- Open the project folder in your preferred code editor.

### Running the Application:

- Open a terminal or command prompt in the project folder.
- Install the dependencies by running the following command:

```
npm install 
```

- Once the installation is complete, start the development server:

```
npm start
```

- The application will be accessible at http://localhost:3000 in your web browser.

### Usage:

- ``Pick Video:`` Click the "Pick Video" button to select a video file from your local machine. The selected video will be displayed in the video player.
- ``Pick CSV:`` Click the "Pick CSV" button to select a CSV file containing start and stop timestamps for the video. The timestamps will be displayed in the table on the right side.
- ``Start:`` Press the "Start" button to record the current timestamp as the start time.
- ``Stop:`` Press the "Stop" button to record the current timestamp as the stop time.
- ``Download CSV File:`` Click the "Download Timestamps" button to download the recorded timestamps as a CSV file. The file will be saved to your local machine.
- ``Playback and Tracking:`` Use the video player to watch the video. As you watch, you can press the "Start" button to record the start time of a specific event or moment and press the "Stop" button to record the stop time. The timestamps will be automatically added to the table on the right side.
- ``Modify Timestamps:`` If needed, you can edit or remove timestamps directly in the table. Click on a cell to make changes or use the delete button (X) to remove a timestamp.
- ``Save Updated CSV:`` After modifying the timestamps, you can save the updated CSV file by clicking the "Download Timestamps" button. The modified timestamps will be saved as a CSV file on your local machine.

### Troubleshooting:

- If the video does not play or you encounter any issues with the video player, ensure that the selected video file is in a compatible format (e.g., MP4, WebM) and that your web browser supports video playback.
- If the CSV file does not load or the timestamps are not displayed correctly, make sure that the CSV file is formatted correctly. The CSV file should have two columns: "Start Time" and "Stop Time", with each row representing a timestamp in HH:MM:SS format.

### Limitations:

- The Video Tracker application supports only one video and its corresponding timestamps at a time. If you want to track timestamps for a different video, you need to upload a new video file and CSV file.
- The application currently supports CSV files with start and stop timestamps. It does not support more complex annotations or additional metadata for each timestamp.

### Feedback and Contributions:

- If you have any feedback, suggestions, or would like to contribute to the Video Tracker application, please feel free to open an issue or submit a pull request on the GitHub repository.

- ```
https://github.com/RishabhSaini619/flam_video_tracker/
```

### License:

- The Video Tracker application is under the flying flamingos india pvt ltd License. See the LICENSE file for more details.

- That's it! The README provides an overview of the application, instructions on how to install and run it, and details on how to use its features. It also includes troubleshooting information, limitations, and information on providing feedback and contributing.