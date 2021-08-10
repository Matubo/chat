import "./MessageBox.css";

function MessageBox(props) {
  const { messages } = props;

  let DOM = messages.map((elem) => {
    console.log(elem)
    return (
      <div className="message-box">
        <p className="message-box_username">{`${elem.username} `}</p>
        <p className="message-box_message">{elem.message}</p>
        <p className="message-box_date">{elem.date}</p>
      </div>
    );
  });
  return <div className="list-of-messages">{DOM}</div>;
}

export default MessageBox;
