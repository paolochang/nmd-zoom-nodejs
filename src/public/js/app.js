/**
 * Using SocketIO
 */
const socket = io();

const myVideo = document.getElementById("myVideo");
const muteButton = document.getElementById("muteButton");
const cameraButton = document.getElementById("cameraButton");

let myStream;
let muted = false;
let cameraOff = false;

async function getMedia() {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    console.log(myStream);
    myVideo.srcObject = myStream;
  } catch (err) {
    console.log(err);
  }
}

getMedia();

function handleMuteClick() {
  if (muted) {
    muteButton.innerText = "Mute";
    muted = false;
  } else {
    muteButton.innerText = "Unmute";
    muted = true;
  }
}
function handleCameraClick() {
  if (cameraOff) {
    cameraButton.innerText = "Camera Off";
    cameraOff = false;
  } else {
    cameraButton.innerText = "Camera On";
    cameraOff = true;
  }
}

muteButton.addEventListener("click", handleMuteClick);
cameraButton.addEventListener("click", handleCameraClick);

/**
 *  Chat using SocketIO
 *
 * const home = document.getElementById("home");
 * const form = home.querySelector("form");
 * const room = document.getElementById("room");
 * room.hidden = true;
 *
 * let roomname, username;
 *
 * function handleMessageSubmit(event) {
 *   event.preventDefault();
 *   const input = room.querySelector("#message input");
 *   let message = input.value;
 *   socket.emit("new_message", roomname, message, () => {
 *     addMessage(`${username}: ${message}`);
 *   });
 *   input.value = "";
 * }
 *
 * function showRooms(rooms) {
 *   const roomList = home.querySelector("ul");
 *   roomList.innerHTML = "";
 *   if (rooms.length === 0) return;
 *   rooms.forEach((room) => {
 *     const li = document.createElement("li");
 *     li.innerText = room;
 *     roomList.appendChild(li);
 *   });
 * }
 *
 * function updateRoomHeader(count) {
 *   const h3 = room.querySelector("h3");
 *   h3.innerText = `Room ${roomname} (${count})`;
 * }
 *
 * function enterRoom(count) {
 *   home.hidden = true;
 *   room.hidden = false;
 *   updateRoomHeader(count);
 *   const messageForm = room.querySelector("#message");
 *   messageForm.addEventListener("submit", handleMessageSubmit);
 * }
 *
 * function addMessage(message) {
 *   const ul = room.querySelector("ul");
 *   const li = document.createElement("li");
 *   li.innerText = message;
 *   ul.appendChild(li);
 * }
 *
 * function handleRoomSubmit(event) {
 *   event.preventDefault();
 *   const roomInput = form.querySelector("#home input#roomname");
 *   const nickInput = form.querySelector("#home input#nickname");
 *
 *   // 1. Can emit any event
 *   // 2. Can pass unlimited arguments to the backend in any DataType
 *   // 3. Can define callback function (MUST BE THE LAST ARGUMENT)
 *
 *   socket.emit("enter_room", roomInput.value, nickInput.value, enterRoom);
 *   roomname = roomInput.value;
 *   username = nickInput.value;
 *   roomInput.value = "";
 *   nickInput.value = "";
 * }
 *
 * form.addEventListener("submit", handleRoomSubmit);
 *
 * socket.on("welcome_message", (user, count) => {
 *   updateRoomHeader(count);
 *   addMessage(`${user} joined!`);
 * });
 *
 * socket.on("leaving_room", (user, count) => {
 *   updateRoomHeader(count);
 *   addMessage(`${user} left.`);
 * });
 *
 * socket.on("new_message", addMessage);
 * socket.on("show_open_rooms", showRooms);
 */

/**
 * Chat using WebSocket
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
