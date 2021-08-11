import io from "socket.io-client";
import store from "../store/store";

const SERVER_URL = "http://localhost:3001";
const socket = io(SERVER_URL);

const send_message_query = function (room, message) {
  //отправка нового сообщения
  socket.emit("message_to_room", room, message);
};

const change_username_query = function (username) {
  //запрос установки имени пользователя
  socket.emit("change_username", username);
};

const join_to_room_query = function (roomNumber) {
  //запрос на подключение к комнате
  socket.emit("join_to_room", roomNumber);
};

socket.on("accept_change_username", (username) => {
  //подтверждение установки имени пользователя
  store.dispatch({ type: "accept_change_username", username: username });
});

socket.on("new_message_on_room", (room) => {
  //сообщение о новом сообщении в комнате
  store.dispatch({ type: "new_message_on_room", room: room });
});

socket.on("accept_join_to_room", (room) => {
  //подтверждение подключения к комнате
  store.dispatch({
    type: "accept_join_to_room",
    room: room,
  });
});

export { send_message_query, change_username_query, join_to_room_query };
