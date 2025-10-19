import "../styles/login.css";
import logo from "../assets/images/plataformarar.png";
import user_icon from "../assets/images/person.png";
import email_icon from "../assets/images/email.png";
import password_icon from "../assets/images/password.png";
import { useState } from "react";

const LoginSignUpView = () => {
  const [action, setAction] = useState("Registrarse");

  return (
    <div className="container">
      <div className="header">
        <div className="text">
          Bienvenido a <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {action === "Iniciar Sesión" ? (
          <div></div>
        ) : (
          <div>
            <div className="input">
              <img src={user_icon} alt="" />
              <input type="text" placeholder="Nombre" />
            </div>
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Contraseña" />
        </div>
      </div>

      {action === "Registrarse" ? (
        <div></div>
      ) : (
        <div>
          <div className="forgot-password">
            ¿Olvidaste tu contraseña? <span> Haz click aquí!</span>
          </div>
        </div>
      )}

      <div className="submit-container">
        <div
          className={action === "Registrarse" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Iniciar Sesión");
          }}
        >
          Iniciar Sesión
        </div>
        <div
          className={action === "Iniciar Sesión" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Registrarse");
          }}
        >
          Registrarse
        </div>
      </div>
    </div>
  );
};

export default LoginSignUpView;
