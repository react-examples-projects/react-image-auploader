import { lazy } from "react";
import Async from "../Components/LazyComponent";

const Login = lazy(() => import("../Components/Pages/Login/Login"));
const Signup = lazy(() => import("../Components/Pages/Signup/Signup"));
const App = lazy(() => import("../Components/Pages/App/App"));
const FavoritesImages = lazy(() =>
  import("../Components/Pages/FavoritesImages/FavoritesImages")
);
const MyPerfil = lazy(() => import("../Components/Pages/MyPerfil/MyPerfil"));
const LandingPage = lazy(() =>
  import("../Components/Pages/LandingPage/LandingPage")
);

const NotFound = lazy(() => import("../Components/Pages/404/404"));
const commonProps = (path) => ({ path, exact: true, private: true });
const routers = [
  {
    component: Async(MyPerfil),
    ...commonProps("/perfil"),
  },
  {
    component: Async(FavoritesImages),
    ...commonProps("/favorites"),
  },
  {
    component: Async(App),
    ...commonProps("/home"),
  },
  {
    component: Async(Login),
    path: "/login",
    exact: true,
    redirect: true,
  },
  {
    component: Async(Signup),
    path: "/signup",
    exact: true,
    redirect: true,
  },
  {
    component: Async(LandingPage),
    path: "/",
    exact: true,
    redirect: true,
  },
  {
    component: Async(NotFound),
  },
];

export default routers;
