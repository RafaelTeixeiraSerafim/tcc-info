package com.rafaelteixeiraserafim.tcc.dto;

import com.rafaelteixeiraserafim.tcc.model.Product;

import java.util.Date;

public record OrderItemResponse(
        Long id,
        ProductResponse product,
        int qty,
        Date createdAt
) {
}
