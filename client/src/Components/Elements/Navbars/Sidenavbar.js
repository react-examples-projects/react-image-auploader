import useCurrentUser from "../../Hooks/useCurrentUser";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { BiUserCircle, BiCog, BiMoney, BiExit } from "react-icons/bi";
import "react-pro-sidebar/dist/css/styles.css";

export default function Sidenavbar() {
  const { user, logout } = useCurrentUser();
  return (
    <ProSidebar role="navigation">
      <SidebarHeader className="p-4">
        <h5 className="m-0 text-muted text-uppercase font-weight-bold">
          Animez
        </h5>
      </SidebarHeader>

      <SidebarContent className="mt-3">
        <Menu iconShape="square">
          <SubMenu
            title="My account"
            className="text-muted mb-2 text-uppercase"
            icon={<BiUserCircle />}
          >
            <MenuItem className="text-muted mb-2 text-uppercase">
              My perfil
            </MenuItem>
            <MenuItem className="text-muted mb-2 text-uppercase">
              Favorites
            </MenuItem>
          </SubMenu>

          <MenuItem className="text-muted mb-2 text-uppercase" icon={<BiCog />}>
            Settings
          </MenuItem>
          <MenuItem
            className="text-muted mb-2 text-uppercase"
            icon={<BiMoney />}
          >
            Donate us
          </MenuItem>
          <MenuItem
            className="text-muted mb-2 text-uppercase"
            icon={<BiExit />}
            onClick={logout}
          >
            Logout
          </MenuItem>
        </Menu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <p className="m-0 text-muted font-weight-bold">More information</p>
      </SidebarFooter>
    </ProSidebar>
  );
}