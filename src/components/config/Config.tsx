import React from "react";

export const Config = ({ filteredData }: any) => {
  return (
    <div className="BoxContainer">
      <div className="box">
        <h1>EDIT DATA FILE PROPERLY</h1>
        <p>Before using the application</p>
        <pre className="code-highlight">
          <code>source/data.json</code>
        </pre>
        <p>Enter following details in data file</p>
        {filteredData.map(([key, value]: [number, string], index: number) => (
          <>
            <code key={index}>{key}</code>
            <br />
          </>
        ))}
      </div>
    </div>
  );
};
