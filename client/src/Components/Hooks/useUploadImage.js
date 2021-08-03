import { useMutation } from "react-query";
import { uploadImage } from "../../Helpers/api";

/**
 * Upload an image of the backend
 * @returns {Object} A react-query object with the information of the image uploaded
 */
export default function useUploadImage() {
  const { mutateAsync, ...args } = useMutation((payload) =>
    uploadImage(payload)
  );

  const upload = async (payload) => {
    const newImage = await mutateAsync(payload);
    return newImage;
  };
  return { ...args, upload };
}
