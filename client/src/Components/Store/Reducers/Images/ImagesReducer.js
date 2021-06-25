import Types from "../../Actions/Types/Images";

export default function ImagesReducer(state, action) {
  switch (action.type) {
    case Types.ADD_IMAGE:
      return {
        ...state,
        images: {
          ...state.images,
          data: [action.payload, ...state.images.data],
        },
      };

    case Types.SET_IMAGES:
      return {
        ...state,
        images: action.payload,
      };

    case Types.ADD_COMMENT_IMAGES:
      const imagesCopy = [...state.images.data];
      const imagesUpdated = imagesCopy.map((image) => {
        if (action.payload.imageId === image._id) {
          // Add comment to the specific image
          delete action.payload.imageId;
          image.comments = [...image.comments, action.payload];
        }
        return image;
      });
      return {
        ...state,
        images: {
          ...state.images,
          data: imagesUpdated,
        },
      };

    default:
      return state;
  }
}
