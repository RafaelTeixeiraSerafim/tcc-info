package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.dto.ReviewDto;
import com.rafaelteixeiraserafim.tcc.model.Review;
import com.rafaelteixeiraserafim.tcc.repository.ReviewRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserService userService;
    private final ProductService productService;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, UserService userService, ProductService productService) {
        this.reviewRepository = reviewRepository;
        this.userService = userService;
        this.productService = productService;
    }

    public List<Review> getReviews() {
        return reviewRepository.findAll();
    }

    public Review getReview(Long id) {
        Optional<Review> optionalReview = reviewRepository.findById(id);

        if (optionalReview.isEmpty()) {
            throw new IllegalArgumentException("Review with id " + id + " not found");
        }

        return optionalReview.get();
    }

    public Review createReview(ReviewDto reviewDto, Long productId) {
        Review review = new Review();

        review.setTitle(reviewDto.title());
        review.setRating(reviewDto.rating());
        review.setComment(reviewDto.comment());
        review.setUser(userService.getUser(reviewDto.userId()));
        review.setProduct(productService.getProduct(productId));

        return reviewRepository.save(review);
    }

    public List<Review> getProductReviews(Long productId) {
        return reviewRepository.findByProductId(productId);
    }

    public void deleteReview(@Min(1) Long reviewId) {
        reviewRepository.deleteById(reviewId);
    }

    @Transactional
    public Review updateReview(@Min(1) Long reviewId, @Valid ReviewDto reviewDto) {
        Review review = getReview(reviewId);
        review.setTitle(reviewDto.title());
        review.setRating(reviewDto.rating());
        review.setComment(reviewDto.comment());

        return reviewRepository.save(review);
    }
}
