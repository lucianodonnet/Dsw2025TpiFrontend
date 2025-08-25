import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";

function App() {
  return (
    <Router>
      <nav style={{ textAlign: "center", margin: "20px" }}>
        {/* navegación simple */}
        <Link to="/login" style={{ margin: "0 10px" }}>
          Login
        </Link>
        <Link to="/register" style={{ margin: "0 10px" }}>
          Registro
        </Link>
      </nav>

      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />

        {/* ruta por defecto */}
        <Route path="*" element={<LoginView />} />
      </Routes>
    </Router>
  );
}

export default App;
