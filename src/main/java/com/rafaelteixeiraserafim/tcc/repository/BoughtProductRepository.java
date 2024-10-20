package com.rafaelteixeiraserafim.tcc.repository;

import com.rafaelteixeiraserafim.tcc.model.BoughtProduct;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoughtProductRepository extends JpaRepository<BoughtProduct, Long> {
    Optional<BoughtProduct> findBoughtProductByUserAndProduct(User user, Product product);

    Optional<BoughtProduct> findBoughtProductByUserIdAndProductId(Long userId, Long productId);

    List<BoughtProduct> findBoughtProductsByUserId(Long userId);
}
