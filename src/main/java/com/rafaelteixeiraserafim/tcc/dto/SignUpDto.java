package com.rafaelteixeiraserafim.tcc.dto;

import jakarta.validation.constraints.NotNull;

public record SignUpDto(
        @NotNull
        String username,
        @NotNull
        String email,
        @NotNull
        String password
) {
}
