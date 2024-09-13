package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.dto.BoughtProductDto;
import com.rafaelteixeiraserafim.tcc.model.BoughtProduct;
import com.rafaelteixeiraserafim.tcc.model.OrderItem;
import com.rafaelteixeiraserafim.tcc.repository.BoughtProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BoughtProductService {
    @Autowired
    private BoughtProductRepository boughtProductRepository;

//    public BoughtProduct getBoughtProductByUserAndProduct(User user, Product product) {
//        Optional<BoughtProduct> optionalBoughtProduct = boughtProductRepository.getBoughtProductByUserAndProduct(user, product);
//
//        if (optionalBoughtProduct.isEmpty()) {
//            throw new IllegalArgumentException("BoughtProduct with userId " + user.getId() + " and productId " + product.getId() + " does not exist");
//        }
//
//        return optionalBoughtProduct.get();
//    }

    public void createBoughtProductsWithOrderItems(List<OrderItem> orderItems) {
        List<BoughtProduct> boughtProducts = new ArrayList<>();
        for (OrderItem orderItem : orderItems) {
            Optional<BoughtProduct> optionalBoughtProduct = boughtProductRepository.findBoughtProductByUserAndProduct(orderItem.getOrder().getUser(), orderItem.getProduct());

            if (optionalBoughtProduct.isEmpty()) {
                BoughtProduct boughtProduct = new BoughtProduct(orderItem.getOrder().getUser(), orderItem.getOrder(), orderItem.getProduct(), orderItem);
                boughtProducts.add(boughtProduct);
            }
        }

        boughtProductRepository.saveAll(boughtProducts);
    }

    public List<BoughtProduct> getBoughtProducts(Long userId) {
        Optional<List<BoughtProduct>> optionalBoughtProducts = boughtProductRepository.findBoughtProductsByUserId(userId);

        if (optionalBoughtProducts.isEmpty()) {
            throw new IllegalArgumentException("BoughtProducts with userId " + userId + " does not exist");
        }

        return optionalBoughtProducts.get();
    }

    public BoughtProductDto getBoughtProduct(Long userId, Long productId) {
        Optional<BoughtProduct> optionalBoughtProduct = boughtProductRepository.findBoughtProductByUserIdAndProductId(userId, productId);

        if (optionalBoughtProduct.isEmpty()) {
            return null;
        }

        BoughtProduct boughtProduct = optionalBoughtProduct.get();

        return new BoughtProductDto(boughtProduct.getId(), boughtProduct.getCreatedAt());
    }
}
