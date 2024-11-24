import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useAddressContext, useUserContext } from "../hooks";
import useTotal from "../hooks/useTotal";
import { IOrderItem } from "../interfaces";
import { createCartItem, deleteCartItem, fetchCartItems } from "../service/api";
import { CartContext } from ".";

interface CartProviderProps {
  children: React.ReactNode;
}

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<IOrderItem[]>([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [hasErrorCart, setHasErrorCart] = useState(false);
  const [total, setTotal] = useState(0);

  const { subtotal } = useTotal(cartItems);
  const { user } = useUserContext();
  const { postalCode, selectedShippingOption, shippingOptions } =
    useAddressContext();

  const getCartItems = async (userId: number) => {
    try {
      const cartItems = await fetchCartItems(userId);
      setCartItems(cartItems);
    } catch (error) {
      alert(
        `Erro pegando os itens do carrinho: ${(error as AxiosError).message}`
      );
    }
  };

  const handleAddToCart = async (productId: number, qty: number) => {
    if (!user) {
      throw Error("User is not logged in");
    }

    const data = {
      userId: user.id,
      productId: productId,
      qty,
    };

    try {
      const orderItem = await createCartItem(data);
      const exists = Boolean(
        cartItems.find((cartItem) => cartItem.id === orderItem.id)
      );

      if (exists) {
        setCartItems(
          cartItems.map((cartItem) =>
            cartItem.id === orderItem.id ? orderItem : cartItem
          )
        );
      } else {
        setCartItems([...cartItems, orderItem]);
      }
      setAddedToCart(true);
    } catch (error) {
      alert(
        `Erro ao adicionar item ao carrinho: ${(error as AxiosError).message}`
      );
      setHasErrorCart(true);
    }
  };

  const handleDeleteFromCart = async (
    e: React.MouseEvent<HTMLButtonElement>,
    cartItemId: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await deleteCartItem(cartItemId);
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== cartItemId));
    } catch (error) {
      alert(`Erro excluindo o item: ${(error as AxiosError).message}`);
    }
  };

  useEffect(() => {
    if (!user) return;
    getCartItems(user.id);
  }, [user]);

  useEffect(() => {
    if (!user || !postalCode) return;
    console.log("Getting shipping options");
  }, [user, cartItems, postalCode]);

  useEffect(() => {
    setTotal(
      subtotal +
        (selectedShippingOption ? parseFloat(selectedShippingOption.price) : 0)
    );
  }, [subtotal, selectedShippingOption]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addedToCart,
        setAddedToCart,
        handleAddToCart,
        handleDeleteFromCart,
        hasErrorCart,
        setHasErrorCart,
        subtotal,
        total,
        shippingOptions,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
