import { Navigate, Outlet } from "react-router-dom";
import { useLoggedInUsersContext } from "./LoggedInUserContext";

export default function ProtectedRoute() {
  const { loggedInUser } = useLoggedInUsersContext();

  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}