package com.rafaelteixeiraserafim.tcc.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JoinColumn(name = "product_item_id")
    private ProductItem productItem;
    @ManyToOne
    @JoinColumn(name = "order_item_id")
    private OrderItem orderItem;
    @CreatedDate
    private Date created_at;

//    @JsonManagedReference
//    @OneToMany(mappedBy = "boughtProduct", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<Review> reviews;
}
