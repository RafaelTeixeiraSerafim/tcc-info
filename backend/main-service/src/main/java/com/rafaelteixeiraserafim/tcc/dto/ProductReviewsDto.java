package com.rafaelteixeiraserafim.tcc.dto;

import com.rafaelteixeiraserafim.tcc.model.Review;

import java.util.List;

public record ProductReviewsDto(
        List<Review> reviews
) {
}
