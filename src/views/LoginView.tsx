import { useState } from "react";
import { login } from "../services/authService";
import logo from "../assets/images/plataformarar.png";
import "../styles/login.css";
import { Link } from "react-router-dom";
import Popup from "../components/Popup";
import { validPassword } from "../utils/auth";
import FieldText from "../components/common/Field";
function LoginPage() {
  const [error, setError] = useState<string>("");
  const [satisfactorio, setSatisfactorio] = useState<string>("");
  const [user, setUser] = useState({
    Email: "",
    Password: "",
  });

  const [passwordError, setPasswordError] = useState<{message: string, isValid: Boolean}[]>([]);

  const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, Email: e.target.value });
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setUser({ ...user, Password: newPassword });
    const message = validPassword(newPassword);
    const mappedMessages = message.map(([msg, isValid]) => ({message: msg, isValid: isValid}));
    setPasswordError(mappedMessages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validPassword(user.Password)) {
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

        <FieldText
          type="email"
          id="email" 
          name="Email" 
          value={user.Email} 
          onChange={handleUsernameInput}
          label="Correo Electrónico"
          isRequired
        ></FieldText>
        <FieldText
        type="password"
        id="password" 
        name="Password"
        value={user.Password}
        onChange={handlePasswordInput}
        label="Contraseña"
        isRequired>
          {
            
            <div {...passwordError.length > 0 ? <p>La contraseña no cumple con los requisitos:</p> 
            : ""}>
            {
            passwordError.map((err, index) => (
                <p key={index} style={{ color: err.isValid? "red": "green", fontSize: "0.8em", margin: "0" }}>
                  {(err.isValid? "❌": "✔️") + " - "  + err.message}
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