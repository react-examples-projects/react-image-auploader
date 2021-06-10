import { createComment } from "../../Helpers/api";
import { useMutation } from "react-query";

export default function useImages() {
  const createCommentImage = useMutation((payload) => createComment(payload));

  return {
    createCommentImage,
  };
}
