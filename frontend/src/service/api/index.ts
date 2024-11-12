import { GridRowSelectionModel } from "@mui/x-data-grid";
import axiosInstance from "../../config/axiosInstance";
import {
  IAddress,
  IFormAddress,
  IFormCategory,
  IFormReview,
  IOrderResponse,
  IRequestOrderItem,
  IShippingOptions,
  ISignupUser,
} from "../../interfaces";

export const checkToken = async () => {
  try {
    const response = await axiosInstance.post("/auth/check-token");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

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
    const response = await axiosInstance.get<IOrderResponse>(
      `/users/${userId}/orders/active`
    );
    console.log(response);
    return response.data.orderItems;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchOrder = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}/orders/active`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// export const placeOrder = async (userId: number) => {
//   try {
//     const response = await axiosInstance.put(`/orders/place-order/${userId}`, {
//       datePlaced: Date.now(),
//       status: "PENDING",
//     });
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

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

export const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get(`/products`);
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

export const createUser = async (
  user: ISignupUser,
  role: "CLIENT" | "ADMIN"
) => {
  try {
    const response = await axiosInstance.post(
      `/auth/signup/${role === "CLIENT" ? "client" : "admin"}`,
      user
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (user: FormData) => {
  try {
    const response = await axiosInstance.put(`/auth/update`, user);
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

export const createPreference = async (
  userId: number,
  addressId: number,
  shippingFee: number,
  deliveryMinDays: number,
  deliveryMaxDays: number
) => {
  try {
    const response = await axiosInstance.post(`/payments/preferences`, {
      userId,
      addressId,
      shippingFee,
      deliveryMinDays,
      deliveryMaxDays,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchReviews = async (productId: number) => {
  try {
    const response = await axiosInstance.get(`/products/${productId}/reviews`);
    console.log(response);
    return response.data.reviews;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createReview = async (review: IFormReview, productId: number) => {
  try {
    const response = await axiosInstance.post(
      `/products/${productId}/reviews`,
      review
    );
    console.log(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateReview = async (reviewId: number, review: IFormReview) => {
  try {
    const response = await axiosInstance.put(
      `/products/reviews/${reviewId}`,
      review
    );
    console.log(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteReview = async (reviewId: number) => {
  try {
    const response = await axiosInstance.delete(
      `/products/reviews/${reviewId}`
    );
    console.log(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchBoughtProduct = async (productId: number, userId: number) => {
  try {
    const response = await axiosInstance.get(
      `/products/${productId}/check-purchased?userId=${userId}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
