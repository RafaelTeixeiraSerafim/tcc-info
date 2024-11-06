package com.rafaelteixeiraserafim.tcc.dto;

import com.rafaelteixeiraserafim.tcc.model.Product;

public record BoughtProductQty(
        Product product,
        int qty
) {
}
