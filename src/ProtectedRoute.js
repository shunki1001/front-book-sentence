import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";

const ProtectedRoute = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  if (localStorage.getItem("user")) {
    return <Outlet />;
  } else {
    return <Navigate to="/signin" replace />;
  }
  // if (!isAuth) {
  //   return <Navigate to="/signin" replace />;
  // }
  // return <Outlet />;
};

export default ProtectedRoute;
