import { AxiosError } from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { useUserContext } from "../hooks";
import { IWishlistItem } from "../interfaces";
import { useNavigate } from "react-router-dom";

interface IWishlistContext {
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

const WishlistContext = createContext<IWishlistContext | null>(null);

interface WishlistProviderProps {
  children: React.ReactNode;
}

const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const [wishlist, setWishlist] = useState<IWishlistItem[]>([]);
  const { user } = useUserContext();
  const navigate = useNavigate();

  const getWishlist = useCallback(async (userId: number) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}/wishlist`);
      setWishlist(response.data);
    } catch (error) {
      alert(`Erro ao pegar wishlist: ${(error as AxiosError).message}`);
    }
  }, []);

  const getWishlistItem = useCallback(
    (userId: number, productId: number) => {
      return wishlist.find(
        (item) => item.user.id === userId && item.product.id === productId
      );
    },
    [wishlist]
  );

  const addItem = async (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: number
  ) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }
    
    try {
      await axiosInstance.post("/users/wishlist/item", {
        userId: user.id,
        productId,
      });
      await getWishlist(user.id);
    } catch (error) {
      alert(`Erro ao adicionar favorito: ${(error as AxiosError).message}`);
    }
  };

  const removeItem = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>, wishlistItemId: number) => {
      e.stopPropagation();
      e.preventDefault();

      try {
        await axiosInstance.delete(`/users/wishlist/item/${wishlistItemId}`);
        setWishlist((prevWishlist) =>
          prevWishlist.filter((item) => item.id !== wishlistItemId)
        );
      } catch (error) {
        alert(`Erro ao adicionar favorito: ${(error as AxiosError).message}`);
      }
    },
    []
  );

  useEffect(() => {
    if (!user) return;
    getWishlist(user.id);
  }, [user, getWishlist]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, getWishlistItem, addItem, removeItem }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export { WishlistContext, WishlistProvider };
