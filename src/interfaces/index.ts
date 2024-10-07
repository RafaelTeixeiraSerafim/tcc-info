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
  createdAt: string;
  updatedAt: string;
}

export interface ICategoryTableRow {
  id: number;
  name: string;
  description: string;
}

export interface IFormAddress {
  userId: number;
  fullName: string;
  postalCode: string;
  state: string;
  city: string;
  neighbourhood: string;
  street: string;
  houseNumber: string;
  apartmentNumber: string;
  contactPhone: string;
}

export interface IAddress extends IFormAddress {
  id: number;
}
