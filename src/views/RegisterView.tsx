import { useState } from "react";
import { register } from "../services/authService";
import "../styles/login.css";
import logo from "../assets/images/plataformarar.png";
import { Link } from "react-router-dom";
import ErrorPopup from "../components/Popup";



function RegisterView() {
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState({
    Apellido: "",
    Nombre: "",
    Username: "",
    Password: "",
    Email: "",
    FechaNacimiento: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name.charAt(0).toUpperCase() + name.slice(1)]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    const data = await register(user);


    if (data?.id) {
      alert("Usuario registrado con éxito");
    } else {
      const errorMsg =
        data?.message ||
        data?.title ||
        "Credenciales inválidas";

      setError(errorMsg);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" className="logo" />
        <h1>PLATAFORMA ARAR</h1>
        <h2>REGISTRARSE</h2>

        <fieldset>
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            name="Username"
            value={user.Username}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="Apellido"
            value={user.Apellido}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="Nombre"
            value={user.Nombre}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="Email"
            value={user.Email}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="Password"
            value={user.Password}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="fechaNacimiento"
            name="FechaNacimiento"
            value={user.FechaNacimiento}
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
