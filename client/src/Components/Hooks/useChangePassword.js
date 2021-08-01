import { useMutation } from "react-query";
import { changePassword } from "../../Helpers/api";

export default function useChangePassword() {
  const mutation = useMutation((payload) => changePassword(payload));
  return mutation;
}
