import React from "react";
import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";
import socket from "../../socket";
import "./InfoBar.css";
import { useHistory } from "react-router-dom";

interface IInfoBar {
  room: string;
  count: number;
}

const InfoBar: React.FC<IInfoBar> = ({ room, count }) => {
  const history = useHistory();

  const onCloseHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    socket.emit("before_disconnect", socket.id);
    history.push("/");
  };

  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
        <h3>
          {room}
          <span className="memberCounts">({count})</span>
        </h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/" onClick={onCloseHandler}>
          <img src={closeIcon} alt="close icon" />
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
