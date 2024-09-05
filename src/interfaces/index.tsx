export interface Image {
  id: number;
  file?: File | null | string;
  preview?: string | ArrayBuffer | null;
  url?: string;
}

export interface ProductItem {
  id: number;
  origPrice: string;
  salePrice: string;
  stockQty: string;
  weight: string;
  weightUnit: string;
  images: Image[];
}

export interface Product {
  id?: number;
  name: string;
  about: string;
  description: string;
  category: string | Category;
  productItems: ProductItem[];
}

export interface Category {
  id: number;
  name: string;
  description: string;
}
