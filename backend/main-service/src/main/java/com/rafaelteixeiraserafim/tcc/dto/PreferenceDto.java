package com.rafaelteixeiraserafim.tcc.dto;

import java.math.BigDecimal;

public record PreferenceDto(
        Long userId,
        Long addressId,
        BigDecimal shippingFee
) {
}
