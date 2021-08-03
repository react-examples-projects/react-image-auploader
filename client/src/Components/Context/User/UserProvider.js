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
  }, []);

  const toggleFavoriteImage = useCallback((id) => {
    setUserInfo((user) => {
      const { favoritesImages } = user;
      const removeFromFavoritesImages = () =>
        favoritesImages.filter((favoriteImageId) => favoriteImageId !== id);

      const userState = {
        ...user,
        favoritesImages: favoritesImages.includes(id)
          ? removeFromFavoritesImages()
          : [...favoritesImages, id],
      };
      return userState;
    });
  }, []);

  const value = useMemo(
    () => ({ user, setUser, toggleFavoriteImage, logout }),
    [user, setUser, toggleFavoriteImage, logout]
  );

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [setUser, data]);

  return <UserContext.Provider value={value} {...props} />;
}
