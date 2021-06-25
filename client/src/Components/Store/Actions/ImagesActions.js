import Types from "./Types/Images";

export function addImageAction(payload) {
  return {
    payload,
    type: Types.ADD_IMAGE,
  };
}

export function setImagesAction(payload) {
  return {
    payload,
    type: Types.SET_IMAGES,
  };
}

export function addCommentImages(payload) {
  return {
    payload,
    type: Types.ADD_COMMENT_IMAGES,
  };
}
