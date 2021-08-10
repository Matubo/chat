import { connect } from "react-redux";
import LoginForm from "./component/LoginForm";
import Chats from "./component/Chats";
import ConnectToChatField from "./component/ConnectToChatField";
import MessageBox from "./component/MessageBox";
import TextInput from "./component/TextInput";
import "./App.css";

function App(props) {
  const { username, rooms, messages, setUsername, sendMessage, setRoom } =
    props;

  if (username == null) {
    return <LoginForm setUsername={setUsername}></LoginForm>;
  } else
    return (
      <div className="App">
        <Chats></Chats>
        <ConnectToChatField
          rooms={rooms}
          setRoom={setRoom}
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
  };
}

export default connect(stateMap, dispatchMap)(App);
