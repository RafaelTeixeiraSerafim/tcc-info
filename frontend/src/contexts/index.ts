import { createContext } from "react";
import { AddressContextInterface, IAdminNotificationContext, ICartContext, IThemeContextInterface, IUserContextInterface, IWishlistContext } from "../interfaces";

export const CartContext = createContext<ICartContext | null>(null);

export const AdminNotificationContext =
  createContext<IAdminNotificationContext | null>(null);

export const ThemeContext = createContext<IThemeContextInterface | null>(null);

export const UserContext = createContext<IUserContextInterface | null>(null);

export const WishlistContext = createContext<IWishlistContext | null>(null);

export const AddressContext = createContext<AddressContextInterface | null>(null);
