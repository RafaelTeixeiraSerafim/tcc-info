import { IOrderItem } from "../interfaces";

const statusMap: { [key: string]: string } = {
  IN_PROGRESS: "Em andamento",
  PENDING: "Pendente",
  SHIPPED: "Enviado",
  DELIVERED: "Entregue",
};

/**
 * Translates a given status from english to portuguese
 * @param status - The status to be translated.
 * @returns The translated status or the original status if not found.
 */
export const translateStatus = (status: string): string => {
  return statusMap[status] || status;
};

/**
 * Calculates the price of a given order item
 * @param orderItem - The order item to be calculated.
 * @returns The subtotal price of the order item.
 */
export const getOrderItemPrice = (orderItem: IOrderItem) => {
  return (
    orderItem.qty *
    (parseFloat(orderItem.product.salePrice) ||
      parseFloat(orderItem.product.origPrice))
  );
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const formatPriceInputForBackend = (value: string) => {
  return value.replace(",", ".");
};

export const formatPriceInputForFrontend = (value: string) => {
  return value.replace(".", ",");
};