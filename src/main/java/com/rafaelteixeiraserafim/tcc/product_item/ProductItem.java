package com.rafaelteixeiraserafim.tcc.product_item;

import com.rafaelteixeiraserafim.tcc.bought_product.BoughtProduct;
import com.rafaelteixeiraserafim.tcc.image.Image;
import com.rafaelteixeiraserafim.tcc.order_item.OrderItem;
import com.rafaelteixeiraserafim.tcc.product.Product;
import com.rafaelteixeiraserafim.tcc.weight.Weight;
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
public class ProductItem {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    private float orig_price;
    private float sale_price;
    private int stock_qty;
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
    @ManyToOne
    @JoinColumn(name = "size_id")
    private Weight weight;

    @OneToMany(mappedBy = "productItem", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Image> images;
    @OneToMany(mappedBy = "productItem", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;
    @OneToMany(mappedBy = "productItem", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BoughtProduct> boughtProducts;

    public ProductItem(float orig_price, float sale_price, int stock_qty) {
        this.orig_price = orig_price;
        this.sale_price = sale_price;
        this.stock_qty = stock_qty;
    }
}
