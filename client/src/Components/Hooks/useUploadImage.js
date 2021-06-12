import { useMutation } from "react-query";
import { uploadImage } from "../../Helpers/api";
import useCurrentUser from "./useCurrentUser";

export default function useUploadImage() {
  const { user } = useCurrentUser();
  const { mutateAsync, ...args } = useMutation((payload) =>
    uploadImage(payload)
  );

  const upload = async (data) => {
    const payload = new FormData(data);
    payload.append("name", user.name);
    const { url: url_image, _id } = await mutateAsync(payload);
    const newImage = { name: user.name, url_image, _id };
    return newImage;
  };
  return { ...args, upload };
}
