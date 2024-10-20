package com.rafaelteixeiraserafim.tcc.dto;

import java.math.BigDecimal;

public record ShippingOptionRequestProduct(
        Long id,
        BigDecimal width,
        BigDecimal height,
        BigDecimal length,
        BigDecimal weight,
        BigDecimal insurance_value,
        int quantity
) {
}
