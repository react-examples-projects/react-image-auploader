import { deleteImage } from "../../Helpers/api";
import { useMutation } from "react-query";

/**
 * Delete an images from backend
 * @returns {Object} The image object deleted
 */
export default function useImageDelete() {
  const mutation = useMutation((id) => deleteImage(id));
  return mutation;
}
