import { createContext } from "react";

interface IProductImageInputContext {
  isHovering: boolean;
  setIsHovering: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductImageInputContext =
  createContext<IProductImageInputContext | null>(null);

export default ProductImageInputContext;
