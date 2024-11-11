package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.dto.BoughtProductQty;
import com.rafaelteixeiraserafim.tcc.dto.ProductResponse;
import com.rafaelteixeiraserafim.tcc.model.OrderItem;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.utils.ModelDtoConversion;
import jakarta.validation.constraints.Min;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BoughtProductService {
    private final OrderItemService orderItemService;

    public BoughtProductService(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

    public List<BoughtProductQty> getMostBoughtProducts() {
        List<OrderItem> orderItems = orderItemService.getNonInProgressOrderItems();
        Map<ProductResponse, Integer> qtys = new HashMap<>();
        for (OrderItem orderItem : orderItems) {
            ProductResponse product = ModelDtoConversion.createProductResponse(orderItem.getProduct());
            if (qtys.containsKey(product)) {
                qtys.put(product, qtys.get(product) + orderItem.getQty());
            } else {
                qtys.put(product, orderItem.getQty());
            }
        }

        List<BoughtProductQty> boughtProductQties = new ArrayList<>();
        for (Map.Entry<ProductResponse, Integer> entry : qtys.entrySet()) {
            boughtProductQties.add(new BoughtProductQty(entry.getKey(), entry.getValue()));
        }

        boughtProductQties.sort(Comparator.comparingInt(BoughtProductQty::qty).reversed());
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
