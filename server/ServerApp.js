const {
  getRoom,
  getGuestRoom,
  addMessageToRoom,
} = require("./handlers/roomManipulationHandlers");

const express = require("express");
const path = require("path");

const app = express();
const port = 3001; //CRA на 3000
const buildPath = path.join(__dirname, "../client/build"); //!Забираю сразу build версию из директории CRA */
const rootPath = path.join(__dirname);

app.use(express.static(buildPath));
app.get("/", (req, res) => {
  res.send(buildPath);
});

server = app.listen(port, () => {
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("change_username", (data) => {
    let username = data.username;
    let guestRoom = getGuestRoom();
    socket.username = username;
    socket.emit("accept_change_username", socket.username);
    socket.join(guestRoom);
    socket.emit("accept_join_to_room", guestRoom);
  });

  socket.on("message_to_room", (room, username, message) => {
    let result = addMessageToRoom(room, username, message);
    if (result.status == true) {
      io.to(result.room).emit("new_message_on_room", result.room);
    }
  });

  socket.on("join_to_room", (room) => {
    let result;
    if (room == null) {
      result = getRoom();
    } else {
      result = getRoom(room);
    }
    if (result.status == true) {
      socket.join(result.room);
      socket.emit("accept_join_to_room", result.room);
    }
  });
});
