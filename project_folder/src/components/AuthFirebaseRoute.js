import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AuthFirebaseRoute({ element: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      element={
        currentUser ? Component : <Navigate to="/login" />
      }
    />
  );
}
