import React from "react";
import "./Video.css";

interface IVideo {
  isVideoOn: boolean;
  isVolumeOn: boolean;
}

const Video: React.FC<IVideo> = ({ isVideoOn, isVolumeOn }) => {
  return (
    <div className="container">
      {isVideoOn ? "ON" : "OFF"} {isVolumeOn ? "ON" : "OFF"}
      <video className="video" />
    </div>
  );
};

export default Video;
