package com.rafaelteixeiraserafim.tcc.dto;

public record ShippingOptionDto(
        Long id,
        String name,
        String price,
        int deliveryTime
) {
}
