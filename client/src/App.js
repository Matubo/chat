import { connect } from "react-redux";
import LoginForm from "./component/LoginForm";
import Chats from "./component/Chats";
import ConnectToChatField from "./component/ConnectToChatField";
import MessageBox from "./component/MessageBox";
import TextInput from "./component/TextInput";
import "./App.css";

function App(props) {
  const {
    username,
    rooms,
    messages,
    setUsername,
    sendMessage,
    setRoom,
    getNewRoom,
    connectToRoom,
  } = props;

  if (username == null) {
    return <LoginForm setUsername={setUsername}></LoginForm>;
  } else
    return (
      <div className="App">
        <Chats rooms={rooms} setRoom={setRoom}></Chats>
        <ConnectToChatField
          getNewRoom={getNewRoom}
          connectToRoom={connectToRoom}
        ></ConnectToChatField>
        <MessageBox messages={messages}></MessageBox>
        <TextInput sendMessage={sendMessage}></TextInput>
      </div>
    );
}

function stateMap(store) {
  return {
    username: store.username,
    room: store.room,
    rooms: store.rooms,
    messages: store.messages,
  };
}
function dispatchMap(dispatch) {
  return {
    setUsername: (username) =>
      dispatch({ type: "change_username", username: username }),
    sendMessage: (message) =>
      dispatch({ type: "send_message", message: message }),
    setRoom: (roomID) =>
      dispatch({
        type: "set_room",
        roomID: roomID,
      }),
    getNewRoom: () => {
      dispatch({ type: "get_new_room" });
    },
    connectToRoom: (roomNumber) => {
      dispatch({ type: "join_to_room", roomNumber: roomNumber });
    },
  };
}

export default connect(stateMap, dispatchMap)(App);
