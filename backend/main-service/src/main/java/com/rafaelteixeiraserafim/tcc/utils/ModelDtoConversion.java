package com.rafaelteixeiraserafim.tcc.utils;

import com.rafaelteixeiraserafim.tcc.dto.OrderItemResponse;
import com.rafaelteixeiraserafim.tcc.dto.OrderResponse;
import com.rafaelteixeiraserafim.tcc.dto.ProductImageResponse;
import com.rafaelteixeiraserafim.tcc.dto.ProductResponse;
import com.rafaelteixeiraserafim.tcc.model.Order;
import com.rafaelteixeiraserafim.tcc.model.OrderItem;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.model.ProductImage;

import java.util.ArrayList;
import java.util.List;

public final class ModelDtoConversion {
    public static OrderItemResponse createOrderItemResponse(OrderItem orderItem) {
        ProductResponse productResponse = ModelDtoConversion.createProductResponse(orderItem.getProduct());
        return new OrderItemResponse(orderItem.getId(), productResponse, orderItem.getQty(), orderItem.getCreatedAt());
    }
    public static List<OrderItemResponse> createOrderItemResponses(List<OrderItem> orderItems) {
        List<OrderItemResponse> orderItemResponses = new ArrayList<>();

        for (OrderItem orderItem : orderItems) {
            orderItemResponses.add(ModelDtoConversion.createOrderItemResponse(orderItem));
        }

        return orderItemResponses;
    }

    public static OrderResponse createActiveOrderResponse(Order order) {
        List<OrderItemResponse> orderItems = ModelDtoConversion.createOrderItemResponses(order.getOrderItems());
        return new OrderResponse(order.getId(), order.getUser(), order.getDatePlaced(), order.getDateDelivered(), order.getStatus(), null, order.getShippingFee(), order.getDeliveryMinDays(), order.getDeliveryMaxDays(), null, orderItems);
    }

    public static List<ProductImageResponse> createProductImageResponses(List<ProductImage> productImages) {
        List<ProductImageResponse> productImageResponses = new ArrayList<>();
        for (ProductImage productImage : productImages) {
            productImageResponses.add(new ProductImageResponse(productImage.getId(), productImage.getUrl()));
        }

        return productImageResponses;
    }

    public static ProductResponse createProductResponse(Product product) {
        List<ProductImageResponse> imageResponses = ModelDtoConversion.createProductImageResponses(product.getImages());
        return new ProductResponse(product.getId(),
                product.getCategory(),
                product.getName(),
                product.getAbout(),
                product.getDescription(),
                product.getOrigPrice(),
                product.getSalePrice(),
                product.getStockQty(),
                product.getLength(),
                product.getWidth(),
                product.getHeight(),
                product.getWeight(),
                product.getCreatedAt(),
                product.getUpdatedAt(),
                imageResponses);
    }

    public static List<ProductResponse> createProductResponses(List<Product> products) {
        List<ProductResponse> productResponses = new ArrayList<>();
        for (Product product : products) {
            productResponses.add(ModelDtoConversion.createProductResponse(product));
        }
        return productResponses;
    }
}
