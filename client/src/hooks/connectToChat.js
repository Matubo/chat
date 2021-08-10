import io from "socket.io-client";
import store from "../store/store";

const SERVER_URL = "http://localhost:3001";
const socket = io(SERVER_URL);
/* function connect(name = "default") {
  console.log(name);
  const socket = io(SERVER_URL);
  socket.emit("message", name);
  socket.on("messageR", (mes) => {
    console.log(mes);
  });
} */

const send_message = function (room, message) {
  socket.emit("send_message", room, message);
};

const change_username = function (username) {
  socket.emit("change_username", username);
};

const join_to_room = function (room) {
  socket.emit("join_to_room", room);
};

socket.on("newMessages", (room) => {
  console.log("newMessages");
  store.dispatch({ type: "setMessages", room: room });
});

socket.on("change_room", (room) => {
  console.log("change_room");
  store.dispatch({ action: "setRoom", room: room });
});

socket.on("join_to_room", (room) => {
  console.log("join_to_room");
  store.dispatch({ type: "setNewRoom", room: room });
});

export { send_message, change_username };
