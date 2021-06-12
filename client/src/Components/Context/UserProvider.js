import { useState, useMemo, useEffect, useCallback } from "react";
import { getUserInfo } from "../../Helpers/api";
import { clearCache } from "../../Helpers/cache";
import { getToken, removeToken } from "../../Helpers/token";
import UserContext from "./UserContext";

export default function UserProvider(props) {
  const [user, setUserInfo] = useState({ userError: false });
  const setUser = useCallback(
    (data) => setUserInfo((u) => ({ ...u, ...data })),
    []
  );
  const logout = useCallback(() => {
    setUserInfo({});
    removeToken();
    clearCache();
  }, [setUser]);

  const value = useMemo(
    () => ({ user, setUser, logout }),
    [user, setUser, logout]
  );

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
