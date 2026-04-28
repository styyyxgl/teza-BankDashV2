import { useMemo } from "react";
import {
  createBrowserRouter,
  RouterProvider as LibraryRouterProvider,
  type RouteObject,
} from "react-router-dom";

type Properties = {
  routes: RouteObject[];
};

const RouterProvider: React.FC<Properties> = ({ routes }) => {
  const router = useMemo(() => createBrowserRouter(routes), [routes]);

  return <LibraryRouterProvider router={router} />;
};

export { RouterProvider };
