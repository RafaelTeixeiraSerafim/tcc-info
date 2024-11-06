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
    List<BoughtProduct> findByUserAndProduct(User user, Product product);

    List<BoughtProduct> findByUserIdAndProductId(Long userId, Long productId);

    List<BoughtProduct> findAllByUserId(Long userId);

    Optional<BoughtProduct> findByOrderId(Long orderId);
}
