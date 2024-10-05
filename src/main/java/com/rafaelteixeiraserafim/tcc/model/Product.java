package com.rafaelteixeiraserafim.tcc.model;

import jakarta.persistence.*;
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
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    private String name;
    private String about;
    @Column(length = 2000)
    private String description;
    @Column(precision = 10, scale = 2)
    private BigDecimal origPrice;
    @Column(precision = 10, scale = 2)
    private BigDecimal salePrice;
    private int stockQty;
    @CreatedDate
    @Column(updatable = false)
    private Date createdAt;
    @LastModifiedDate
    private Date updatedAt;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Image> images;
//    @JsonManagedReference
//    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<WishlistItem> wishlistItems;
//    @JsonManagedReference
//    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<BoughtProduct> boughtProducts;


    public Product(Category category, String name, String about, String description, BigDecimal origPrice, BigDecimal salePrice, int stockQty) {
        this.category = category;
        this.name = name;
        this.about = about;
        this.description = description;
        this.origPrice = origPrice;
        this.salePrice = salePrice;
        this.stockQty = stockQty;
    }
}
