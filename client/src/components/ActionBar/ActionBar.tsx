import React, { useState } from "react";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import { IoVideocam, IoVideocamOff } from "react-icons/io5";
import "./ActionBar.css";

const ActionBar: React.FC = () => {
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isMute, setIsMute] = useState(false);

  const onClickCamera = () => {
    setIsCameraOff((prev) => !prev);
  };

  const onClickSpeaker = () => {
    setIsMute((prev) => !prev);
  };

  return (
    <div className="action-container">
      {isCameraOff ? (
        <button className="action-button" onClick={onClickCamera}>
          <IoVideocam className="react-icon" size="2.2em" />
        </button>
      ) : (
        <button className="action-button" onClick={onClickCamera}>
          <IoVideocamOff className="react-icon" size="2.2em" />
        </button>
      )}
      {isMute ? (
        <button className="action-button" onClick={onClickSpeaker}>
          <GiSpeaker className="react-icon" size="2.5em" />
        </button>
      ) : (
        <button className="action-button" onClick={onClickSpeaker}>
          <GiSpeakerOff className="react-icon" size="2.5em" />
        </button>
      )}
    </div>
  );
};

export default ActionBar;
