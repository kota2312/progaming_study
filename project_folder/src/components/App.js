import Signup from "../signup/Signup"; // 修正したパスに変更
import Home from "../Home";
import Dashboard from "../dashboard/Dashboard";
import Login from "../login/Login";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component }) {
  const { currentUser } = useAuth();
  return currentUser ? Component : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={<ProtectedRoute element={<Dashboard />} />} 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;