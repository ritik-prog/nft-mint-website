import React from "react";
import { BeatLoader } from "react-spinners";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <BeatLoader color="#36d7b7" />
    </div>
  );
};

export default Loading;
