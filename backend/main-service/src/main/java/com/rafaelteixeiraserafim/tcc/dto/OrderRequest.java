package com.rafaelteixeiraserafim.tcc.dto;

import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;

public record OrderRequest(
        OrderStatus status
) {
}
