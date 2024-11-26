import React, { useState } from "react";
import ProductImageInputContext from "./ProductImageInputContext";

interface ProductImageInputProviderProps {
  children: React.ReactNode;
}

export default function ProductImageInputProvider({
  children,
}: ProductImageInputProviderProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <ProductImageInputContext.Provider value={{ isHovering, setIsHovering }}>
      {children}
    </ProductImageInputContext.Provider>
  );
}
