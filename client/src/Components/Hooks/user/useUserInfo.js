import { useEffect } from "react";
import { useQuery } from "react-query";
import { getUserInfo } from "../../../Helpers/api";
import { existsToken } from "../../../Helpers/token";
import useCurrentUser from "../user/useCurrentUser";

export default function useUserInfo() {
  const { data, isError, ...args } = useQuery("user", getUserInfo, {
    enabled: existsToken(),
  });
  const { user, setUser, logout } = useCurrentUser();
  useEffect(() => {
    if (!isError && data && !user) {
      setUser(data);
    } else if (isError) {
      logout();
    }
  }, [data, isError, setUser, logout, user]);

  return { data, isError, ...args };
}
