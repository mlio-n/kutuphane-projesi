import { Navigate, Outlet } from "react-router-dom";
import { useLoggedInUsersContext } from "./LoggedInUserContext";

export default function ProtectedRoute() {
  const { loggedInUser } = useLoggedInUsersContext();

  // Eğer kullanıcı giriş yapmamışsa, Login sayfasına fırlat
  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  // Giriş yapmışsa, içeri (Alt sayfalara) girmesine izin ver
  return <Outlet />;
}