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

setTimeout(() => socket.send("Message from the browser "), 10000);
