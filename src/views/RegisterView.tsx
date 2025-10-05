import { useState } from "react";
import { register } from "../services/authService";
import "../styles/login.css";
import logo from "../assets/images/plataformarar.png";
import { Link } from "react-router-dom";
import ErrorPopup from "../components/Popup";
import FieldText from "../components/common/Field";
import { useValidation } from "../hooks/useValidation";
import { regexPasswordMap } from "../utils/Validator";

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

  const [passwordErrors, setPasswordError] = useValidation();
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newPassword = e.target.value;
    setUser({ ...user, Password: newPassword });
    setPasswordError(newPassword, regexPasswordMap);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await register(user);


    if (data.ok && data.id) {
      alert("Usuario registrado con éxito");
    } else {
      setError(data.message || "Error en el registro");
    }

  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" className="logo" />
        <h1>PLATAFORMA ARAR</h1>
        <h2>REGISTRARSE</h2>

        <FieldText
        id="apellido" 
        name="Apellido" 
        value={user.Apellido} 
        onChange={handleChange}
        label="Apellido"
        isRequired
        ></FieldText>

        <FieldText
        id="nombre" 
        name="Nombre" 
        value={user.Nombre} 
        onChange={handleChange}
        label="Nombre"
        isRequired
        ></FieldText>


        <FieldText 
        id="username" 
        name="Username" 
        value={user.Username} 
        onChange={handleChange}
        label="Usuario"
        isRequired
        ></FieldText>

        <FieldText
        type="password"
        id="password" 
        name="Password" 
        value={user.Password} 
        onChange={handlePasswordInput}
        label="Contraseña"
        isRequired
        >{ 
            <div {...passwordErrors.length > 0 ? <p>La contraseña no cumple con los requisitos:</p> 
            : ""}>
            {
              passwordErrors.map((err) => (
                <p key={err.message} style={{ color: err.isValid? "red":"green", fontSize: "0.8em", margin: "0" }}>
                  {(err.isValid? "\u2716": "\u2714") + " - "  + err.message}
                </p>
              ))
            }
            </div>
          }
        </FieldText>

        <FieldText
        type="date"
        id="fechaNacimiento" 
        name="FechaNacimiento" 
        value={user.Password} 
        onChange={handleChange}
        label="Fecha de Nacimiento"
        isRequired
        ></FieldText>

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
