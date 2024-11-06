package com.rafaelteixeiraserafim.tcc.dto;

public record ReviewDto(
        Long userId,
        float rating,
        String title,
        String comment
) {
}
