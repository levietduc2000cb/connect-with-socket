const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Socket onnected");
  socket.on("send-message", (msg) => {
    console.log(msg);
    socket.emit("send-client", msg);
  });
  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
});

server.listen(3000, () => {
  console.log("Listening on :3000");
});
