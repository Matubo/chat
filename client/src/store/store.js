import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { send_message, change_username } from "../hooks/connectToChat";
import saga from "./saga";

function storeReducer(
  state = {
    username: null,
    rooms: [],
    room: null,
    roomID: null,
    messages: [],
  },
  action
) {
  if (action.type == "sendMessage") {
    return state;
  }
  if (action.type == "setNewMessages") {
    console.log(action.messages);
    return { ...state, messages: action.messages };
  }
  if (action.type == "setNewUsername") {
    return {
      ...state,
      username: action.username,
    };
  }
  if (action.type == "setNewRooms") {
    return {
      ...state,
      rooms: action.rooms,
    };
  }
  if (action.type == "setCurrentRoom") {
    console.log(action);
    return {
      ...state,
      room: action.room,
      messages: action.messages,
      roomID: action.roomID,
    };
  }

  return state;
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(storeReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);

export default store;
