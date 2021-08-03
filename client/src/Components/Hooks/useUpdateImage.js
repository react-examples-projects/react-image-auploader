import { updateImage } from "../../Helpers/api";
import { useMutation } from "react-query";

/**
 * Update an image from backend
 * @returns {Object} The image object to update
 */
export default function useUpdateImage() {
  const mutation = useMutation(({id, ...payload}) =>
    updateImage(id, payload)
  );
  return mutation;
}
