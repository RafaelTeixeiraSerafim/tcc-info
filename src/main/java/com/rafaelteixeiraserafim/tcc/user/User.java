package com.rafaelteixeiraserafim.tcc.user;

import com.rafaelteixeiraserafim.tcc.bought_product.BoughtProduct;
import com.rafaelteixeiraserafim.tcc.order.Order;
import com.rafaelteixeiraserafim.tcc.product_item.ProductItem;
import com.rafaelteixeiraserafim.tcc.review.Review;
import com.rafaelteixeiraserafim.tcc.wishlist_item.WishlistItem;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;
import java.util.List;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE
    )
    private Long id;
    private String username;
    private String password;
    private String email;
    private String profile_pic;
    private String about;
    private String isAdm;
    @CreatedDate
    private Date created_at;
    @LastModifiedDate
    private Date updated_at;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<WishlistItem> wishlistItems;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BoughtProduct> boughtProducts;
}
