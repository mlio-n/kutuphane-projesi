import { Navigate, Outlet } from "react-router-dom";
import { useLoggedInUsersContext } from "./LoggedInUserContext";

export default function GuestRoute() {
  const { loggedInUser } = useLoggedInUsersContext();

  // Eğer kullanıcı zaten giriş yapmışsa, onu Ana Sayfaya (Dashboad'a) fırlat
  if (loggedInUser) {
    return <Navigate to="/" replace />;
  }

  // Giriş yapmamışsa, Login/Register sayfalarını görmesine izin ver
  return <Outlet />;
}