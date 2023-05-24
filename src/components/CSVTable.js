import React from "react";
import { Table } from "react-bootstrap";

function CSVTable({ timestamps }) {
  return (
    <div className="card-table">
      <Table>
        {timestamps.length >= 1 && (
          <thead
            style={{
              backgroundColor: "lightgrey",
              color: "blue",
              borderStyle: "soild",
              borderColor: "black",
            }}
          >
            <tr>
              <th>S No.</th>
              <th>Start Time</th>
              <th>Stop Time</th>
            </tr>
          </thead>
        )}

        <tbody
          className="table-group-divider"
          style={{
            backgroundColor: "white",
            color: "black",
            borderStyle: "solid",
            borderColor: "black",
          }}
        >
          {timestamps.map((timestamp, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{timestamp.start}</td>
              <td>{timestamp.stop}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CSVTable;
