package com.rafaelteixeiraserafim.tcc.utils;

import com.rafaelteixeiraserafim.tcc.dto.*;
import com.rafaelteixeiraserafim.tcc.model.*;
import com.rafaelteixeiraserafim.tcc.service.ReviewService;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public final class ModelDtoConversion {
    public static OrderItemResponse createOrderItemResponse(OrderItem orderItem) {
        ProductResponse productResponse = ModelDtoConversion.createProductResponse(orderItem.getProduct());
        return new OrderItemResponse(orderItem.getId(), productResponse, orderItem.getQty(), orderItem.getCreatedAt());
    }

    public static List<OrderItemResponse> createOrderItemResponses(List<OrderItem> orderItems) {
        List<OrderItemResponse> orderItemResponses = new ArrayList<>();

        for (OrderItem orderItem : orderItems) {
            orderItemResponses.add(ModelDtoConversion.createOrderItemResponse(orderItem));
        }

        return orderItemResponses;
    }

    public static OrderResponse createActiveOrderResponse(Order order) {
        List<OrderItemResponse> orderItems = ModelDtoConversion.createOrderItemResponses(order.getOrderItems());
        return new OrderResponse(order.getId(), order.getUser(), order.getDatePlaced(), order.getDateDelivered(), order.getStatus(), null, order.getShippingFee(), order.getDeliveryMinDays(), order.getDeliveryMaxDays(), null, orderItems);
    }

    public static List<ProductImageResponse> createProductImageResponses(List<ProductImage> productImages) {
        List<ProductImageResponse> productImageResponses = new ArrayList<>();
        for (ProductImage productImage : productImages) {
            productImageResponses.add(new ProductImageResponse(productImage.getId(), productImage.getUrl()));
        }

        return productImageResponses;
    }

    private static Date getReturnUpdatedAt(Date createdAt, Date updatedAt) {
        long createdTime = createdAt.getTime();
        long updatedTime = updatedAt.getTime();

        long tolerance = 5000;

        if (Math.abs(updatedTime - createdTime) > tolerance) {
            System.out.println("Not equal: " + updatedAt + " != " + createdAt);
            return updatedAt;
        }

        return null;
    }

    public static ProductResponse createProductResponse(Product product) {
        List<ProductImageResponse> imageResponses = ModelDtoConversion.createProductImageResponses(product.getImages());
        float rating = ReviewService.getAvgRating(product.getReviews());

        return new ProductResponse(product.getId(),
                product.getCategory(),
                product.getName(),
                product.getAbout(),
                product.getDescription(),
                product.getOrigPrice(),
                product.getSalePrice(),
                product.getStockQty(),
                product.getLength(),
                product.getWidth(),
                product.getHeight(),
                product.getWeight(),
                product.getCreatedAt(),
                getReturnUpdatedAt(product.getCreatedAt(), product.getUpdatedAt()),
                imageResponses,
                rating,
                product.getReviews().size()
        );
    }

    public static List<ProductResponse> createProductResponses(List<Product> products) {
        List<ProductResponse> productResponses = new ArrayList<>();
        for (Product product : products) {
            productResponses.add(ModelDtoConversion.createProductResponse(product));
        }
        return productResponses;
    }

    public static WishlistItemResponse createWishlistItemResponse(WishlistItem wishlistItem) {
        ProductResponse productResponse = ModelDtoConversion.createProductResponse(wishlistItem.getProduct());
        return new WishlistItemResponse(
                wishlistItem.getId(),
                wishlistItem.getUser(),
                productResponse,
                wishlistItem.getCreatedAt()
        );
    }

    public static List<WishlistItemResponse> createWishlistResponse(List<WishlistItem> wishlist) {
        List<WishlistItemResponse> responses = new ArrayList<>();

        for (WishlistItem wishlistItem : wishlist) {
            responses.add(ModelDtoConversion.createWishlistItemResponse(wishlistItem));
        }

        return responses;
    }

    public static NotificationResponse createNotificationResponse(Notification notification, ProductResponse product) {
        return new NotificationResponse(notification.getId(), product, notification.getNotificationObject().getEntityType(), notification.getNotificationObject().getSeverity(), notification.getNotificationObject().getDescription() + ": " + product.name(), notification.getRead(), notification.getCreatedAt());
    }

    public static ReviewResponse createReviewResponse(Review review) {
        return new ReviewResponse(
                review.getId(),
                review.getUser(),
                review.getRating(),
                review.getTitle(),
                review.getComment(),
                review.getCreatedAt(),
                getReturnUpdatedAt(review.getCreatedAt(), review.getUpdatedAt())
        );
    }

    public static List<ReviewResponse> createReviewResponses(List<Review> reviews) {
        List<ReviewResponse> reviewResponses = new ArrayList<>();
        for (Review review : reviews) {
            reviewResponses.add(ModelDtoConversion.createReviewResponse(review));
        }

        return reviewResponses;
    }

    public static CategoryResponse createCategoryResponse(Category category) {
        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getDescription(),
                category.getCreatedAt(),
                getReturnUpdatedAt(category.getCreatedAt(), category.getUpdatedAt())
        );
    }

    public static List<CategoryResponse> createCategoryResponses(List<Category> categories) {
        List<CategoryResponse> responses = new ArrayList<>();
        for (Category category : categories) {
            responses.add(ModelDtoConversion.createCategoryResponse(category));
        }

        return responses;
    }

    public static UserResponse createUserResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getProfilePic(),
                user.getRole(),
                user.isEnabled(),
                user.getCreatedAt(),
                getReturnUpdatedAt(user.getCreatedAt(), user.getUpdatedAt())
        );
    }

    public static List<UserResponse> createUserResponses(List<User> users) {
        List<UserResponse> userResponses = new ArrayList<>();
        for (User user : users) {
            userResponses.add(ModelDtoConversion.createUserResponse(user));
        }

        return userResponses;
    }
}
