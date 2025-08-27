import { useState } from "react";
import { login } from "../services/authService";
import logo from "../assets/images/plataformarar.png";
import "../styles/login.css";
import { Link } from "react-router-dom";

function LoginPage() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, username: e.target.value });
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, password: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await login(user);

    if (data?.token) {
      localStorage.setItem("token", data.token);
      alert("Inicio de sesión exitoso");
    } else {
      alert(data?.message || "Credenciales inválidas");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" className="logo" />
        <h1>PLATAFORMA ARAR</h1>
        <h2>Inicio de Sesión</h2>

        <fieldset>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={user.username}
            onChange={handleUsernameInput}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={handlePasswordInput}
          />
        </fieldset>

        <button type="submit">Enviar</button>
        <p>
          ¿No tienes una cuenta? <Link to="/register">Registrate</Link>
        </p>
      </form>
    </>
  );
}

export default LoginPage;
