function Chats(props) {
  const { rooms, setRoom } = props;
  function roomsHandler(room) {
    setRoom(room);
  }
  let roomsDOM = rooms.map((elem, index) => {
    return (
      <button
        key={index * elem.number}
        onClick={() => {
          roomsHandler(index);
        }}
      >
        {elem.number}
      </button>
    );
  });

  return <div className="chats">{roomsDOM}</div>;
}

export default Chats;
