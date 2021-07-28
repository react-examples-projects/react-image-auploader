import { useState, useMemo, useEffect, useCallback } from "react";
import { getUserInfo } from "../../../Helpers/api";
import { removeToken, existsToken } from "../../../Helpers/token";
import UserContext from "./UserContext";
import { useQuery } from "react-query";

export default function UserProvider(props) {
  const { data } = useQuery("user", getUserInfo, {
    enabled: existsToken(),
  });
  const [user, setUserInfo] = useState({});
  const setUser = useCallback(
    (data) => setUserInfo((u) => ({ ...u, ...data })),
    []
  );
  const logout = useCallback(() => {
    setUserInfo({});
    removeToken();
    window.location.href = "/";
  }, []);

  const value = useMemo(
    () => ({ user, setUser, logout }),
    [user, setUser, logout]
  );

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [setUser, data]);

  return <UserContext.Provider value={value} {...props} />;
}
