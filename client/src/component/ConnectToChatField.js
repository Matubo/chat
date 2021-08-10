function ConnectToChatField(props) {
  const { rooms, setRoom } = props;
  function roomsHandler(room) {
    console.log(room);
    setRoom(room);
  }
  let roomsDOM=[];
  for(let i=0;i<rooms.length;i++){
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
  };

  return <div className="connect-to-chat">{roomsDOM}</div>;
}

export default ConnectToChatField;
