import { useContext } from "react";
import { WishlistContext } from "../contexts";

const useWishlistContext = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlistContext must be used within a provider");
  }
  return context;
};

export default useWishlistContext;
