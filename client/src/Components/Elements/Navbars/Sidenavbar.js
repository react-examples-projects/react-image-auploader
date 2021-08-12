import useCurrentUser from "../../Hooks/user/useCurrentUser";
import { BiUser, BiExit, BiHeart, BiHomeAlt } from "react-icons/bi";
import { NavLink, Link } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import useMediaQuery from "../../Hooks/useMediaQuery";

export default function Sidenavbar() {
  const isMobile = useMediaQuery("max-width: 992px");
  const { logout } = useCurrentUser();

  return (
    <ProSidebar role="navigation" collapsed={isMobile}>
      <SidebarHeader className="p-3 d-none d-lg-block">
        <h1
          className="m-0 text-muted text-uppercase font-weight-bold"
          style={{ fontSize: "1.5rem" }}
        >
          Manjuro
        </h1>
      </SidebarHeader>

      <SidebarContent className="mt-3">
        <Menu iconShape="square">
          <MenuItem
            className="d-md-block d-lg-none mb-2 text-uppercase"
            icon={<BiUser />}
          >
            <NavLink to="/perfil" exact>
              Mi perfil
            </NavLink>
          </MenuItem>

          <MenuItem
            className="mb-2 text-uppercase"
            icon={<BiHomeAlt />}
          >
            <NavLink to="/home" activeClassName="text-white" exact>
              Mi Inicio
            </NavLink>
          </MenuItem>

          <MenuItem
            className="mb-2 text-uppercase"
            icon={<BiHeart />}
          >
            <NavLink to="/favorites" activeClassName="text-white" exact>
              Favoritos
            </NavLink>
          </MenuItem>

          <MenuItem
            className="mb-2 text-uppercase"
            icon={<BiExit />}
            onClick={logout}
          >
            <Link to="#">Salir</Link>
          </MenuItem>
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
}
   