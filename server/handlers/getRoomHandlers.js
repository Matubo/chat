let roomArray = [];

class Room {
  constructor(number) {
    this.number = number;
    this.messages = [];
  }
}

function getRoom(roomNumber = "getNewRoom") {
  if (roomNumber == "getNewRoom") {
    let newRoom = new Room(roomArray.length);
    roomArray.push(newRoom);
    return newRoom;
  } else {
    if (typeof roomNumber == Number) {
      if (roomArray[roomNumber] != undefined) {
        return roomArray[roomNumber];
      }
    }
    return null;
  }
}

let gusetRoom = new Room(0);
gusetRoom.messages = [
  { message: "test1 test1", date: "10.05.2019", username: "nik" },
  { message: "test1 test1", date: "10.05.2019", username: "nik" },
  { message: "test1 test1", date: "10.05.2019", username: "nik" },
];
function getGuestRoom() {
  return gusetRoom;
}

module.exports = { getRoom: getRoom, getGuestRoom: getGuestRoom };
