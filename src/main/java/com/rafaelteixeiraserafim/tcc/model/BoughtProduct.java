package com.rafaelteixeiraserafim.tcc.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class BoughtProduct {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE
    )
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
    @ManyToOne
    @JoinColumn(name = "order_item_id")
    private OrderItem orderItem;
    @CreatedDate
    @Column(updatable = false)
    private Date createdAt;

    public BoughtProduct(User user, Order order, Product product, OrderItem orderItem) {
        this.user = user;
        this.order = order;
        this.product = product;
        this.orderItem = orderItem;
    }

    //    @JsonManagedReference
//    @OneToMany(mappedBy = "boughtProduct", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<Review> reviews;
}
