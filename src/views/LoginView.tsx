import { useState } from "react";
import { login } from "../services/authService";
import logo from "../assets/images/plataformarar.png";
import "../styles/login.css";
import { Link } from "react-router-dom";
import Popup from "../components/Popup";
import FieldText from "../components/common/Field";
import { useValidation } from "../hooks/useValidation";
import { regexPasswordMap } from "../utils/validator";
function LoginPage() {
  const [error, setError] = useState<string>("");
  const [satisfactorio, setSatisfactorio] = useState<string>("");
  const [user, setUser] = useState({
    Email: "",
    Password: "",
  });


  const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, Email: e.target.value });
  };
  const [passwordErrors, setPasswordError] = useValidation();
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newPassword = e.target.value;
    setUser({ ...user, Password: newPassword });
    setPasswordError(newPassword, regexPasswordMap);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

        <FieldText
          type="email"
          id="email" 
          name="Email" 
          value={user.Email} 
          onChange={handleUsernameInput}
          label="Correo Electrónico"
          isRequired></FieldText>
        <FieldText
          type="password"
          id="password" 
          name="Password"
          value={user.Password}
          onChange={handlePasswordInput}
          label="Contraseña"
          isRequired>
          { 
            <div {...passwordErrors.length > 0 ? <p>La contraseña no cumple con los requisitos:</p> 
            : ""}>
            {
              passwordErrors.map((err) => (
                <p key={err.message} style={{ color: err.isValid? "green":"red", fontSize: "0.8em", margin: "0" }}>
                  {(err.isValid? "\u2714" : "\u2716") + " - "  + err.message}
                </p>
              ))
            }
            </div>
          }
        </FieldText>

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