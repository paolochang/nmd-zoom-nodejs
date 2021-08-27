import http from "http";
// import WebSocket from "ws";
import socketio, { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import express from "express";
import router from "./router";

const {
  addUser,
  removeUser,
  getUser,
  getNumUsersInRoom,
} = require("./users.js");

const PORT = process.env.PORT || 5000;

const app = express();

// app.set("view engine", "pug");
// app.set("views", __dirname + "/views");
// app.use("/public", express.static(__dirname + "/public"));
// app.get("/", (req, res) => res.render("home"));
// // enable catchall url:
// app.get("/*", (req, res) => res.redirect("/"));

app.use(router);

const serverListener = () =>
  console.log(`Listening on http://localhost:${PORT}`);

const httpServer = http.createServer(app);
// const wsServer = new Server(httpServer);
const io = socketio(httpServer);

/**
 * Using SocketIO & WebRTC
 */

io.on("connection", (socket) => {
  console.log("We have new connection");

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);
    socket.join(user.room);
    socket.in(user.room).emit("room_data", {
      room: user.room,
      users: getNumUsersInRoom(user.room),
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "notice",
      text: `${user.name} has joined!`,
    });
    callback(user);
  });

  socket.on("welcome", (room, callback) => callback(room));

  socket.on("message", (name, message, callback) => {
    const user = getUser(name);
    socket.to(user.room).emit("message", { user: user.name, text: message });
    callback();
  });

  socket.on("leave", (name, room) => {
    removeUser(socket.id);
    socket.to(room).emit("message", {
      user: "notice",
      text: `${name} left the ${room}`,
    });
    socket.to(room).emit("leave", getNumUsersInRoom(room));
    socket.leave(room);
  });

  socket.on("enter_room", (roomname) => {
    socket.join(roomname);
    socket.to(roomname).emit("welcome");
  });
  socket.on("offer", (roomname, offer) => {
    socket.to(roomname).emit("offer", offer);
  });
  socket.on("answer", (roomname, answer) => {
    socket.to(roomname).emit("answer", answer);
  });
  socket.on("ice_candidate", (roomname, iceCandidate) => {
    socket.to(roomname).emit("ice_candidate", iceCandidate);
  });

  socket.on("disconnect", () => {
    console.log("Connection disconnected");
  });
});

/**
 * Using SocketIO
 *
 * function findPublicRooms() {
 *   const { sids, rooms } = wsServer.sockets.adapter;
 *   const publicRooms = [];
 *   rooms.forEach((_, key) => {
 *     if (sids.get(key) === undefined) publicRooms.push(key);
 *   });
 *   return publicRooms;
 * }
 *
 * function countMembers(roomname) {
 *   return wsServer.sockets.adapter.rooms.get(roomname)?.size;
 * }
 *
 * wsServer.on("connection", (socket) => {
 *   // Entering a room
 *   socket.on("enter_room", (roomname, nickname, callback) => {
 *     socket["nickname"] = nickname;
 *     socket.join(roomname);
 *     callback(countMembers(roomname));
 *
 *     // Send welcome message to other browsers
 *     socket
 *       .to(roomname)
 *       .emit("welcome_message", nickname, countMembers(roomname));
 *
 *     // Update the total number of public rooms to the other browsers
 *     wsServer.sockets.emit("show_open_rooms", findPublicRooms());
 *   });
 *
 *   // Before chatroom disconnected
 *   socket.on("disconnecting", () => {
 *     socket.rooms.forEach((roomname) => {
 *       socket
 *         .to(roomname)
 *         .emit("leaving_room", socket.nickname, countMembers(roomname) - 1);
 *     });
 *   });
 *
 *   // Chatroom disconnected
 *   socket.on("disconnect", () => {
 *     wsServer.sockets.emit("show_open_rooms", findPublicRooms());
 *   });
 *
 *   // Send new_message
 *   socket.on("new_message", (room, message, callback) => {
 *     socket.to(room).emit("new_message", `${socket.nickname}: ${message}`);
 *     callback();
 *   });
 * });
 */

/**
 * Using WebSocket
 *
 * const wss = new WebSocket.Server({ server });
 * const sockets = [];
 *
 * wss.on("connection", (socket) => {
 *   sockets.push(socket);
 *   socket["nickname"] = "Anonymous";
 *   console.log("Connected to Browser ✅");
 *   socket.addEventListener("close", () => {
 *     console.log("Client disconnected ❌");
 *   });
 *   socket.on("message", (incoming) => {
 *     const message = JSON.parse(incoming);
 *     switch (message.type) {
 *       case "nickname":
 *         socket["nickname"] = message.payload;
 *         break;
 *       case "new_message":
 *         sockets.forEach((aSocket) =>
 *           aSocket.send(`${socket.nickname}: ${message.payload}`)
 *         );
 *         break;
 *     }
 *   });
 * });
 */

httpServer.listen(PORT, serverListener);
