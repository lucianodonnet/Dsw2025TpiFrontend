export const register = async (credentials: {
  username: string;
  password: string;
}) => {
  try {
    const response = await fetch("https://localhost:7138/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    return await response.json();
  } catch (error) {
    console.error("Error en registro:", error);
    return { message: "No se pudo conectar con el servidor" };
  }
};

export const login = async (credentials: {
  username: string;
  password: string;
}) => {
  try {
    const response = await fetch("https://localhost:7138/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    // Convertimos la respuesta en JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en login:", error);
    return { message: "No se pudo conectar con el servidor" };
  }
};
