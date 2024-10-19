package com.rafaelteixeiraserafim.tcc.dto;

import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;

import java.util.Date;

public record OrderResponse(
        Long id,
        Date datePlaced,
        OrderStatus status
) {
}
