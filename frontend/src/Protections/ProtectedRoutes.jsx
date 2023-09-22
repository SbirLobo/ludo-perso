import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useLudo } from "../context/LudoContext";

function RestrictedRoutes() {
  const { loggedInUser } = useLudo();
  const location = useLocation();
  if (!loggedInUser.userName) {
    return <Navigate to="/" replace />;
  }
  const allowedUserRoutes = ["/collection", "/univers", "/profil"];
  if (!allowedUserRoutes.includes(location.pathname)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
}

function AdminRoutes() {
  const { loggedInUser } = useLudo();
  if (!loggedInUser.userName) {
    return <Navigate to="/" replace />;
  }
  if (!loggedInUser.admin) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
}

function ProtectedRoutes() {
  const { loggedInUser } = useLudo();
  if (!loggedInUser.adminStatus) {
    return <RestrictedRoutes />;
  }
  return <AdminRoutes />;
}

export default ProtectedRoutes;
