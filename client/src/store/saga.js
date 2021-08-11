import { select, put, takeLatest } from "@redux-saga/core/effects";
import {
  send_message_query,
  change_username_query,
  join_to_room_query,
} from "../query/chatQuery";

const currentRoomsState = (store) => store.rooms;
const currentRoomState = (store) => store.room;
const currentRoomIDState = (store) => store.roomID;
//обработчик запроса на изменение имени пользователя
function change_username(username) {
  change_username_query(username);
}
//обработчик подтверждения смены имени пользователя
function* accept_change_username(data) {
  let username = data.username;
  yield put({ type: "set_username", username: username, authorized: true });
}
//обработчик запроса на присоединение к комнате
function join_to_room(data) {
  let roomNumber = data.roomNumber;
  join_to_room_query(roomNumber);
}
//обработчик подтверждения подключения к комнате
function* accept_join_to_room(data) {
  const { room } = data;
  let currentRooms = yield select(currentRoomsState);
  let inStore = currentRooms.find((item) => item.number == room.number);
  if (inStore == undefined) {
    currentRooms.push(room);
    let newRoomsArray = currentRooms.slice(0);
    yield put({ type: "set_new_rooms", rooms: newRoomsArray });
    let currentRoomID = yield select(currentRoomIDState);
    if (currentRoomID == null) {
      yield put({ type: "set_room", roomID: 0 });
    }
  }
}
//обработчик переключения комнаты
function* set_room(data) {
  const { roomID } = data;
  let currentRoomID = yield select(currentRoomIDState);
  if (currentRoomID != roomID) {
    let currentRooms = yield select(currentRoomsState);
    let targetRoom = currentRooms[roomID];
    yield put({
      type: "set_main_data",
      roomID: roomID,
      messages: targetRoom.messages,
      room: targetRoom.number,
    });
  }
}
//обработчик прихода новых сообщений
function* new_message_on_room(data) {
  let room = data.room;
  let rooms = yield select(currentRoomsState);
  let currentRoom = yield select(currentRoomState);
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].number == room.number) {
      rooms[i].messages = room.messages;
      yield put({ type: "set_new_rooms", rooms: rooms });
      if (currentRoom == room.number) {
        yield put({ type: "set_messages", messages: room.messages });
      }
    }
  }
}
//обработчик отправки сообщения
function* send_message(data) {
  let message = data.message;
  let room = yield select(currentRoomState);
  send_message_query(room, message);
}
//обработчик запроса новой комнаты
function get_new_room() {
  join_to_room_query();
}

function* chatSaga(action) {
  yield takeLatest("change_username", change_username);
  yield takeLatest("accept_change_username", accept_change_username);
  yield takeLatest("join_to_room", join_to_room);
  yield takeLatest("accept_join_to_room", accept_join_to_room);
  yield takeLatest("set_room", set_room);
  yield takeLatest("send_message", send_message);
  yield takeLatest("new_message_on_room", new_message_on_room);
  yield takeLatest("get_new_room", get_new_room);
}

export default chatSaga;
