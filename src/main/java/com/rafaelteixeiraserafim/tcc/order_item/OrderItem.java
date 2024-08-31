package com.rafaelteixeiraserafim.tcc.order_item;

import com.rafaelteixeiraserafim.tcc.bought_product.BoughtProduct;
import com.rafaelteixeiraserafim.tcc.order.Order;
import com.rafaelteixeiraserafim.tcc.product_item.ProductItem;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;
import java.util.List;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE
    )
    private Long id;
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
    @ManyToOne
    @JoinColumn(name = "product_item_id")
    private ProductItem productItem;
    @CreatedDate
    private Date created_at;

    @OneToMany(mappedBy = "orderItem", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BoughtProduct> boughtProducts;
}
