import { useMutation } from "react-query";
import { changePassword } from "../../Helpers/api";

/**
 * Update the user password
 * @returns {Object} The mutation query
 */
export default function useChangePassword() {
  const mutation = useMutation((payload) => changePassword(payload));
  return mutation;
}
