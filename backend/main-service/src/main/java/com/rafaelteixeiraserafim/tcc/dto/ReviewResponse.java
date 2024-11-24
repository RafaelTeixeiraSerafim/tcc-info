package com.rafaelteixeiraserafim.tcc.dto;

import com.rafaelteixeiraserafim.tcc.model.User;

import java.util.Date;

public record ReviewResponse(
        Long id,
        User user,
        float rating,
        String title,
        String comment,
        Date createdAt,
        Date updatedAt
) {
}
