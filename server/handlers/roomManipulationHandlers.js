const getInitMessages = require("./getInitMessages");
const getCurrentDate = require("./getCurrentDate");

class Room {
  constructor(number, messages = []) {
    this.number = number;
    this.messages = messages;
  }
  getNumber() {
    return this.number;
  }

  getMessages() {
    return this.messages;
  }

  pushNewMessage(username, message) {
    this.messages.push({
      message: message,
      date: getCurrentDate(),
      username: username,
    });
  }
}
//инициализация массива комнат в купе с гостевой
let roomArray = (function () {
  let guestRoomInit = new Room(0, getInitMessages());
  return [guestRoomInit];
})();

function getGuestRoom() {
  return roomArray[0];
}
//запрос на получение/создание комнаты
function getRoom(targetRoomNumber = "getNewRoom") {
  if (targetRoomNumber == "getNewRoom") {
    //учитывая что номера комнаты задаются по слишком простому принципу, можно было забирать сразу по индексу
    let newRoom = new Room(roomArray.length);
    roomArray.push(newRoom);
    return { status: true, room: newRoom };
  } else {
    for (let i = 0; i < roomArray.length; i++) {
      if (roomArray[i].getNumber() == targetRoomNumber) {
        return { status: true, room: roomArray[i] };
      }
    }
    return { status: false };
  }
}

//добавить сообщение в комнату
const addMessageToRoom = function (room, username, messages) {
  if (room != 0 && messages != "") {
    for (let i = 0; i < roomArray.length; i++) {
      if (room == roomArray[i].getNumber()) {
        roomArray[i].pushNewMessage(username, messages);
        return { status: true, room: roomArray[i] };
      }
    }
  }
  return { status: false };
};

module.exports = {
  getRoom: getRoom,
  getGuestRoom: getGuestRoom,
  addMessageToRoom: addMessageToRoom,
};
