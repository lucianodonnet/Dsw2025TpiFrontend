import { useState } from "react";
import { register } from "../services/authService";
import "../styles/login.css";
import logo from "../assets/images/plataformarar.png";
import { Link } from "react-router-dom";

function RegisterView() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await register(user);

    if (data?.id) {
      alert("Usuario registrado con éxito");
    } else {
      alert(data?.message || "Error al registrarse");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" className="logo" />
        <h1>PLATAFORMA ARAR</h1>
        <h2>Registro</h2>

        <fieldset>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            // You might want to add state and validation for confirm password
          />
        </fieldset>
        <button type="submit">Registrarse</button>
        <p>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </>
  );
}

export default RegisterView;
