import { Switch, BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import RedirectRoute from "./RedirectRoute";
import routers from "../config/routers";
import PublicRoute from "./PublicRoute";

export default function Routers() {
  return (
    <BrowserRouter>
      <Switch>
        {routers.map((route, i) => {
          const key = route.path || i;
          if (route.private) return <PrivateRoute {...route} key={key} />;
          if (route.redirect) return <RedirectRoute {...route} key={key} />;
          if (route.public) return <PublicRoute {...route} key={key} />;
          return <Route {...route} key={key} />;
        })}
      </Switch>
    </BrowserRouter>
  );
}
