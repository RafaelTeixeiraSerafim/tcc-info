package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.model.User;
import com.rafaelteixeiraserafim.tcc.model.WishlistItem;
import com.rafaelteixeiraserafim.tcc.repository.WishlistItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WishlistService {
    private final WishlistItemRepository wishlistItemRepository;

    public WishlistService(UserService userService, WishlistItemRepository wishlistItemRepository) {
        this.wishlistItemRepository = wishlistItemRepository;
    }

    public WishlistItem getWishListItem(User user, Product product) {
        return wishlistItemRepository.findByUserAndProduct(user, product).orElseThrow(() -> new IllegalArgumentException("Wishlist item not found"));
    }

    public WishlistItem createWishlistItem(User user, Product product) {
        Optional<WishlistItem> wishlistItem = wishlistItemRepository.findByUserAndProduct(user, product);

        if (wishlistItem.isPresent()) {
            throw new IllegalArgumentException("Wishlist item already exists");
        }

        return wishlistItemRepository.save(new WishlistItem(user, product));
    }

    public List<WishlistItem> getWishlist(User user) {
        return wishlistItemRepository.findByUser(user);
    }

    public void deleteWishlistItem(Long itemId) {
        wishlistItemRepository.deleteById(itemId);
    }
}
