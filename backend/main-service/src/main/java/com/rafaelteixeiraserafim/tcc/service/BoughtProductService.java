package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.dto.BoughtProductDto;
import com.rafaelteixeiraserafim.tcc.dto.BoughtProductQty;
import com.rafaelteixeiraserafim.tcc.model.BoughtProduct;
import com.rafaelteixeiraserafim.tcc.model.Order;
import com.rafaelteixeiraserafim.tcc.model.OrderItem;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.repository.BoughtProductRepository;
import com.rafaelteixeiraserafim.tcc.utils.ProductUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class BoughtProductService {
    private final BoughtProductRepository boughtProductRepository;

    @Autowired
    public BoughtProductService(BoughtProductRepository boughtProductRepository) {
        this.boughtProductRepository = boughtProductRepository;
    }

    public void createBoughtProducts(List<OrderItem> orderItems) {
        List<BoughtProduct> boughtProducts = new ArrayList<>();
        for (OrderItem orderItem : orderItems) {
            Order order = orderItem.getOrder();
            Product product = orderItem.getProduct();
            Optional<BoughtProduct> optionalBoughtProduct = boughtProductRepository.findByUserAndProduct(order.getUser(), product);

            if (optionalBoughtProduct.isEmpty()) {
                BoughtProduct boughtProduct = new BoughtProduct(order.getUser(), order, product, orderItem, ProductUtils.getActivePrice(product).multiply(BigDecimal.valueOf(orderItem.getQty())));
                boughtProducts.add(boughtProduct);
            }
        }

        boughtProductRepository.saveAll(boughtProducts);
    }

    public List<BoughtProduct> getBoughtProducts() {
        return boughtProductRepository.findAll();
    }

    public List<BoughtProduct> getBoughtProducts(Long userId) {
        List<BoughtProduct> optionalBoughtProducts = boughtProductRepository.findAllByUserId(userId);

        if (optionalBoughtProducts.isEmpty()) {
            throw new IllegalArgumentException("BoughtProducts with userId " + userId + " do not exist");
        }

        return optionalBoughtProducts;
    }

    public BoughtProduct getBoughtProduct(Long boughtProductId) {
        Optional<BoughtProduct> optionalBoughtProduct = boughtProductRepository.findById(boughtProductId);

        if (optionalBoughtProduct.isEmpty()) {
            throw new IllegalArgumentException("BoughtProduct with id " + boughtProductId + " does not exist");
        }

        return optionalBoughtProduct.get();
    }


    public BoughtProductDto getBoughtProductByOrderId(Long userId, Long productId) {
        Optional<BoughtProduct> optionalBoughtProduct = boughtProductRepository.findByUserIdAndProductId(userId, productId);

        if (optionalBoughtProduct.isEmpty()) {
            return null;
        }

        BoughtProduct boughtProduct = optionalBoughtProduct.get();

        return new BoughtProductDto(boughtProduct.getId(), boughtProduct.getCreatedAt());
    }

    public BoughtProduct getBoughtProductByOrderId(Long orderId) {
        Optional<BoughtProduct> optional = boughtProductRepository.findByOrderId(orderId);
        if (optional.isEmpty()) {
            throw new IllegalArgumentException("BoughtProduct with orderId " + orderId + " does not exist");
        }

        return optional.get();
    }

    public List<BoughtProductQty> getMostBoughtProducts() {
        List<BoughtProduct> boughtProducts = this.getBoughtProducts();
        Map<Product, Integer> qtys = new HashMap<>();
        for (BoughtProduct boughtProduct : boughtProducts) {
            Product product = boughtProduct.getProduct();
            if (qtys.containsKey(product)) {
                qtys.put(product, qtys.get(product) + boughtProduct.getOrderItem().getQty());
            } else {
                qtys.put(product, boughtProduct.getOrderItem().getQty());
            }
        }

        List<BoughtProductQty> boughtProductQties = new ArrayList<>();
        for (Map.Entry<Product, Integer> entry : qtys.entrySet()) {
            boughtProductQties.add(new BoughtProductQty(entry.getKey(), entry.getValue()));
        }

        return boughtProductQties;
    }
}
