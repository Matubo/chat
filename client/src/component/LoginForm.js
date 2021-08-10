import { useState } from "react";
import "./LoginForm.css";

function LoginForm(props) {
  const { setUsername } = props;
  const [username, changeUsername] = useState("");
  return (
    <div className="login-form">
      <p className="login-form_heading">Введите логин:</p>
      <input
        type="text"
        className="login-form_username"
        value={username}
        onChange={(e) => changeUsername(e.target.value)}
      ></input>
      <button
        className="login-form_login"
        onClick={() => {
          setUsername(username);
        }}
      >
        Войти
      </button>
    </div>
  );
}

export default LoginForm;
