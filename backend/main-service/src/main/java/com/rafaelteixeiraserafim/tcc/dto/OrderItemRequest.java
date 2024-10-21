package com.rafaelteixeiraserafim.tcc.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record OrderItemRequest(
        @NotNull @Min(1) Long userId,
        @NotNull @Min(1) Long productId,
        @NotNull @Min(1) int qty
) {
}
