import { IFormAddress, IFormProduct } from "../interfaces";

export const emptyFormAddress: IFormAddress = {
  userId: 0,
  fullName: "",
  postalCode: "",
  state: "",
  city: "",
  neighbourhood: "",
  street: "",
  houseNumber: "",
  apartmentNumber: "",
  contactPhone: "",
};

export const defaultFormProduct: IFormProduct = {
  name: "",
  about: "",
  description: "",
  categoryId: "",
  origPrice: "",
  salePrice: "",
  stockQty: "",
  length: "",
  width: "",
  height: "",
  weight: "",
  images: [
    {
      id: "1",
      file: null,
    },
    {
      id: "2",
      file: null,
    },
    {
      id: "3",
      file: null,
    },
  ],
  createdAt: "",
  updatedAt: "",
};
