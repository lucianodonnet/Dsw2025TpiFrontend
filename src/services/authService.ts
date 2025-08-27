export interface User {
  username: string;
  password: string;
  email?: string;
}
const API_URL = "https://localhost:7138/api/"
export const register = async (user: User) => {
  const REGISTER_URL = URL.parse(API_URL + "auth/register");
  if (!REGISTER_URL) {
    throw new Error("URL de registro inválida");
  }
  try {
    const response = await fetch(REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.error("Error en registro:", error);
    return { message: "No se pudo conectar con el servidor" };
  }
};

export const login = async (user: User) => {
  const REGISTER_URL = URL.parse(API_URL + "auth/login");
  if (!REGISTER_URL) {
    throw new Error("URL de registro inválida");
  }
  if(!user.username || !user.password || user.username.trim() === "" || user.password.trim() === ""){
    return {message: "Username y password son obligatorios"};
  }
  if(user.email && user.email.trim() === ""){
    return {message: "Email no puede estar vacío si se proporciona"};
  }
  try {
    const response = await fetch(REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    // Convertimos la respuesta en JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en login:", error);
    return { message: "No se pudo conectar con el servidor" };
  }
};
