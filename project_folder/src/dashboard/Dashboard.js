import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    async function handleLogout() {
      setError("");
      try {
        await logout();
        navigate("/");
      } catch {
        setError("Failed to log out");
      }
    }

    return (
        <div>
            Dashboard：
            {error && <div style={{ color: "red" }}>{error}</div>}
            <div>
                <strong>Email:</strong> {currentUser?.email}
            </div>
            <div>
                <strong>ハンドル名:</strong> {currentUser?.displayName}
            </div>
            <h2>
                <Link to="/login">Login</Link>
            </h2>
            <h2>
                <Link to="/signup">Signup</Link>
            </h2>
            <Button color="primary" onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
};
export default Dashboard;