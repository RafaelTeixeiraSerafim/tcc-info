package com.rafaelteixeiraserafim.tcc.model;

import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity(name = "\"order\"")
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private Date datePlaced;
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    public Order(User user, OrderStatus status) {
        this.user = user;
        this.status = status;
    }

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;
//    @JsonManagedReference
//    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<BoughtProduct> boughtProducts;
}
