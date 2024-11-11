package com.rafaelteixeiraserafim.tcc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity(name = "\"order\"")
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Long addressId;

    private BigDecimal shippingFee;

    private int deliveryMinDays;

    private int deliveryMaxDays;

    private Date datePlaced;

    private Date dateDelivered;

    @NonNull
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @JsonIgnore
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;
//    @JsonManagedReference
//    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<BoughtProduct> boughtProducts;
}
