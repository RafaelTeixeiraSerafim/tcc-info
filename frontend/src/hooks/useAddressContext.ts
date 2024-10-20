import { useContext } from "react";
import AddressContext from "../contexts/AddressContext";

const useAddressContext = () => {
  const context = useContext(AddressContext);

  if (!context) {
    throw new Error("useModalContext must be used within a Modal");
  }
  return context;
};

export default useAddressContext;
