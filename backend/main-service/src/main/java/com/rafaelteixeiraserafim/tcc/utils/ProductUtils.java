package com.rafaelteixeiraserafim.tcc.utils;

import com.rafaelteixeiraserafim.tcc.model.Product;

import java.math.BigDecimal;

public final class ProductUtils {
    private ProductUtils() {}

    public static BigDecimal getActivePrice(final Product product) {
        BigDecimal price = product.getOrigPrice();
        if (product.getSalePrice() != null) {
            price = product.getSalePrice();
        }

        return price;
    }
}
