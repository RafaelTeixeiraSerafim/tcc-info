import { useContext } from "react";
import ProductImageInputContext from "./ProductImageInputContext";

export default function useProductImageInputContext() {
  const context = useContext(ProductImageInputContext);

  if (!context) {
    throw new Error(
      "useProductImageInputContext must be used within a ProductImageInputProvider"
    );
  }

  return context;
}
