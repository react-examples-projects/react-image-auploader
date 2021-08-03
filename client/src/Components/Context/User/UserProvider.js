import { useState, useMemo, useCallback } from "react";
import { removeToken } from "../../../Helpers/token";
import UserContext from "./UserContext";

export default function UserProvider(props) {
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

  return <UserContext.Provider value={value} {...props} />;
}
