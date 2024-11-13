package com.rafaelteixeiraserafim.tcc.dto;

public record WishlistItemRequest(
        Long userId,
        Long productId
) {
}
