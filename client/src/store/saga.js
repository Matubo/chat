import { select, put, takeLatest, takeEvery } from "@redux-saga/core/effects";
import { send_message, change_username } from "../hooks/connectToChat";

const currentRoomsState = (store) => store.rooms;
const currentRoomState = (store) => store.room;
const currentRoomIDState = (store) => store.roomID;

function* changeName(username) {
  console.log(username);
  change_username(username);
  yield put({ type: "setNewUsername", username: username });
}

function* setNewMessages(action) {
  let room = action.room;
  let rooms = yield select(currentRoomsState);
  let currentRoom = yield select(currentRoomState);
  let roomID = yield select(currentRoomIDState);
  console.log(room);
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].number == room.number) {
      rooms[i].messages = room.messages;
      yield put({ type: "setNewRooms", rooms: rooms });
      if (currentRoom == room.number) {
        yield put({ type: "setNewMessages", messages: room.messages });
      }
      /*       if (room == roomID) {
        yield put({ type: "setNewMessages", messages: messages });
      } */
    }
  }
}

function* setNewRooms(action) {
  let room = action.room;
  console.log(room);
  let r = yield select(currentRoomsState);
  let rooms = r.slice();
  rooms.push({ number: room.number, messages: room.messages });
  yield put({ type: "setNewRooms", rooms: rooms });
}

function* sendMessage(message) {
  let room = yield select(currentRoomState);
  console.log(room, message);
  send_message(room, message);
}

function* setRoom(room) {
  //роботает на объектах вида rooms
  let i = room.roomID;
  console.log(room);
  let rooms = yield select(currentRoomsState);
  console.log(rooms[i]);
  yield put({
    type: "setCurrentRoom",
    room: rooms[i].number,
    messages: rooms[i].messages,
    roomID: i,
  });
}

function* chatSaga(action) {
  yield takeLatest("setUsername", changeName);
  yield takeLatest("sendMessage", sendMessage);
  yield takeEvery("setMessages", setNewMessages);
  yield takeLatest("setNewRoom", setNewRooms);
  yield takeLatest("setRoom", setRoom);
}

export default chatSaga;
