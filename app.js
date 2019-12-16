const express = require("express");
const socketIO = require("socket.io");

const PORT = process.env.PORT || 3000;

const server = express()
  .use((req, res) => res.sendFile(`${__dirname}/strim.html`))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on("connection", socket => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

io.on("cameraFrame", data => {
  console.log(data);
});

setInterval(() => io.emit("time", new Date().toTimeString()), 1000);
