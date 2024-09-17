export interface IImage {
  id: number;
  file: File | null | string | ArrayBuffer;
  url?: string;
}

export interface IProduct {
  id: number;
  name: string;
  about: string;
  description: string;
  category: string | ICategory;
  origPrice: string;
  salePrice: string;
  stockQty: string;
  images: IImage[];
  createdAt: string;
  updatedAt: string;
}

export interface IFormProduct {
  name: string;
  about: string;
  description: string;
  categoryId: string;
  origPrice: string;
  salePrice: string;
  stockQty: string;
  images: IImage[];
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  id?: number;
  name: string;
  description: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  profilePic: string;
  about: string;
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}

export interface IUserContextInterface {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  authenticate: () => Promise<void>;
  logoutUser: () => void;
  hasCheckedToken: boolean;
  addedToCart: boolean;
  setAddedToCart: React.Dispatch<React.SetStateAction<boolean>>;
  hasErrorCart: boolean;
  setHasErrorCart: React.Dispatch<React.SetStateAction<boolean>>;
  translateStatus: (status: string) => string;
}

export interface IThemeContextInterface {
  darkMode: boolean;
  toggleTheme: () => void;
}

export interface IOrder {
  id: number;
  user: IUser;
  datePlaced: string;
  status: string;
  orderItems: IOrderItem[];
}

export interface IOrderResponse {
  id: number;
  datePlaced: string;
  status: string;
}

export interface IOrderItemResponse {
  id: number;
  order: IOrderResponse;
  product: IProduct;
  qty: number;
  createdAt: string;
}

export interface IOrderItem {
  id: number;
  product: IProduct;
  qty: number;
  createdAt: string;
}

export interface IBoughtProduct {
  id: number;
  createdAt: string;
}

export interface IOrderTableRow {
  id: number;
  status: string;
  userEmail: string;
  datePlaced: string;
}

export interface IAccountTableRow {
  id: number;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}

export interface IProductTableRow {
  id: number;
  name: string;
  category: string;
  origPrice: string;
  salePrice: string;
  stockQty: string;
}

export interface ICategoryTableRow {
  id: number;
  name: string;
  description: string;
}
