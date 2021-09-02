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
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isVolumeOn, setIsVolumOn] = useState(false);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setRoom(room);
    setName(name);
  }, [location.search]);

  useEffect(() => {
    socket.on("room_data", (room) => {
      setCount(room.users);
    });
  }, [count]);

  return (
    <div className="container">
      <InfoBar name={name} room={room} count={count} setCount={setCount} />
      <div className="content">
        <Video isVideoOn={isVideoOn} isVolumeOn={isVolumeOn} />
        <Chat room={room} name={name} />
        <ActionBar
          isVideoOn={isVideoOn}
          setIsVideoOn={setIsVideoOn}
          isVolumeOn={isVolumeOn}
          setIsVolumOn={setIsVolumOn}
        />
      </div>
    </div>
  );
};

export default Room;
