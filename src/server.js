import http from "http";
// import WebSocket from "ws";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import express from "express";
import { createSocket } from "dgram";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
// enable catchall url:
app.get("/*", (req, res) => res.redirect("/"));

const serverListener = () => console.log("Listening on http://localhost:3000");

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

/**
 * Using SocketIO & WebRTC
 */

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (roomname, callback) => {
    socket.join(roomname);
    callback();
    socket.to(roomname).emit("welcome");
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

httpServer.listen(3000, serverListener);
