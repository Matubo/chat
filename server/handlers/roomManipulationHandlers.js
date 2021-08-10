let roomArray = [];

function getCurrentDate() {
  let messageDate = new Date();
  return `${messageDate.getDate()}.${messageDate.getMonth()}.${messageDate.getFullYear()} ${messageDate.getHours()}:${messageDate.getMinutes()}`;
}

class Room {
  constructor(number) {
    this.number = number;
    this.messages = [];
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

let guestRoom = new Room(0);
guestRoom.messages = [
  {
    message: "Вводите текст в поле внизу",
    date: "10.05.2019 12.25",
    username: "Admin",
  },
  {
    message: "Кнопка отправки там же",
    date: "10.05.2019 12.35",
    username: "Admin",
  },
  {
    message: "Переключайте сообщения тут",
    date: "10.05.2019 12.45",
    username: "Admin",
  },
];
roomArray.push(guestRoom);

function getGuestRoom() {
  return guestRoom;
}

function getRoom(roomNumber = "getNewRoom") {
  if (roomNumber == "getNewRoom") {
    let newRoom = new Room(roomArray.length);
    roomArray.push(newRoom);
    return { status: true, room: newRoom };
  } else {
    for (let i = 0; i < roomArray.length; i++) {
      if (roomArray[i].getNumber() == roomNumber) {
        return { status: true, room: roomArray[i] };
      }
    }
    return { status: false };
  }
}

const addMessageToRoom = function (room, username, messages) {
  for (let i = 0; i < roomArray.length; i++) {
    if (room == roomArray[i].getNumber()) {
      roomArray[i].pushNewMessage(username, messages);
      return { status: true, room: roomArray[i] };
    }
  }
  return { status: false };
};

module.exports = {
  getRoom: getRoom,
  getGuestRoom: getGuestRoom,
  addMessageToRoom: addMessageToRoom,
};
