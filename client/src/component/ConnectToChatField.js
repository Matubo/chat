import { useState } from "react";

function ConnectToChatField(props) {
  const { getNewRoom, connectToRoom } = props;
  const [chatNumber, setChatNumber] = useState("");
  function changeNumber(value) {
    setChatNumber(value);
  }
  function connect() {
    connectToRoom(chatNumber);
  }
  return (
    <div className="connect-to-chat">
      <input
        className="input connect-to-chat_input"
        type="number"
        maxLength={10}
        value={chatNumber}
        onChange={(e) => changeNumber(e.target.value)}
      ></input>
      <button className="connect-to-chat_connect-button" onClick={connect}>
        Подключиться
      </button>
      <button className="connect-to-chat_new-button" onClick={getNewRoom}>
        Создать
      </button>
    </div>
  );
}

export default ConnectToChatField;
