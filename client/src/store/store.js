import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
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
  if (action.type == "set_username") {
    return {
      ...state,
      username: action.username,
    };
  }
  if (action.type == "set_new_rooms") {
    return {
      ...state,
      rooms: action.rooms,
    };
  }
  if (action.type == "set_current_base_state") {
    return {
      ...state,
      room: action.room,
      messages: action.messages,
      roomID: action.roomID,
    };
  }
  if (action.type == "set_messages") {
    return {
      ...state,
      messages: action.messages,
    };
  }

  return state;
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(storeReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);

export default store;
