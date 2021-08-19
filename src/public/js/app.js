/**
 * Using SocketIO
 */
const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
room.hidden = true;

let roomName;

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;

  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;

  const form = room.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector("input");
    let message = input.value;
    socket.emit("new_message", roomName, message, () => {
      addMessage(`You: ${message}`);
    });
    input.value = "";
  });
}

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = form.querySelector("input");
  /**
   * 1. Can emit any event
   * 2. Can pass unlimited arguments to the backend in any DataType
   * 3. Can define callback function (MUST BE THE LAST ARGUMENT)
   */
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
});

socket.on("welcome", () => addMessage("Someone joined!"));
socket.on("left_room", () => addMessage("Someone left."));
socket.on("new_message", addMessage);

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
