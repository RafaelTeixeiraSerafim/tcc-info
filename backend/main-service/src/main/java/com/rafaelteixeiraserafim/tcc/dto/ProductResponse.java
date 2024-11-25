package com.rafaelteixeiraserafim.tcc.dto;

import com.rafaelteixeiraserafim.tcc.model.Category;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public record ProductResponse(
        Long id,
        Category category,
        String name,
        String about,
        String description,
        BigDecimal origPrice,
        BigDecimal salePrice,
        int stockQty,
        BigDecimal length,
        BigDecimal width,
        BigDecimal height,
        BigDecimal weight,
        Date createdAt,
        Date updatedAt,
        boolean deactivated,
        List<ProductImageResponse> images,
        float rating,
        int numOfReviews
) {
}
