import { useEffect, useState } from "react";
import { IOrderItem } from "../interfaces";
import getOrderItemPrice from "../utils/funcs/orderItemPriceCalculator";

export default function useTotal(cartItems: IOrderItem[] | null) {
  const [total, setTotal] = useState(0);

  const getTotal = () => {
    if (!cartItems) return;

    let sum = 0;
    cartItems.forEach((cartItem) => {
      let price = 0;
      price = getOrderItemPrice(cartItem);
      sum += price;
    });

    setTotal(sum);
  };

  useEffect(() => {
    if (!cartItems?.length) return;

    getTotal();
  }, [cartItems?.length]);

  return { total };
}
