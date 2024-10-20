package com.rafaelteixeiraserafim.tcc.dto;

public record OrderItemRequest(
        Long userId,
        Long productId,
        int qty
) {
}
