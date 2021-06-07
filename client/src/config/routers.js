import { lazy } from "react";
import Async from "../Components/LazyComponent";

const Login = lazy(() => import("../Components/Pages/Login/Login"));
const App = lazy(() => import("../Components/Pages/App/App"));
const MyPerfil = lazy(() => import("../Components/Pages/MyPerfil/MyPerfil"));
const NotFound = lazy(() => import("../Components/Pages/404/404"));
const commonProps = (path) => ({ path, exact: true, private: true });
const routers = [
  {
    component: Async(MyPerfil),
    ...commonProps("/perfil"),
  },
  {
    component: Async(App),
    ...commonProps("/home"),
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
