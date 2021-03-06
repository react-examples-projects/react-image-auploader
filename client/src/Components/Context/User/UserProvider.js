import { useState, useCallback } from "react";
import { removeToken } from "../../../Helpers/token";
import UserContext from "./UserContext";

export default function UserProvider({ children }) {
  const [user, setUserInfo] = useState(null);
  const setUser = useCallback(
    (data) => setUserInfo((u) => ({ ...u, ...data })),
    []
  );

  const logout = useCallback(() => {
    removeToken();
    setUserInfo(null);
  }, []);

  const toggleFavoriteImageUser = useCallback((id) => {
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

  const removeFavoriteImageUser = useCallback((id) => {
    setUserInfo((user) => {
      const { favoritesImages } = user;
      return {
        ...user,
        favoritesImages: favoritesImages.filter(
          (favoriteImageId) => favoriteImageId !== id
        ),
      };
    });
  }, []);

  const value = {
    user,
    setUser,
    toggleFavoriteImageUser,
    removeFavoriteImageUser,
    logout,
  };

  return <UserContext.Provider value={value} children={children} />;
}
