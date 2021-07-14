import useCurrentUser from "../../Hooks/useCurrentUser";
import { BiUserCircle, BiCog, BiExit, BiHeartCircle } from "react-icons/bi";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

export default function Sidenavbar() {
  const { logout } = useCurrentUser();
  return (
    <ProSidebar role="navigation" collapsed={false}>
      <SidebarHeader className="p-3">
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
            className="text-muted mb-2 text-uppercase"
            icon={<BiUserCircle />}
          >
            My profile
          </MenuItem>
          <MenuItem
            className="text-muted mb-2 text-uppercase"
            icon={<BiHeartCircle />}
          >
            Favorites
          </MenuItem>
          <MenuItem className="text-muted mb-2 text-uppercase" icon={<BiCog />}>
            Settings
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
