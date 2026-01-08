import { Navigate, Outlet } from "react-router-dom";
import { useLoggedInUsersContext } from "./LoggedInUserContext";

export default function GuestRoute() {
  const { loggedInUser } = useLoggedInUsersContext();

  if (loggedInUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}