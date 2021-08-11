import { useState } from "react";
import send from "../assets/img/send.png";
import "./TextInput.css";

function TextInput(props) {
  const { sendMessage } = props;
  const [message, changeMessage] = useState("");

  const buttonHandler = (e) => {
    sendMessage(message);
    changeMessage("");
    e.stopPropagation();
  };

  const onKeyPressHandler = (e) => {
    if (e.keyCode === 13) {
      sendMessage(message);
      changeMessage("");
      e.stopPropagation();
    }
  };

  return (
    <div className="text-input">
      <textarea
        className="input text-input_message-form"
        maxLength={340}
        value={message}
        onChange={(e) => changeMessage(e.target.value)}
        onKeyDown={onKeyPressHandler}
      ></textarea>
      <button className="button text-input_send-button" onClick={buttonHandler}>
        <img src={send} className="text-input_send-button_img" alt="#"></img>
      </button>
    </div>
  );
}

export default TextInput;
