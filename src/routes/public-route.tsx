import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "~/context/auth-context";
import { AppRoute } from "~/enums/app-route";

export const PublicRoute = () => {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to={AppRoute.DASHBOARD} replace />;
  }

  return <Outlet />;
};
