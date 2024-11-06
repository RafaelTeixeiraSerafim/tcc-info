package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.dto.ProductReviewsDto;
import com.rafaelteixeiraserafim.tcc.dto.ReviewDto;
import com.rafaelteixeiraserafim.tcc.model.Review;
import com.rafaelteixeiraserafim.tcc.service.ReviewService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("api/v1")
@Validated
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/products/{productId}/reviews")
    public ResponseEntity<ProductReviewsDto> getProductReviews(@PathVariable @Min(1) Long productId) {
        List<Review> reviews = reviewService.getProductReviews(productId);

        return ResponseEntity.ok(new ProductReviewsDto(reviews));
    }

    @PostMapping("/products/{productId}/reviews")
    public ResponseEntity<?> createReview(@PathVariable Long productId, @RequestBody ReviewDto reviewDto) {
        Review review = reviewService.createReview(reviewDto, productId);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(review.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PutMapping("/products/reviews/{reviewId}")
    public ResponseEntity<?> updateReview(@PathVariable @Min(1) Long reviewId, @Valid @RequestBody ReviewDto reviewDto) {
        System.out.println(reviewDto);
        reviewService.updateReview(reviewId, reviewDto);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/products/reviews/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable @Min(1) Long reviewId) {
        reviewService.deleteReview(reviewId);

        return ResponseEntity.noContent().build();
    }
}
