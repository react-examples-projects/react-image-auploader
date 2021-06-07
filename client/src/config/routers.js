import { lazy } from "react";
import Async from "../Components/LazyComponent";

const Login = lazy(() => import("../Components/Pages/Login/Login"));
const App = lazy(() => import("../Components/Pages/App/App"));
const MyPerfil = lazy(() => import("../Components/Pages/MyPerfil/MyPerfil"));
const NotFound = lazy(() => import("../Components/Pages/404/404"));

const routers = [
  {
    component: Async(MyPerfil),
    path: "/perfil",
    exact: true,
    private: true,
  },
  {
    component: Async(App),
    path: "/home",
    exact: true,
    private: true,
  },
  {
    component: Async(Login),
    path: "/",
    exact: true,
    redirect: true,
  },
  {
    component: Async(NotFound),
  },
];

export default routers;
  