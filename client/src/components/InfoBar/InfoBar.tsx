import React, { useEffect } from "react";
import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";
import socket from "../../socket";
import "./InfoBar.css";
import { useHistory } from "react-router-dom";

interface IInfoBar {
  name: string;
  room: string;
  count: number;
  setCount: any;
}

const InfoBar: React.FC<IInfoBar> = ({ name, room, count, setCount }) => {
  const history = useHistory();

  useEffect(() => {
    socket.on("leave", (num: number) => {
      console.log("Remaining user:", num);
      setCount(num);
    });
  }, [setCount]);

  const onCloseHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    socket.emit("leave", name, room);
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
