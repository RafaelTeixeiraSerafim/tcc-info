import { IOrderItem } from "../interfaces";

const statusMap: { [key: string]: string } = {
  IN_PROGRESS: "Em andamento",
  PENDING: "Em preparação",
  SHIPPED: "A caminho",
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

export const formatDatetime = (date: string) => {
  const newDate = new Date(date);
  return (
    newDate.toLocaleTimeString().substring(0, 5) +
    " - " +
    newDate.toLocaleDateString()
  );
};

const MONTHS = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export const formatDate = (date: string) => {
  const newDate = new Date(date);
  return `${newDate.getDate()} de ${MONTHS[newDate.getMonth()]} de ${newDate.getFullYear()}`;
};

export const daysBetween = (startDate: Date, endDate: Date) => {
  const msPerDay = 24 * 60 * 60 * 1000;

  const startMs = startDate.getTime();
  const endMs = endDate.getTime();

  const diff = Math.abs(endMs - startMs);

  return Math.round(diff / msPerDay);
};
