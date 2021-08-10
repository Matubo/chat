function ConnectToChatField(props) {
  const { rooms, setRoom } = props;
  function roomsHandler(room) {
    console.log(room);
    setRoom(room);
  }
  let roomsDOM = rooms.map((room, i) => {
    return (
      <button
        key={i * room.number}
        onClick={() => {
          roomsHandler(i);
        }}
      >
        {room.number}
      </button>
    );
  });

  return <div className="connect-to-chat">{roomsDOM}</div>;
}

export default ConnectToChatField;
