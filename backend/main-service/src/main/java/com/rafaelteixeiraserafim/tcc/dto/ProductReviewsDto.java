package com.rafaelteixeiraserafim.tcc.dto;

import java.util.List;

public record ProductReviewsDto(
        List<ReviewResponse> reviews,
        float rating
) {
}
