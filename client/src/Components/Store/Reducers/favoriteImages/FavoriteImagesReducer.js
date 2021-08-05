import Types from "../../Actions/Types/Images";

export default function FavoriteImagesReducer(state, { type, payload }) {
  const { images } = state;
  const { favorites } = images;
  let favoriteImagesUpdated;

  switch (type) {
    case Types.SET_FAVORITE_IMAGES:
      return {
        ...state,
        images: {
          ...images,
          favorites: payload,
        },
      };

    case Types.TOGGLE_FAVORITE_IMAGE:
      const isFavorite = favorites.some((img) => img._id === payload);
      const favoriteImage = images.data.find((img) => img._id === payload);
      favoriteImagesUpdated = favorites.filter((img) => img._id !== payload);
      return {
        ...state,
        images: {
          ...images,
          favorites: isFavorite
            ? favoriteImagesUpdated
            : [favoriteImage, ...favorites],
        },
      };

    case Types.REMOVE_FAVORITE_IMAGE:
      favoriteImagesUpdated = favorites.filter((img) => img._id !== payload);
      return {
        ...state,
        images: {
          ...images,
          favorites: favoriteImagesUpdated,
        },
      };

    default:
      return null;
  }
}
