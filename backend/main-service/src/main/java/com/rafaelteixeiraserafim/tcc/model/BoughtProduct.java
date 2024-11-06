package com.rafaelteixeiraserafim.tcc.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class BoughtProduct {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @NonNull
    @OneToOne
    @JoinColumn(name = "order_item_id")
    private OrderItem orderItem;

    @NonNull
    private BigDecimal price;

    @CreatedDate
//    @Column(updatable = false)
    private Date createdAt;

    //    @JsonManagedReference
//    @OneToMany(mappedBy = "boughtProduct", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private List<Review> reviews;
}
