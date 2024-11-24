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

export const daysIn = (date: Date) => {
  const msPerDay = 24 * 60 * 60 * 1000;

  const ms = date.getTime();

  return Math.round(ms / msPerDay);
};

export const daysBetween = (startDate: Date, endDate: Date) => {
  const msPerDay = 24 * 60 * 60 * 1000;

  const startMs = startDate.getTime();
  const endMs = endDate.getTime();

  const diff = Math.abs(endMs - startMs);

  return Math.round(diff / msPerDay);
};

export const getSalePercent = (origPrice: number, salePrice: number) => {
  return Math.round(100 - (salePrice * 100) / origPrice);
};

export const formatPhone = (phone: string) => {
  const sanitizedPhone = phone.replace(/\D/g, "").slice(0, 11);
  
  if (sanitizedPhone.length === 0) return sanitizedPhone;

  if (sanitizedPhone.length <= 2) {
    return `(${sanitizedPhone}`; // Start with the DDD
  }

  if (sanitizedPhone.length <= 6) {
    return `(${sanitizedPhone.slice(0, 2)}) ${sanitizedPhone.slice(2)}`; // Format as (DD) XXXX
  }

  // Full formatting for 10 or 11 characters
  return `(${sanitizedPhone.slice(0, 2)}) ${sanitizedPhone.slice(2, sanitizedPhone.length - 4)}-${sanitizedPhone.slice(-4)}`;
};

export const formatPostalCode = (postalCode: string) => {
  // Remove non-numeric characters
  const sanitizedInput = postalCode.replace(/\D/g, "").slice(0, 8); // Max length: 8 digits

  // Apply formatting: first 5 digits, then a hyphen, then 3 digits
  if (sanitizedInput.length <= 5) {
    return sanitizedInput; // Return as is if less than or equal to 5 digits
  }

  return sanitizedInput.replace(/^(\d{5})(\d{1,3})$/, "$1-$2");
};

export const sanitizePostalCode = (postalCode: string) => {
  return postalCode.split("-").join("");
};
