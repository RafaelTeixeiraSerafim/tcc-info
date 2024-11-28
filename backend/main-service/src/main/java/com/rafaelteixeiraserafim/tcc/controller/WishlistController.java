package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.dto.WishlistItemRequest;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.model.User;
import com.rafaelteixeiraserafim.tcc.model.WishlistItem;
import com.rafaelteixeiraserafim.tcc.service.ProductService;
import com.rafaelteixeiraserafim.tcc.service.UserService;
import com.rafaelteixeiraserafim.tcc.service.WishlistService;
import com.rafaelteixeiraserafim.tcc.utils.ModelDtoConversion;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("api/v1")
@Validated
public class WishlistController {
    private final WishlistService wishlistService;
    private final UserService userService;
    private final ProductService productService;

    public WishlistController(WishlistService wishlistService, UserService userService, ProductService productService) {
        this.wishlistService = wishlistService;
        this.userService = userService;
        this.productService = productService;
    }

    @GetMapping("/users/{userId}/wishlist")
    public ResponseEntity<?> getWishlist(@PathVariable Long userId) {
        User user = userService.getUser(userId);
        List<WishlistItem> wishlist = wishlistService.getWishlist(user);
        return ResponseEntity.ok(ModelDtoConversion.createWishlistResponse(wishlist));
    }

    @PostMapping("/users/wishlist/item")
    public ResponseEntity<?> createWishlistItem(@RequestBody @Valid WishlistItemRequest wishlistItemRequest) {
        User user = userService.getUser(wishlistItemRequest.userId());
        Product product = productService.getProduct(wishlistItemRequest.productId());

        WishlistItem wishlistItem = wishlistService.createWishlistItem(user, product);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(wishlistItem.getId())
                .toUri();

        return ResponseEntity.created(location).body(ModelDtoConversion.createWishlistItemResponse(wishlistItem));
    }

    @DeleteMapping("/users/wishlist/item/{itemId}")
    public ResponseEntity<?> deleteWishlistItem(@PathVariable Long itemId) {
        wishlistService.deleteWishlistItem(itemId);
        return ResponseEntity.noContent().build();
    }
}
