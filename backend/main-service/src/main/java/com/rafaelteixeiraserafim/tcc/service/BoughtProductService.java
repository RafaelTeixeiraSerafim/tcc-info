package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.dto.BoughtProductQty;
import com.rafaelteixeiraserafim.tcc.model.OrderItem;
import com.rafaelteixeiraserafim.tcc.model.Product;
import jakarta.validation.constraints.Min;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BoughtProductService {
    private final OrderItemService orderItemService;

    public BoughtProductService(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

    public List<BoughtProductQty> getMostBoughtProducts() {
        List<OrderItem> orderItems = orderItemService.getNonInProgressOrderItems();
        Map<Product, Integer> qtys = new HashMap<>();
        for (OrderItem orderItem : orderItems) {
            Product product = orderItem.getProduct();
            if (qtys.containsKey(product)) {
                qtys.put(product, qtys.get(product) + orderItem.getQty());
            } else {
                qtys.put(product, orderItem.getQty());
            }
        }

        List<BoughtProductQty> boughtProductQties = new ArrayList<>();
        for (Map.Entry<Product, Integer> entry : qtys.entrySet()) {
            boughtProductQties.add(new BoughtProductQty(entry.getKey(), entry.getValue()));
        }

        return boughtProductQties;
    }

    public Product getBoughtProductElseNull(@Min(1) Long userId, @Min(1) Long productId) {
        List<OrderItem> orderItems = orderItemService.getNonInProgressOrderItems(userId);
        for (OrderItem orderItem : orderItems) {
            if (orderItem.getProduct().getId().equals(productId)) {
                return orderItem.getProduct();
            }
        }

        return null;
    }
}
