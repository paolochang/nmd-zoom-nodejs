/**
 * Using SocketIO
 */
const socket = io();

const home = document.getElementById("home");
const form = home.querySelector("form");
const room = document.getElementById("room");
room.hidden = true;

let roomName, userName;

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#message input");
  let message = input.value;
  socket.emit("new_message", roomName, message, () => {
    addMessage(`${userName}: ${message}`);
  });
  input.value = "";
}

function showRooms(rooms) {
  const roomList = home.querySelector("ul");
  roomList.innerHTML = "";
  if (rooms.length === 0) return;
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.appendChild(li);
  });
}

function enterRoom(count) {
  home.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${count})`;
  const messageForm = room.querySelector("#message");
  messageForm.addEventListener("submit", handleMessageSubmit);
}

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const roomInput = form.querySelector("#home input#roomName");
  const nickInput = form.querySelector("#home input#nickName");
  /**
   * 1. Can emit any event
   * 2. Can pass unlimited arguments to the backend in any DataType
   * 3. Can define callback function (MUST BE THE LAST ARGUMENT)
   */
  socket.emit("enter_room", roomInput.value, nickInput.value, enterRoom);
  roomName = roomInput.value;
  userName = nickInput.value;
  roomInput.value = "";
  nickInput.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome_message", (user, count) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${count})`;
  addMessage(`${user} joined!`);
});

socket.on("leaving_room", (user, count) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${count})`;
  addMessage(`${user} left.`);
});

socket.on("new_message", addMessage);
socket.on("show_open_rooms", showRooms);

/**
 * Using WebSocket
 *
 * const messageList = document.querySelector("ul");
 * const nicknameForm = document.querySelector("#nickname");
 * const messageForm = document.querySelector("#message");
 *
 * const socket = new WebSocket(`ws://${window.location.host}`);
 *
 * function makeMessage(type, payload) {
 *   const message = { type, payload };
 *   return JSON.stringify(message);
 * }
 *
 * socket.addEventListener("open", () => {
 *   console.log("Server connected ✅");
 * });
 *
 * socket.addEventListener("message", (message) => {
 *   const li = document.createElement("li");
 *   li.innerText = message.data;
 *   messageList.append(li);
 * });
 *
 * socket.addEventListener("close", () => {
 *   console.log("Server disconnected ❌");
 * });
 *
 * nicknameForm.addEventListener("submit", (event) => {
 *   event.preventDefault();
 *   const input = nicknameForm.querySelector("input");
 *   socket.send(makeMessage("nickname", input.value));
 *   input.value = "";
 * });
 *
 * messageForm.addEventListener("submit", (event) => {
 *   event.preventDefault();
 *   const input = messageForm.querySelector("input");
 *   socket.send(makeMessage("new_message", input.value));
 *   input.value = "";
 * });
 */
