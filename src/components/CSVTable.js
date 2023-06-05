import React from "react";

function CSVTable({ timestamps , startTimestamp , inputVideoRef}) {
  console.log(timestamps);
  return (
    <div className="csv-table-container">
      {inputVideoRef?.current && (
        <table className="table-frame">
          <thead>
            <tr>
              <th>S No.</th>
              <th>Start Time</th>
              <th>Stop Time</th>
            </tr>
          </thead>
          <tbody>
          {startTimestamp && (
              <tr>
                <td>{timestamps.length + 1}</td>
                <td>{startTimestamp}</td>
                <td></td>
              </tr>
            )}
            {timestamps.map((timestamp, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{timestamp.start}</td>
                <td>{timestamp.stop}</td>
              </tr>
            )).slice().reverse()}
            
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CSVTable;
