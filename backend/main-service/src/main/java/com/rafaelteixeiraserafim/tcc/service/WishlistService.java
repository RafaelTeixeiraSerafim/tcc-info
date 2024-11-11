package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.model.User;
import com.rafaelteixeiraserafim.tcc.model.WishlistItem;
import com.rafaelteixeiraserafim.tcc.repository.WishlistItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistService {
    private final WishlistItemRepository wishlistItemRepository;

    public WishlistService(UserService userService, WishlistItemRepository wishlistItemRepository) {
        this.wishlistItemRepository = wishlistItemRepository;
    }

    public WishlistItem createWishlistItem(User user, Product product) {
        return wishlistItemRepository.save(new WishlistItem(user, product));
    }

    public List<WishlistItem> getWishlist(User user) {
        return wishlistItemRepository.findByUser(user);
    }

    public void deleteWishlistItem(Long itemId) {
        wishlistItemRepository.deleteById(itemId);
    }
}
