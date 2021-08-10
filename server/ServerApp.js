const { getRoom, getGuestRoom, addMessageToRoom } = require("./handlers/getRoomHandlers");

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

io.on("connection", (socket) => {

  const send_message = function (targetRoom) {
    io.to(targetRoom).emit("newMessages", targetRoom);
  };


  socket.on("change_username", (data) => {
    let username=data.username;
    let guestRoom=getGuestRoom();
    console.log('username '+ username)
    socket.username = username;
    socket.emit('accept_change_username',socket.username);
    socket.join(guestRoom);
    socket.emit("accept_join_to_room", guestRoom);
    let room2=getRoom();
    socket.join(room2);
    socket.emit("accept_join_to_room", room2);
  });

  socket.on('message_to_room',(room,username,message)=>{
    let result=addMessageToRoom(room,username,message);
    if(result.status==true){
      console.log(roomNumber,message)
/*       io.to(result.room).emit('new_message_on_room',roomNumber,message) */
    }
  })

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
