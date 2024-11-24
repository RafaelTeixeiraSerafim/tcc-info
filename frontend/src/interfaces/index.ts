import { AxiosError } from "axios";

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
  rating: number;
  numOfReviews: number;
  createdAt: string;
  updatedAt: string | null;
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
}

export interface IFormCategory {
  name: string;
  description: string;
}

export interface ICategory extends IFormCategory {
  id: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  profilePic: string;
  role: "CLIENT" | "ADMIN";
  enabled: boolean;
  createdAt: string;
  updatedAt: string | null;
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
  address: IAddress;
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
  enabled: boolean;
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

export interface IAdminNotificationTableRow {
  id: number;
  product: IProduct;
  description: string;
  severity: string;
  createdAt: string;
}

export interface ICategoryTableRow {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
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

export interface IWishlistItem {
  id: number;
  user: IUser;
  product: IProduct;
  createdAt: string;
}

export interface INotification {
  id: number;
  product: IProduct;
  type: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  description: string;
  read: boolean;
  createdAt: string;
}

export interface ICartContext {
  cartItems: IOrderItem[];
  addedToCart: boolean;
  setAddedToCart: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddToCart: (productId: number, qty: number) => Promise<void>;
  handleDeleteFromCart: (
    e: React.MouseEvent<HTMLButtonElement>,
    cartItemId: number
  ) => Promise<void>;
  hasErrorCart: boolean;
  setHasErrorCart: React.Dispatch<React.SetStateAction<boolean>>;
  subtotal: number;
  total: number;
  shippingOptions: IShippingOption[];
}

export interface IAdminNotificationContext {
  unreadNotifications: INotification[];
  readNotifications: INotification[];
  getReadNotifications: () => Promise<void>;
  readSelectedNotifications: (ids: number[]) => Promise<void>;
  unreadSelectedNotifications: (ids: number[]) => Promise<void>;
}

export interface IThemeContextInterface {
  darkMode: boolean;
  toggleTheme: () => void;
}

export interface IUserContextInterface {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  authenticate: () => Promise<void>;
  logoutUser: () => Promise<void>;
  hasCheckedToken: boolean;
}

export interface IWishlistContext {
  wishlist: IWishlistItem[];
  getWishlistItem: (
    userId: number,
    productId: number
  ) => IWishlistItem | undefined;
  addItem: (e: React.MouseEvent<HTMLButtonElement>, productId: number) => void;
  removeItem: (
    e: React.MouseEvent<HTMLButtonElement>,
    wishlistItemId: number
  ) => void;
}

export interface AddressContextInterface {
  incompleteAddress: IFormAddress | null;
  selectedAddress: IAddress | null;
  getFromLocalStorage: () => void;
  postalCode: string | null;
  userAddresses: IAddress[];
  handleDelete: (addressId: number) => Promise<void>;
  getAddresses: (userId: number) => Promise<void>;
  changeSelectedAddressById: (id: number) => void;
  clearSelectedAddress: () => void;
  shippingOptions: IShippingOption[];
  selectedShippingOption: IShippingOption | null;
  changeSelectedShippingOption: (shippingOption: IShippingOption) => void;
}

export interface IPasswordForm {
  curPassword: string;
  newPassword: string;
}

export interface IFieldError {
  message: string;
  onSubmit?: (value: string) => boolean;
  onError?: (e: AxiosError) => boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => boolean;
}

export interface IAuthErrors {
  [key: string]: IFieldError[] | undefined;
  root?: IFieldError[];
}

export interface IField {
  name: string;
  error: string;
}
