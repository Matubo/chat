const { getRoom, getGuestRoom } = require("./handlers/getRoomHandlers");

const express = require("express");
const path = require("path");

const app = express();
const port = 3001; //CRA на 3000
const buildPath = path.join(__dirname, "../client/build"); //!Забираю сразу build версию из дирректории CRA */
const rootPath = path.join(__dirname);

app.use(express.static(buildPath));
app.get("/", (req, res) => {
  res.send(buildPath);
});

server = app.listen(port, () => {
  console.log(`work on ${port}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

/* io.on("connection", (socket) => {
  socket.username = "Anonymous";
  let room = "room";

  console.log("new user connected");
  socket.on("send_message", function (msg) {
    console.log("message", `${socket.username}:${msg}`);
    let messageDate = new Date();
    if (msg != "") {
      messageArray.push({
        username: socket.username,
        message: msg,
        date: `${messageDate.getDate()}.${messageDate.getMonth()}.${messageDate.getFullYear()} ${messageDate.getHours()}:${messageDate.getMinutes()}`,
      });
    }
    io.to(room).emit("newMessages", messageArray);
  });
  socket.on("change_username", function (name) {
    console.log("username", name);
    socket.username = name;
    socket.join(room);
    io.to(room).emit("newMessages", messageArray);
  });
}); */

function getCurrentDate() {
  let messageDate = new Date();
  return `${messageDate.getDate()}.${messageDate.getMonth()}.${messageDate.getFullYear()} ${messageDate.getHours()}:${messageDate.getMinutes()}`;
}

let guestRoom = getGuestRoom();

io.on("connection", (socket) => {
  /* socket.username = "Anonymous";
  let rooms = [guestRoom];
  console.log(rooms);
  socket.join(rooms[0]);
  socket.emit("accept_join_to_room", rooms[0].number, rooms[0].messages); */
  let rooms = [guestRoom];

  const send_message = function (targetRoom) {
    io.to(targetRoom).emit("newMessages", targetRoom);
  };

  const change_username = function (username) {
    socket.username = username;
    console.log(rooms);
    socket.join(rooms[0]);
    socket.emit("join_to_room", rooms[0]);
  };
  /* room={number,messages,} */
  socket.on("change_username", (username) => {
    change_username(username);
  });

  socket.on("send_message", (room, message) => {
    console.log(room, message);
    if (message != "") {
      for (i = 0; i < rooms.length; i++) {
        if (rooms[i].number == room) {
          let targetRoom = rooms[i];
          console.log(targetRoom);
          targetRoom.messages.push({
            username: socket.username,
            message: message,
            date: getCurrentDate(),
          });
          send_message(targetRoom);
          console.log("message", `${socket.username}:${message}`);
        }
      }
    }
  });

  socket.on("join_to_room", (room) => {
    let targetRoom = getRoom(room);
    if (targetRoom != null) {
      socket.join(targetRoom);
      socket.emit(
        "accept_join_to_room",
        targetRoom.number,
        targetRoom.messages
      );
      /* socket.emit("change_room", targetRoom.number, targetRoom.messages); */
    }
  });
});
