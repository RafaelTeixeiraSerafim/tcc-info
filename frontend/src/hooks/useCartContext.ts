import { useContext } from "react";
import { CartContext } from "../contexts";

export default function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within a provider");
  }
  return context;
}
