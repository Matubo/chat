function Chats(props) {
  const { rooms, setRoom } = props;
  function roomsHandler(room) {
    setRoom(room);
  }
  let roomsDOM = [];
  for (let i = 0; i < rooms.length; i++) {
    roomsDOM.push(
      <button
        key={i * rooms[i].number}
        onClick={() => {
          roomsHandler(i);
        }}
      >
        {rooms[i].number}
      </button>
    );
  }

  return <div className="chats">{roomsDOM}</div>;
}

export default Chats;
