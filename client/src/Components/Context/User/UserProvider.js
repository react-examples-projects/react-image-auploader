import { useState, useMemo, useCallback } from "react";
import { removeToken } from "../../../Helpers/token";
import UserContext from "./UserContext";

export default function UserProvider(props) {
  const [user, setUserInfo] = useState(null);
  const setUser = useCallback(
    (data) => setUserInfo((u) => ({ ...u, ...data })),
    []
  );
  const logout = useCallback(() => {
    setUserInfo(null);
    removeToken();
  }, []);

  const toggleFavoriteImage = useCallback((id) => {
    setUserInfo((user) => {
      const { favoritesImages } = user;
      const removeFromFavoritesImages = () =>
        favoritesImages.filter((favoriteImageId) => favoriteImageId !== id);

      return {
        ...user,
        favoritesImages: favoritesImages.includes(id)
          ? removeFromFavoritesImages()
          : [...favoritesImages, id],
      };
    });
  }, []);

  const value = useMemo(
    () => ({ user, setUser, toggleFavoriteImage, logout }),
    [user, setUser, toggleFavoriteImage, logout]
  );

  return <UserContext.Provider value={value} {...props} />;
}
