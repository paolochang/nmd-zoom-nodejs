import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import socket from "../../socket";
import "./Join.css";

const Join: React.FC = () => {
  const history = useHistory();
  const nameRef = useRef<HTMLInputElement>(null);
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const onClickHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    socket.emit("join", { room, name }, (obj: any) => {
      // console.log("obj:", obj);
      if (obj.name && obj.room) {
        nameRef.current!.style.border = "none";
        history.push(`/chat?name=${obj.name}&room=${obj.room}`);
      } else {
        // console.log(nameRef.current);
        // console.log("Error from Server:", obj);
        nameRef.current!.style.border = "2px solid tomato";
        setError(obj);
      }
    });
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Zoom</h1>
        <div>
          <input
            ref={nameRef}
            type="text"
            className="joinInput"
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
            required
          />
          {error && <div className="error">{error}</div>}
        </div>
        <div>
          <input
            type="text"
            className="joinInput mt-20"
            placeholder="Room"
            onChange={(event) => setRoom(event.target.value)}
            required
          />
        </div>
        <button type="submit" className="button mt-20" onClick={onClickHandler}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Join;
