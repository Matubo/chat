import { useState } from "react";
import send from "../assets/img/send.png";
import "./TextInput.css";

function TextInput(props) {
  const { sendMessage } = props;
  const [message, changeMessage] = useState("");

  const buttonHandler = () => {
    sendMessage(message);
    changeMessage("");
  };

  return (
    <div className="text-input">
      <textarea
        className="input text-input_message-form"
        maxLength={340}
        value={message}
        onChange={(e) => changeMessage(e.target.value)}
      ></textarea>
      <button className="button text-input_send-button" onClick={buttonHandler}>
        <img src={send} className="text-input_send-button_img"></img>
      </button>
    </div>
  );
}

export default TextInput;
