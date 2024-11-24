package com.rafaelteixeiraserafim.tcc.dto;

import com.rafaelteixeiraserafim.tcc.enums.UserRole;

import java.util.Date;

public record UserResponse(
        Long id,
        String username,
        String email,
        String profilePic,
        UserRole role,
        boolean enabled,
        Date createdAt,
        Date updatedAt
) {
}
