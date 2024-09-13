package com.rafaelteixeiraserafim.tcc.model;

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
    private float origPrice;
    private float salePrice;
    private int stockQty;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Image> images;
//    @JsonManagedReference
//    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<WishlistItem> wishlistItems;
//    @JsonManagedReference
//    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<BoughtProduct> boughtProducts;


    public Product(Category category, String name, String about, String description, float origPrice, float salePrice, int stockQty) {
        this.category = category;
        this.name = name;
        this.about = about;
        this.description = description;
        this.origPrice = origPrice;
        this.salePrice = salePrice;
        this.stockQty = stockQty;
    }
}
