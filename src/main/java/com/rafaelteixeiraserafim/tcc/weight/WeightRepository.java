package com.rafaelteixeiraserafim.tcc.weight;

import com.rafaelteixeiraserafim.tcc.product_item.ProductItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeightRepository extends JpaRepository<ProductItem, Long> {
}
