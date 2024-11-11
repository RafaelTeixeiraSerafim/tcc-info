package com.rafaelteixeiraserafim.tcc.dto;

import com.rafaelteixeiraserafim.tcc.model.Product;

public record BoughtProductQty(
        ProductResponse product,
        int qty
) {
}
