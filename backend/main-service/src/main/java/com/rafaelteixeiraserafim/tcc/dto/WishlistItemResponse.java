package com.rafaelteixeiraserafim.tcc.dto;

import com.rafaelteixeiraserafim.tcc.model.User;

import java.util.Date;

public record WishlistItemResponse(
        Long id,
        User user,
        ProductResponse product,
        Date createdAt
) {
}
