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
  getNumber(){
    return this.number
  }

  getMessages(){
    return this.messages
  }

  pushNewMessage(username,message){
    this.messages.push({message:message,date:getCurrentDate(),username:username})
  }
}

let gusetRoom = new Room(0);
gusetRoom.messages = [
  { message: "Вводите текст в поле внизу", date: "10.05.2019 12.25", username: "Admin" },
  { message: "Кнопка отправки там же", date: "10.05.2019 12.35", username: "Admin" },
  { message: "Переключайте сообщения тут", date: "10.05.2019 12.45", username: "Admin" },
];
roomArray.push(gusetRoom);

function getGuestRoom() {
  return gusetRoom;
}

function getRoom(roomNumber = "getNewRoom") {
  if (roomNumber == "getNewRoom") {
    let newRoom = new Room(roomArray.length);
    roomArray.push(newRoom);
    return newRoom;
  } else {
    if (typeof roomNumber == Number) {
      for(let i=0;i<roomArray.length;i++)
      {
        if(roomArray[i].getNumber()==roomNumber){
          return {result:true,room:roomArray[i]}
        }
      }
    }
    return {result:false}
  }
}

const addMessageToRoom=function(room,username,messages){
  console.log('add mess')
for(let i=0;i<roomArray.length;i++){
  if(room==roomArray[i].getNumber()){
    roomArray[i].pushNewMessage(username,messages)
    return {result:true,room:roomArray[i]}
  }
}
return {result:false}
}

/* addMessageToRoom(0,'matthew','fora ebora');
console.log(roomArray[0])
getRoom();
addMessageToRoom(1,'matthew','fora ebora')
console.log(getRoom(1));
console.log(roomArray[1]);
console.log(roomArray); */

module.exports = { getRoom: getRoom, getGuestRoom: getGuestRoom,addMessageToRoom:addMessageToRoom };
