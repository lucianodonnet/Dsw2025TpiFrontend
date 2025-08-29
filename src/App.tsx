import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import DashBoardProfessorView from "./views/DashboardProfessorView";

function App() {
  return (
    <Router>
      <nav style={{ textAlign: "center", margin: "20px" }}>
        {/* navegación simple */}

      </nav>

      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/Dashboardprofessor" element={<DashBoardProfessorView />} />

        {/* ruta por defecto */}
        <Route path="*" element={<LoginView />} />
      </Routes>
    </Router>
  );
}

export default App;
