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
    private final BoughtProductRepository boughtProductRepository;
    private final OrderItemService orderItemService;

    @Autowired
    public BoughtProductService(BoughtProductRepository boughtProductRepository, OrderItemService orderItemService) {
        this.boughtProductRepository = boughtProductRepository;
        this.orderItemService = orderItemService;
    }

    public void createBoughtProducts(List<OrderItem> orderItems) {
        List<BoughtProduct> boughtProducts = new ArrayList<>();
        for (OrderItem orderItem : orderItems) {
            Optional<BoughtProduct> optionalBoughtProduct = boughtProductRepository.findBoughtProductByUserAndProduct(orderItem.getOrder().getUser(), orderItem.getProduct());

            if (optionalBoughtProduct.isEmpty()) {
                BoughtProduct boughtProduct = new BoughtProduct(orderItem.getOrder().getUser(), orderItem.getOrder(), orderItem.getProduct());
                boughtProducts.add(boughtProduct);
            }
        }

        boughtProductRepository.saveAll(boughtProducts);
    }

    public void createBoughtProducts(Long userId) {
        createBoughtProducts(orderItemService.getOrderItemsByUserId(userId));
    }

    public List<BoughtProduct> getBoughtProducts(Long userId) {
        List<BoughtProduct> optionalBoughtProducts = boughtProductRepository.findBoughtProductsByUserId(userId);

        if (optionalBoughtProducts.isEmpty()) {
            throw new IllegalArgumentException("BoughtProducts with userId " + userId + " does not exist");
        }

        return optionalBoughtProducts;
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
