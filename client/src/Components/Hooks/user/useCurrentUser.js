import { useContext } from "react";
import UserContext from "../../Context/User/UserContext";

/**
 * Get current user logged in the session
 * @returns {Object} The user information
 */ 
export default function useCurrentUser() {
  const contextData = useContext(UserContext);
  if (!contextData) throw new Error("The user context mustn't be null");
  return contextData;
}
