package com.rafaelteixeiraserafim.tcc.dto;

import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;

import java.util.Date;

public record OrderRequest(
        Date datePlaced,
        OrderStatus status
) {
}
