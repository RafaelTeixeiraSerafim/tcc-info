package com.rafaelteixeiraserafim.tcc.weight;

import com.rafaelteixeiraserafim.tcc.product_item.ProductItem;
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
public class Weight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String weight;
    private String unit;

    @OneToMany(mappedBy = "size")
    private List<ProductItem> productItems;
}
