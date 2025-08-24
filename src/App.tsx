import { useState } from "react";
import logo from './assets/plataformarar.png';
import './Componente.css';

function App() {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const handleUsernameInput = (e) => {
    setUser({ ...user, username: e.target.value });
  };

  const handlePasswordInput = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:7138/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Inicio de sesión exitoso");
        // Aquí podés redirigir o cargar datos protegidos
      } else {
        alert(data || "Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" className="logo" />
        <h1>PLATAFORMA ARAR</h1>
        <h2>Inicio de Sesión</h2>

        <fieldset>
          <label htmlFor="username">Correo Electrónico:</label>
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
        <p>¿No tienes una cuenta? Registrate.</p>
      </form>
    </>
  );
}

export default App;
