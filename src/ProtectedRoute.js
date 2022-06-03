import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";

const ProtectedRoute = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const location = useLocation();

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
