module.exports = function () {
  function toXXFormat(data) {
    if (data > 9) {
      return data;
    } else {
      return `0${data}`;
    }
  }
  let messageDate = new Date();
  let year = messageDate.getFullYear();
  let month = toXXFormat(messageDate.getMonth() + 1);
  let date = toXXFormat(messageDate.getDate());
  let hours = toXXFormat(messageDate.getHours());
  let minutes = toXXFormat(messageDate.getMinutes());

  return `${date}.${month}.${year} ${hours}:${minutes}`;
};
