package com.rafaelteixeiraserafim.tcc.order;

import com.rafaelteixeiraserafim.tcc.bought_product.BoughtProduct;
import com.rafaelteixeiraserafim.tcc.order_item.OrderItem;
import com.rafaelteixeiraserafim.tcc.product_item.ProductItem;
import com.rafaelteixeiraserafim.tcc.user.User;
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
public class Order {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE
    )
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private float total;
    @CreatedDate
    private Date date_placed;
    private String status;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BoughtProduct> boughtProducts;
}
