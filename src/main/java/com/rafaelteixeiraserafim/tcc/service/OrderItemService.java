package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.dto.OrderItemRequest;
import com.rafaelteixeiraserafim.tcc.dto.OrderItemResponse;
import com.rafaelteixeiraserafim.tcc.dto.OrderResponse;
import com.rafaelteixeiraserafim.tcc.model.Order;
import com.rafaelteixeiraserafim.tcc.model.OrderItem;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderItemService {
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private OrderService orderService;
    @Autowired
    private ProductService productService;

//    public List<OrderItem> getOrderItems() {
//        return orderItemRepository.findAll();
//    }

    public List<OrderItemResponse> getOrderItemsByOrder(Order order) {
        Optional<List<OrderItem>> optionalOrderItems = orderItemRepository.findOrderItemsByOrder(order);

        if (optionalOrderItems.isEmpty()) {
            throw new IllegalArgumentException("OrderItems with orderId " + order.getId() + " not found");
        }

        List<OrderItemResponse> orderItemResponses = new ArrayList<>();

        for (OrderItem orderItem : optionalOrderItems.get()) {
            OrderResponse orderResponse = new OrderResponse(order.getId(), order.getDatePlaced(), order.getStatus());
            orderItemResponses.add(new OrderItemResponse(orderItem.getId(), orderResponse, orderItem.getProduct(), orderItem.getQty(), orderItem.getCreatedAt()));
        }

        return orderItemResponses;
    }

    @Transactional
    public void createOrderItem(OrderItemRequest orderItemRequest) {
        try {
            OrderItem orderItem = this.getOrderItemByUserIdAndProductId(orderItemRequest.getUserId(), orderItemRequest.getProductId());
            orderItem.setQty(orderItem.getQty() + orderItemRequest.getQty());
        } catch (Exception e) {
            Product product = productService.getProductById(orderItemRequest.getProductId());

            Order order = orderService.getOrderByUserId(orderItemRequest.getUserId());

            OrderItem orderItem = new OrderItem(order, product, orderItemRequest.getQty());

            orderItemRepository.save(orderItem);
        }
    }

    public void deleteOrderItem(Long orderItemId) {
        orderItemRepository.deleteById(orderItemId);
    }

    public OrderItem getOrderItemByUserIdAndProductId(Long userId, Long productId) {
        Order order = orderService.getOrderByUserId(userId);
        Product product = productService.getProductById(productId);

        Optional<OrderItem> optionalOrderItem = orderItemRepository.findByOrderAndProduct(order, product);

        if (optionalOrderItem.isEmpty()) {
            throw new IllegalArgumentException("Order with userId " + userId + " and productId " + productId + " not found");
        }

        return optionalOrderItem.get();
    }
}
