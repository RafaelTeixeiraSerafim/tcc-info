package com.rafaelteixeiraserafim.tcc.image;

import com.rafaelteixeiraserafim.tcc.product_item.ProductItem;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Image {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE
    )
    private Long id;
    private String url;
    @ManyToOne
    @JoinColumn(name = "product_item_id")
    private ProductItem productItem;

    public Image(String url) {
        this.url = url;
    }
}
