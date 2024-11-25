package com.rafaelteixeiraserafim.tcc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
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
@RequiredArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @NotNull
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @NonNull
    @NotNull
    private String name;

    private String about;

    @NonNull
    @NotNull
    @Column(length = 5000)
    private String description;

    @NonNull
    @NotNull
    @Column(precision = 10, scale = 2)
    private BigDecimal origPrice;

    @Column(precision = 10, scale = 2)
    private BigDecimal salePrice;

    @NonNull
    @NotNull
    private int stockQty;

    @NonNull
    @NotNull
    private BigDecimal length; // cm

    @NonNull
    @NotNull
    private BigDecimal width;  // cm

    @NonNull
    @NotNull
    private BigDecimal height; // cm

    @NonNull
    @NotNull
    private BigDecimal weight; // kg

    @NonNull
    @NotNull
    private Boolean deactivated;

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

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<WishlistItem> wishlistItems;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;

    public Product(@NonNull Category category, @NonNull String name, @NonNull String description, @NonNull BigDecimal origPrice, BigDecimal salePrice, @NonNull Integer stockQty, @NonNull BigDecimal length, @NonNull BigDecimal width, @NonNull BigDecimal height, @NonNull BigDecimal weight, @NonNull Boolean deactivated) {
        this.category = category;
        this.name = name;
        this.description = description;
        this.origPrice = origPrice;
        this.salePrice = salePrice;
        this.stockQty = stockQty;
        this.length = length;
        this.width = width;
        this.height = height;
        this.weight = weight;
        this.deactivated = deactivated;
    }
}
