import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { LoggedInUserContextProvider } from "./components/auth/LoggedInUserContext";
import DashboardLayout from "./components/shared/DashboardLayout";
import CategoryList from "./components/categories/CategoryList";
import BookList from "./components/books/BookList";
import UserList from "./components/auth/UserList"; 
import ProtectedRoute from "./components/auth/ProtectedRoute";
import GuestRoute from "./components/auth/GuestRoute";
import Home from "./components/home/Home";

const router = createBrowserRouter([
  // Protected Routes (Requires Login)
  {
    path: "/",
    element: <ProtectedRoute />, 
    children: [
      {
        path: "/",
        element: <DashboardLayout />, 
        children: [
          {
            path: "/", 
            element: <Home />, 
          },
          {
            path: "/categories",
            element: <CategoryList />,
          },
          {
            path: "/books",
            element: <BookList />,
          },
          {
            path: "/users",
            element: <UserList />, 
          },
        ],
      },
    ],
  },

  // Guest Routes (Only accessible if NOT logged in)
  {
    element: <GuestRoute />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ]
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoggedInUserContextProvider>
      <Toaster richColors position="top-center" />
      <RouterProvider router={router} />
    </LoggedInUserContextProvider>
  </StrictMode>
);