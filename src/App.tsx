import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import Dashboard from "./views/Dashboard";

function App() {
  const user = {
    photoURL: "https://lh3.googleusercontent.com/a-/AOh14Ghxxxxxx=s96-c", // Aquí irá el avatar real de Google
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="*" element={<LoginView />} />
      </Routes>
    </Router>
  );
}

export default App;
