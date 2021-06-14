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
    const newImage = await mutateAsync(payload);
    return newImage;
  };
  return { ...args, upload };
}
