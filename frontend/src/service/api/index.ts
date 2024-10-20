import { GridRowSelectionModel } from "@mui/x-data-grid";
import axiosInstance from "../../config/axiosInstance";
import {
  IAddress,
  IFormAddress,
  IFormCategory,
  IOrderItem,
  IRequestOrderItem,
  IShippingOptions,
  ISignupUser,
} from "../../interfaces";

export const createCartItem = async (orderItem: IRequestOrderItem) => {
  try {
    const response = await axiosInstance.post(`/order-items`, orderItem);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCartItem = async (cartItemId: number) => {
  try {
    const response = await axiosInstance.delete(`/order-items/${cartItemId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchCartItems = async (userId: number) => {
  try {
    const response = await axiosInstance.get<IOrderItem[]>(
      `/order-items/${userId}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchOrder = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`/orders/user/${userId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const placeOrder = async (userId: number) => {
  try {
    const response = await axiosInstance.put(`/orders/place-order/${userId}`, {
      datePlaced: Date.now(),
      status: "PENDING",
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAddress = async (addressId: number) => {
  try {
    const response = await axiosInstance.get(`/addresses/${addressId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchUserAddresses = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`/addresses?userId=${userId}`);
    console.log(response);
    return response.data.addresses;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAddressByPostalCode = async (postalCode: string) => {
  try {
    const response = await axiosInstance.get(
      `/addresses/postal-code/${postalCode}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createAddress = async (address: IFormAddress, userId: number) => {
  try {
    const response = await axiosInstance.post("/addresses", {
      ...address,
      userId,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateAddress = async (address: IAddress) => {
  try {
    const response = await axiosInstance.put(
      `/addresses/${address.id}`,
      address
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteAddress = async (addressId: number) => {
  try {
    const response = await axiosInstance.delete(`/addresses/${addressId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAdmins = async () => {
  try {
    const response = await axiosInstance.get("/users/admins");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchStatusList = async () => {
  try {
    const response = await axiosInstance.get("/orders/status");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateOrder = async (orderId: number, selectedStatus: string) => {
  try {
    const response = await axiosInstance.patch(`/orders/${orderId}`, {
      status: selectedStatus,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCategories = async (
  selectionModel: GridRowSelectionModel
) => {
  try {
    const response = await axiosInstance.delete("/categories/batch-delete", {
      data: selectionModel,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createCategory = async (category: IFormCategory) => {
  try {
    const response = await axiosInstance.post("/categories", category);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCategory = async (
  categoryId: number,
  category: IFormCategory
) => {
  try {
    const response = await axiosInstance.post(
      `/categories/${categoryId}`,
      category
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchProduct = async (productId: number) => {
  try {
    const response = await axiosInstance.get(`/products/${productId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createProduct = async (formData: FormData) => {
  try {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const response = await axiosInstance.post("/products", formData, config);

    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProduct = async (productId: number, formData: FormData) => {
  try {
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const response = await axiosInstance.put(
      `/products/${productId}`,
      formData,
      config
    );

    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createUser = async (user: ISignupUser, role: "USER" | "ADMIN") => {
  try {
    const response = await axiosInstance.post(
      `/auth/signup/${role === "USER" ? "user" : "admin"}`,
      user
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchShippingOptions = async (
  userId: number,
  postalCode: string
) => {
  try {
    const response = await axiosInstance.get<IShippingOptions>(
      `/shipping/calculate?userId=${userId}&postalCode=${postalCode}`
    );
    console.log(response);
    return response.data.options;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
