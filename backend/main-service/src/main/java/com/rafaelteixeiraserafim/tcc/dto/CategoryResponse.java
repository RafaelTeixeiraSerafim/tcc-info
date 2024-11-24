package com.rafaelteixeiraserafim.tcc.dto;

import java.util.Date;

public record CategoryResponse(
        Long id,
        String name,
        String description,
        Date createdAt,
        Date updatedAt
) {
}
