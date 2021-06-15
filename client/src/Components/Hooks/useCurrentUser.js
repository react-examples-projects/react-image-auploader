import { useContext } from "react";
import UserContext from "../Context/UserContext";

export default function useCurrentUser() {
  const contextData = useContext(UserContext);
  if (!contextData) throw new Error("The user context mustn't be null");
  return contextData;
}
