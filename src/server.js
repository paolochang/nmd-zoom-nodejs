import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
// enable catchall url:
app.get("/*", (req, res) => res.redirect("/"));

const serverListener = () => console.log("Listening on http://localhost:3000");

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anonymous";
  console.log("Connected to Browser ✅");
  socket.addEventListener("close", () => {
    console.log("Client disconnected ❌");
  });
  socket.on("message", (incoming) => {
    const message = JSON.parse(incoming);
    switch (message.type) {
      case "nickname":
        socket["nickname"] = message.payload;
        break;
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${message.payload}`)
        );
        break;
    }
  });
});

server.listen(3000, serverListener);
