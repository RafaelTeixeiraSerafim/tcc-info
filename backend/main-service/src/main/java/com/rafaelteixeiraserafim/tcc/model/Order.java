package com.rafaelteixeiraserafim.tcc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity(name = "\"order\"")
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EntityListeners(AuditingEntityListener.class)
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "order_user_id_fk"))
    private User user;

    private Long addressId;

    private BigDecimal shippingFee;

    private int deliveryMinDays;

    private int deliveryMaxDays;

    private Date datePlaced;

    private Date dateDelivered;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @NotNull
    @LastModifiedDate
    private Date updatedAt;

    @JsonIgnore
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;

    public Order(User user, OrderStatus status) {
        this.user = user;
        this.status = status;
    }
}
