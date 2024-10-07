import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useModalContext must be used within a Modal");
  }
  return context;
};

export default useUserContext;