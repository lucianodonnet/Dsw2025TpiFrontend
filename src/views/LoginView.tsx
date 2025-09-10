import { useState } from "react";
import { login } from "../services/authService";
import logo from "../assets/images/plataformarar.png";
import "../styles/login.css";
import { Link } from "react-router-dom";
import Popup from "../components/Popup";

function LoginPage() {
  const [error, setError] = useState<string>("");
  const [satisfactorio, setSatisfactorio] = useState<string>("");
  const [user, setUser] = useState({
    Email: "",
    Password: "",
  });

  const [passwordError, setPasswordError] = useState<string>("");

  const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, Email: e.target.value });
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setUser({ ...user, Password: newPassword });

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,}).*$/;

    if (passwordRegex.test(newPassword)) {
      setPasswordError("");
    } else {

      setPasswordError(
        "La contraseña debe tener al menos: una mayúscula, una minúscula, un número, un símbolo (!@#$%^&*) y 8 caracteres de longitud."
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();



    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,}).*$/;
    if (!passwordRegex.test(user.Password)) {
      setError("Por favor, corrige el formato de la contraseña.");
      return;
    }


    const data = await login(user);

    if (data?.token) {
      localStorage.setItem("token", data.token);
      setSatisfactorio("Bienvenido");
    } else {
      setError(data?.message || "Credenciales inválidas");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" className="logo" />
        <h1>PLATAFORMA ARAR</h1>
        <h2>INICIAR SESIÓN</h2>

        <fieldset>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="Email"
            value={user.Email}
            onChange={handleUsernameInput}
            required
          />
        </fieldset>

        <fieldset>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={user.Password}
            onChange={handlePasswordInput}
            required
          />

          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        </fieldset>

        <button type="submit">Enviar</button>
        <p>
          ¿No tienes una cuenta? <Link to="/register">Registrate</Link>
        </p>
      </form>

      {error && (
        <Popup
          message={error}
          onClose={() => setError("")}
        />
      )}

      {satisfactorio && (
        <Popup
          message={"Bienvenid@"}
          onClose={() => setSatisfactorio("")}
        />
      )}
    </>
  );
}

export default LoginPage;