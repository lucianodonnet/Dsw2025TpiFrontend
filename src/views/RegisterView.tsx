import { useState } from "react";
import { register } from "../services/authService";
import "../styles/login.css";
import logo from "../assets/images/plataformarar.png";
import { Link } from "react-router-dom";
import ErrorPopup from "../components/Popup";

function RegisterView() {
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
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
      setError(data?.message || "Credenciales inválidas");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" className="logo" />
        <h1>PLATAFORMA ARAR</h1>
        <h2>REGISTRARSE</h2>


        <fieldset>
          <label htmlFor="fullName">Apellido y Nombre:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
          />
        </fieldset>


        <fieldset>
          <label htmlFor="username">Correo Electrónico:</label>
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

        <button type="submit">Registrarse</button>
        <p>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>


      error && (
      <ErrorPopup
        message={error}
        onClose={() => setError("")}
      />
      )
    </>


  );
}

export default RegisterView;
