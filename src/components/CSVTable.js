import React from "react";

function CSVTable({ timestamps }) {
  return (
    <div className="csv-table-container">
      <table className="table">
        {timestamps.length >= 1 && (
          <thead>
            <tr>
              <th>S No.</th>
              <th>Start Time</th>
              <th>Stop Time</th>
            </tr>
          </thead>
        )}

        <tbody>
          {timestamps.map((timestamp, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{timestamp.start}</td>
              <td>{timestamp.stop}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CSVTable;
