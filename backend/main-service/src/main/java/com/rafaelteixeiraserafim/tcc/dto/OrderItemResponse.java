package com.rafaelteixeiraserafim.tcc.dto;

import com.rafaelteixeiraserafim.tcc.model.Product;

import java.util.Date;

public record OrderItemResponse(
        Long id,
        OrderResponse order,
        Product product,
        int qty,
        Date createdAt
) {
}
