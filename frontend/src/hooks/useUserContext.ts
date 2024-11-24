import { useContext } from "react";
import { UserContext } from "../contexts";

const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a provider");
  }
  return context;
};

export default useUserContext;