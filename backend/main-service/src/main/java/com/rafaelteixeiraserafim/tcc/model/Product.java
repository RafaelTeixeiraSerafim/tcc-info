package com.rafaelteixeiraserafim.tcc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @NotNull
    private String name;

    private String about;

    @NotNull
    @Column(length = 5000)
    private String description;

    @NotNull
    @Column(precision = 10, scale = 2)
    private BigDecimal origPrice;

    @Column(precision = 10, scale = 2)
    private BigDecimal salePrice;

    @NotNull
    private int stockQty;

    @NotNull
    private BigDecimal length; // cm

    @NotNull
    private BigDecimal width;  // cm

    @NotNull
    private BigDecimal height; // cm

    @NotNull
    private BigDecimal weight; // kg

    @NotNull
    @CreatedDate
//    @Column(updatable = false)
    private Date createdAt;

    @NotNull
    @LastModifiedDate
    private Date updatedAt;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProductImage> images;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews;
//    @JsonManagedReference
//    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<WishlistItem> wishlistItems;
//    @JsonManagedReference
//    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<BoughtProduct> boughtProducts;

    public Product(Category category, String name, String about, String description, BigDecimal origPrice, BigDecimal salePrice, int stockQty, BigDecimal length, BigDecimal width, BigDecimal height, BigDecimal weight) {
        this.category = category;
        this.name = name;
        this.about = about;
        this.description = description;
        this.origPrice = origPrice;
        this.salePrice = salePrice;
        this.stockQty = stockQty;
        this.length = length;
        this.width = width;
        this.height = height;
        this.weight = weight;
    }
}
