import io from "socket.io-client";

const ENDPOINT = "localhost:5000";

const socket = io(ENDPOINT);

socket.on("connect", () => {
  console.log("Connected to Server");
  socket.on("hello", (message) => {
    console.log("socket.on('hello'):", message);
  });
});

export default socket;
