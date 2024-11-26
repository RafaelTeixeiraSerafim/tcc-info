package com.rafaelteixeiraserafim.tcc.dto;

import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;
import com.rafaelteixeiraserafim.tcc.model.OrderItem;
import com.rafaelteixeiraserafim.tcc.model.User;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public record OrderResponse(
        Long id,
        User user,
        Date datePlaced,
        Date dateDelivered,
        OrderStatus status,
        AddressDto address,
        BigDecimal shippingFee,
        int deliveryMinDays,
        int deliveryMaxDays,
        BigDecimal totalPrice,
        List<OrderItemResponse> orderItems,
        Date updatedAt
) {
}
