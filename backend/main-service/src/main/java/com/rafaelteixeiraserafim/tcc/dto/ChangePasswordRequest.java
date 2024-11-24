package com.rafaelteixeiraserafim.tcc.dto;

import jakarta.validation.constraints.NotNull;

public record ChangePasswordRequest(
        @NotNull
        String curPassword,

        @NotNull
        String newPassword
) {
}
