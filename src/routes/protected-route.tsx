import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "~/context/auth-context";
import { AppRoute } from "~/enums/app-route";

export const ProtectedRoute = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to={AppRoute.ROOT} replace />;
  }

  return <Outlet />;
};
