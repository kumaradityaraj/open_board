const express = require("express");
const socket = require("socket.io");

let port = process.env.PORT || 5000;
const app = express();

app.use(express.static("public"));

app.use(require("cors")());

let server = app.listen(port, () => {
  console.log("Listening to port " + port);
});

let io = socket(server);
io.on("connection", (socket) => {
  // cors: {
  //   origin: "http://localhost:4200";
  //   methods: ["GET", "POST"];
  // }
  console.log("made socket connection");
  socket.on("beginPath", (data) => {
    io.sockets.emit("beginPath", data);
  });
  socket.on("drawStroke", (data) => {
    io.sockets.emit("drawStroke", data);
  });
  socket.on("redoUndo", (data) => {
    io.sockets.emit("redoUndo", data);
  });
});
