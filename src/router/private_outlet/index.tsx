import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import PrivateLayout from "../../modules/@common/@layout/private";
import useAuth from "../../hooks/hooks";

export const PrivateOutlet = () => {
  const auth = useAuth();
  return auth ? <PrivateLayout /> : <Navigate to="/login" />;
};

export default PrivateOutlet;
