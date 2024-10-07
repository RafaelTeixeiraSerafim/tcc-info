import { IOrderItem } from "../../interfaces";

/**
 * Calculates the total price of a given order item
 * @param orderItem - The order item to be calculated.
 * @returns The total price of the order item.
 */
const getOrderItemPrice = (orderItem: IOrderItem) => {
  return (
    orderItem.qty *
    (parseFloat(orderItem.product.salePrice) ||
      parseFloat(orderItem.product.origPrice))
  );
};

export default getOrderItemPrice;