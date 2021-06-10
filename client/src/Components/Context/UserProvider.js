import {
  createContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { getUserInfo } from "../../Helpers/api";
import { getToken } from "../../Helpers/token";

export const UserContext = createContext();

export default function UserProvider(props) {
  const [user, setUserInfo] = useState({ userError: false });
  const setUser = useCallback(
    (data) => setUserInfo((u) => ({ ...u, ...data })),
    []
  );
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    async function userInfo() {
      try {
        const user = await getUserInfo();
        if (user) setUser(user);
      } catch (error) {
        setUser({ userError: true });
        console.warn("%cError in downloading the user info:");
        console.log(error);
      }
    }

    getToken() && userInfo();
  }, [setUser]);

  return <UserContext.Provider value={value} {...props} />;
}
