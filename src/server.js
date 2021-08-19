import http from "http";
// import WebSocket from "ws";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
// enable catchall url:
app.get("/*", (req, res) => res.redirect("/"));

const serverListener = () => console.log("Listening on http://localhost:3000");

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

/**
 * Using SocketIO
 */
wsServer.on("connection", (socket) => {
  socket.on("enter_room", (room, callback) => {
    socket.join(room);
    callback();
    socket.to(room).emit("welcome");
  });
  socket.on("new_message", (room, message, callback) => {
    socket.to(room).emit("new_message", message);
    callback();
  });
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit("left_room");
    });
  });
});

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
