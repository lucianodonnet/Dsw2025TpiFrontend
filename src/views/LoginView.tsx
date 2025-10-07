import { useState } from "react";
import { login, loginWithGoogle } from "../services/authService";
import logo from "../assets/images/plataformarar.png";
import "../styles/login.css";
import { Link } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

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

  // === Google ===
  const onGoogleSuccess = async (cred: CredentialResponse) => {
    try {
      const idToken = cred.credential;
      if (!idToken) throw new Error("No llegó id_token de Google");

      const data = await loginWithGoogle(idToken); // POST /api/auth/google-login

      if (data?.token) {
        localStorage.setItem("token", data.token);
        alert("Login con Google OK");
      } else if (data?.email) {
        alert(`Email validado: ${data.email}`);
      } else {
        alert(data?.message || "No autorizado");
      }
    } catch (err: any) {
      alert(err?.message || "Error en login con Google");
    }
  };

  const onGoogleError = () => {
    alert("Falló el login de Google");
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

        <div style={{ margin: "12px 0", color: "#999" }}>o</div>

        {/* Botón de Google */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <GoogleLogin onSuccess={onGoogleSuccess} onError={onGoogleError} />
        </div>

        <p style={{ marginTop: 12 }}>
          ¿No tienes una cuenta? <Link to="/register">Registrate</Link>
        </p>
      </form>
    </>
  );
}

export default LoginPage;
