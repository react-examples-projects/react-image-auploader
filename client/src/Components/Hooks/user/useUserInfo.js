import { useEffect } from "react";
import { useQuery } from "react-query";
import { getUserInfo } from "../../../Helpers/api";
import { existsToken } from "../../../Helpers/token";
import useCurrentUser from "../user/useCurrentUser";

export default function useUserInfo() {
  const { data, isError, ...args } = useQuery("user", getUserInfo, {
    enabled: existsToken(),
  });
  const { setUser, logout } = useCurrentUser();

  useEffect(() => {
    if (!isError && data) {
      setUser(data);
    } else if (isError) {
      logout();
    }
  }, [data, isError, setUser, logout]);
   
  return { data, isError, ...args };
}
