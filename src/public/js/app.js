const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Server connected ✅");
});

socket.addEventListener("message", (message) => {
  console.log("Received: ", message.data);
});

socket.addEventListener("close", () => {
  console.log("Server disconnected ❌");
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
});
