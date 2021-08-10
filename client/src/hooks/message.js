let message = ["empty"];

const getMessage = function () {
  return message;
};

const setMessage = function (newMessage = ["empty"]) {
  message = newMessage;
  subscribe();
};

const subscribe = (function () {
  let listOfFunction = [];
  function AddFunction(fun = null) {
    if (fun == null) {
      for (let i = 0; i < listOfFunction.length; i++) {
        listOfFunction[i](message);
      }
      return AddFunction;
    }

    listOfFunction.push(fun);

    return AddFunction;
  }
  return AddFunction;
})();

export { getMessage, setMessage, subscribe };
