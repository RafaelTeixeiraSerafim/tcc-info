import { useEffect, useState } from "react";
import { IOrderItem } from "../interfaces";
import { getOrderItemPrice } from "../utils/helpers";

export default function useTotal(cartItems: IOrderItem[]) {
  const [subtotal, setSubtotal] = useState(0);

  const getSubtotal = (cartItems: IOrderItem[]) => {
    let sum = 0;
    cartItems.forEach((cartItem) => {
      let price = 0;
      price = getOrderItemPrice(cartItem);
      sum += price;
    });

    setSubtotal(sum);
  };

  useEffect(() => {
    if (!cartItems.length) return;

    getSubtotal(cartItems);
  }, [cartItems]);

  return { subtotal };
}
