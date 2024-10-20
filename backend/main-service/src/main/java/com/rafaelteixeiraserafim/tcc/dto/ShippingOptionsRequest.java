package com.rafaelteixeiraserafim.tcc.dto;

import java.util.List;

public record ShippingOptionsRequest(
        ShippingFromToDto from,
        ShippingFromToDto to,
        List<ShippingOptionRequestProduct> products
) {
}
