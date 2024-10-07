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
const translateStatus = (status: string): string => {
  return statusMap[status] || status;
};

export default translateStatus;