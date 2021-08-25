import React, { useState, useEffect } from "react";
import queryString from "query-string";
import InfoBar from "../InfoBar/InfoBar";
import Chat from "../Chat/Chat";
import Video from "../Video/Video";
import "./Room.css";
import ActionBar from "../ActionBar/ActionBar";
import socket from "../../socket";

interface IRoom {
  location: string;
}

const Room: React.FC<IRoom> = ({ location }) => {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [count, setCount] = useState(1);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setRoom(room);
    setName(name);
  }, [location.search]);

  useEffect(() => {
    socket.on("count", (numMember) => {
      console.log(numMember);
      setCount(numMember.length);
    });
  }, [count]);

  return (
    <div className="container">
      <InfoBar room={room} count={count} />
      <div className="content">
        <Video />
        <Chat room={room} name={name} />
        <ActionBar />
      </div>
    </div>
  );
};

export default Room;
