import { existsToken, removeToken } from "../../Helpers/token";
import { verifyToken } from "../../Helpers/api";
import { useQuery } from "react-query";
import { useEffect } from "react";

/**
 * Verify token from the backend
 * @returns {Object} A object if the token is valid, and the loader flag
 */
export default function useVerifyToken() {
  const { data, isLoading, isError } = useQuery("token", verifyToken, {
    enabled: existsToken(),
  });

  useEffect(() => {
    if (isError) removeToken();
  }, [isError]);

  return { isValidToken: isError ? false : data, isLoading };
}
