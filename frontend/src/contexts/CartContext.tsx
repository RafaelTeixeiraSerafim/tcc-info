import React, { createContext, useEffect, useState } from "react";
import useTotal from "../hooks/useTotal";
import { IOrderItem, IShippingOption } from "../interfaces";
import { useAddressContext, useUserContext } from "../hooks";
import {
  createCartItem,
  deleteCartItem,
  fetchCartItems,
  fetchShippingOptions,
} from "../service/api";
import { AxiosError } from "axios";

interface ICartContext {
  cartItems: IOrderItem[];
  addedToCart: boolean;
  setAddedToCart: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddToCart: (productId: number, qty: number) => Promise<void>;
  handleDeleteFromCart: (cartItemId: number) => Promise<void>;
  hasErrorCart: boolean;
  setHasErrorCart: React.Dispatch<React.SetStateAction<boolean>>;
  subtotal: number;
  total: number;
  shippingOptions: IShippingOption[];
  selectedShippingOption: IShippingOption | null;
  setSelectedShippingOption: React.Dispatch<
    React.SetStateAction<IShippingOption | null>
  >;
}

const CartContext = createContext<ICartContext | null>(null);

interface CartProviderProps {
  children: React.ReactNode;
}

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<IOrderItem[]>([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [hasErrorCart, setHasErrorCart] = useState(false);
  const [shippingOptions, setShippingOptions] = useState<IShippingOption[]>([]);
  const [selectedShippingOption, setSelectedShippingOption] =
    useState<IShippingOption | null>(null);
  const [total, setTotal] = useState(0);

  const { subtotal } = useTotal(cartItems);
  const { user } = useUserContext();
  const { postalCode } = useAddressContext();

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

  const getShippingOptions = async (userId: number, postalCode: string) => {
    try {
      const shippingOptions = await fetchShippingOptions(userId, postalCode);
      setShippingOptions(shippingOptions);

      if (shippingOptions.length > 0) {
        let tempOption = {
          id: 0,
          name: "",
          price: Number.MAX_SAFE_INTEGER.toString(),
          deliveryTime: 0,
        };

        shippingOptions.map((option) => {
          if (parseFloat(option.price) < parseFloat(tempOption.price))
            tempOption = option;
        });

        setSelectedShippingOption(tempOption);
      }
    } catch (error) {
      alert(`Erro ao calcular o frete: ${(error as AxiosError).message}`);
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
      setAddedToCart(true);
      if (cartItems.length > 0)
        setCartItems(
          cartItems.map((cartItem) =>
            cartItem.id === orderItem.id ? orderItem : cartItem
          )
        );
      else setCartItems([orderItem]);
    } catch (error) {
      alert(
        `Erro ao adicionar item ao carrinho: ${(error as AxiosError).message}`
      );
      setHasErrorCart(true);
    }
  };

  const handleDeleteFromCart = async (cartItemId: number) => {
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

    getShippingOptions(user.id, postalCode);
  }, [user, cartItems, postalCode]);

  console.log(postalCode);

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
        selectedShippingOption,
        setSelectedShippingOption,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
export { CartProvider };
