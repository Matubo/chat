const {
  getRoom,
  getGuestRoom,
  addMessageToRoom,
} = require("./handlers/roomManipulationHandlers");

const express = require("express");
const path = require("path");

const chatApp = express();
const port = 3001; //CRA на 3000
const buildPath = path.join(__dirname, "../client/build"); //!Забираю сразу build версию из директории CRA */

chatApp.use(express.static(buildPath)); //!Путь к статике ^

//!Отдаю статику
chatApp.get("/", (req, res) => {
  res.send(buildPath);
});

//!В консоли будет видно что сервер поднялся
server = chatApp.listen(port, () => {
  console.log(`listen ${port}`);
});

//!Отключен cors для междоменных запросов
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  //запрос на изменение(установку) имени пользователя
  socket.on("change_username", (data) => {
    const { username } = data;
    if (username != "") {
      let guestRoom = getGuestRoom();
      socket.username = username;
      socket.emit("accept_change_username", socket.username); //подтверждение установки юзернейма
      socket.join(guestRoom); //подключение
      socket.emit("accept_join_to_room", guestRoom); //подключение к гостевой комнате
    }
  });

  //новое сообщение в комнате
  socket.on("message_to_room", (room, message) => {
    let result = addMessageToRoom(room, socket.username, message);
    if (result.status == true) {
      //если успешно (комната существует) выслать обновленные данные
      io.to(result.room).emit("new_message_on_room", result.room);
    }
  });

  //запрос на подключение к комнате
  socket.on("join_to_room", (room) => {
    let result = room == null ? getRoom() : getRoom(room);
    if (result.status == true) {
      //если успешно отправляем комнату
      socket.join(result.room);
      socket.emit("accept_join_to_room", result.room);
    }
  });
});
