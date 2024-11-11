export interface IImage {
  id: number | string;
  file: File | null | string | ArrayBuffer;
  url?: string;
}

export interface IUserImage {
  file: File | null | string | ArrayBuffer;
  url?: string;
}

export interface IProduct {
  id: number;
  name: string;
  about: string;
  description: string;
  category: ICategory;
  origPrice: string;
  salePrice: string;
  stockQty: string;
  length: string;
  width: string;
  height: string;
  weight: string;
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
  length: string;
  width: string;
  height: string;
  weight: string;
  images: IImage[];
  createdAt: string;
  updatedAt: string;
}

export interface IFormCategory {
  name: string;
  description: string;
}

export interface ICategory extends IFormCategory {
  id: number;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  profilePic: string;
  role: "CLIENT" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateUser {
  username: string;
  email: string;
  profilePic: IUserImage;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface ISignupUser {
  username: string;
  email: string;
  password: string;
}

export interface IOrder {
  id: number;
  user: IUser;
  addressId: number;
  shippingFee: number;
  datePlaced: string;
  status: "PENDING" | "SHIPPED" | "DELIVERED";
  orderItems: IOrderItem[];
}

export interface IOrderResponse {
  id: number;
  datePlaced: string;
  dateDelivered: string | null;
  status: "PENDING" | "SHIPPED" | "DELIVERED";
  address: IAddress;
  shippingFee: number;
  deliveryMinDays: number;
  deliveryMaxDays: number;
  totalPrice: number;
  orderItems: IOrderItemResponse[];
}

export interface IOrderItemResponse {
  id: number;
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

export interface IRequestOrderItem {
  userId: number;
  productId: number;
  qty: number;
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
  role: "CLIENT" | "ADMIN";
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

export interface IShippingOptions {
  options: IShippingOption[];
}

export interface IShippingOption {
  id: number;
  name: string;
  price: string;
  deliveryMinDays: number;
  deliveryMaxDays: number;
}

export interface IReview {
  id: number;
  user: IUser;
  product: IProduct;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface IFormReview {
  userId: number;
  rating: number;
  title: string;
  comment: string;
}
