import { Navigate } from "react-router-dom";
import { useAuth } from "~/context/auth-context";
import { AppRoute } from "~/enums/app-route";

export const NotFoundRoute = () => {
  const { currentUser } = useAuth();

  return (
    <Navigate to={currentUser ? AppRoute.DASHBOARD : AppRoute.ROOT} replace />
  );
};
