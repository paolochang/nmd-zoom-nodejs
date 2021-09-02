import React, { useState } from "react";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import { IoVideocam, IoVideocamOff } from "react-icons/io5";
import "./ActionBar.css";

interface IActionBar {
  isVideoOn: boolean;
  setIsVideoOn: any;
  isVolumeOn: boolean;
  setIsVolumOn: any;
}

const ActionBar: React.FC<IActionBar> = ({
  isVideoOn,
  setIsVideoOn,
  isVolumeOn,
  setIsVolumOn,
}) => {
  const onClickCamera = () => {
    setIsVideoOn((prev: boolean) => !prev);
  };

  const onClickSpeaker = () => {
    setIsVolumOn((prev: boolean) => !prev);
  };

  return (
    <div className="action-container">
      {isVideoOn ? (
        <button className="action-button" onClick={onClickCamera}>
          <IoVideocam className="react-icon" color="limegreen" size="2.2em" />
        </button>
      ) : (
        <button className="action-button" onClick={onClickCamera}>
          <IoVideocamOff className="react-icon" color="tomato" size="2.2em" />
        </button>
      )}
      {isVolumeOn ? (
        <button className="action-button" onClick={onClickSpeaker}>
          <GiSpeaker className="react-icon" color="limegreen" size="2.5em" />
        </button>
      ) : (
        <button className="action-button" onClick={onClickSpeaker}>
          <GiSpeakerOff className="react-icon" color="tomato" size="2.5em" />
        </button>
      )}
    </div>
  );
};

export default ActionBar;
