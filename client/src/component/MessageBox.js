import "./MessageBox.css";

function MessageBox(props) {
  const { messages } = props;

  let messagesDOM = messages.map((elem) => {
    return (
      <div className="message-box">
        <p className="message-box_username">{`${elem.username} `}</p>
        <p className="message-box_message">{elem.message}</p>
        <p className="message-box_date">{elem.date}</p>
      </div>
    );
  });
  return <div className="list-of-messages">{messagesDOM}</div>;
}

export default MessageBox;
