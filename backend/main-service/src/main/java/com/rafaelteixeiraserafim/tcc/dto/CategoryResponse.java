package com.rafaelteixeiraserafim.tcc.dto;

import java.util.Date;

public record CategoryResponse(
        Long id,
        String name,
        String description,
        boolean deactivated,
        Date createdAt,
        Date updatedAt
) {
}
