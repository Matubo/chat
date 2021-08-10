import { select, put, takeLatest, takeEvery } from "@redux-saga/core/effects";
import { send_message_query, change_username_query,join_to_room_query } from "../hooks/connectToChat";

const currentRoomsState = (store) => store.rooms;
const currentRoomState = (store) => store.room;
const currentRoomIDState = (store) => store.roomID;
const currentUsername = (store)=>store.username

function change_username(username) {
  console.log(username);
  change_username_query(username);
}

function* accept_change_username(data){
  let username=data.username;
  yield put({ type: "set_username", username: username });
}

function join_to_room(roomNumber){
  if(typeof roomNumber == Number){
  join_to_room_query(roomNumber);
}
}

function* accept_join_to_room(data){
  let room=data.room;
  console.log(room);
let currentRooms=yield select(currentRoomsState);
console.log(currentRooms)
currentRooms.push(room);
let newRoomsArray=currentRooms.slice(0);
console.log(newRoomsArray)
yield put({type:'set_new_rooms',rooms:newRoomsArray});
let currentRoomID=yield select(currentRoomIDState);
if(currentRoomID==null){
yield put({type:'set_room',roomID:0})
}
}

function* set_room(data){
  let roomID=data.roomID;
  let currentRoomID=yield select(currentRoomIDState);
  if(currentRoomID!=roomID){
  console.log(roomID)
let currentRoomID = yield select(currentRoomIDState);
if(roomID!=currentRoomID){
  let currentRooms=yield select(currentRoomsState);
  console.log(currentRooms)
  let targetRoom=currentRooms[roomID];
  console.log(targetRoom)
  yield put({type:"set_current_base_state", roomID:roomID, messages:targetRoom.messages,room:targetRoom.number});
}
  }
}

function* set_new_messages(action) {
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

function* send_message(data) {
  console.log(data)
  let message=data.message;
  let room = yield select(currentRoomState);
  let username = yield select(currentUsername)
  console.log(room,username, message);
  send_message_query(room,username, message);
}

function* chatSaga(action) {
  yield takeLatest("change_username", change_username);
  yield takeLatest("accept_change_username",accept_change_username);
  yield takeLatest("join_to_room", join_to_room);
  yield takeLatest("accept_join_to_room", accept_join_to_room);
  yield takeLatest('set_room',set_room);
  yield takeLatest("send_message", send_message);
  yield takeEvery("set_new_messages", set_new_messages);
}

export default chatSaga;
