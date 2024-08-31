package com.rafaelteixeiraserafim.tcc.product;

import com.rafaelteixeiraserafim.tcc.bought_product.BoughtProduct;
import com.rafaelteixeiraserafim.tcc.category.Category;
import com.rafaelteixeiraserafim.tcc.product_item.ProductItem;
import com.rafaelteixeiraserafim.tcc.wishlist_item.WishlistItem;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    private String name;
    private String about;
    private String description;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProductItem> productItems;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<WishlistItem> wishlistItems;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BoughtProduct> boughtProducts;

    public Product(Category category, String name, String about, String description) {
        this.category = category;
        this.name = name;
        this.about = about;
        this.description = description;
    }
}
