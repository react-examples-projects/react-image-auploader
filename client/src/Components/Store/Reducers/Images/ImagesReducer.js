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

    default:
      return state;
  }
}
