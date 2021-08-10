import io from "socket.io-client";
import store from "../store/store";

const SERVER_URL = "http://localhost:3001";
const socket = io(SERVER_URL);

const send_message_query = function (room, username, message) {
  socket.emit("message_to_room", room, username, message);
};

const change_username_query = function (username) {
  socket.emit("change_username", username);
};

const join_to_room_query = function (roomNumber) {
  socket.emit("join_to_room", roomNumber);
};

socket.on("accept_change_username", (username) => {
  store.dispatch({ type: "accept_change_username", username: username });
});

socket.on("new_message_on_room", (room) => {
  store.dispatch({ type: "new_message_on_room", room: room });
});

socket.on("accept_join_to_room", (room) => {
  store.dispatch({
    type: "accept_join_to_room",
    room: room,
  });
});

export { send_message_query, change_username_query, join_to_room_query };
