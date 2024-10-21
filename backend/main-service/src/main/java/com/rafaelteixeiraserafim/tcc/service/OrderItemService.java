package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.dto.OrderItemRequest;
import com.rafaelteixeiraserafim.tcc.dto.OrderItemResponse;
import com.rafaelteixeiraserafim.tcc.dto.OrderResponse;
import com.rafaelteixeiraserafim.tcc.model.Order;
import com.rafaelteixeiraserafim.tcc.model.OrderItem;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.repository.OrderItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderItemService {
    private final OrderItemRepository orderItemRepository;
    private final OrderService orderService;
    private final ProductService productService;

    public OrderItemService(OrderItemRepository orderItemRepository, OrderService orderService, ProductService productService) {
        this.orderItemRepository = orderItemRepository;
        this.orderService = orderService;
        this.productService = productService;
    }

    //    public List<OrderItem> getOrderItems() {
//        return orderItemRepository.findAll();
//    }

    public List<OrderItem> getOrderItemsByOrder(Order order) {
        return orderItemRepository.findOrderItemsByOrder(order);
    }

    public List<OrderItemResponse> createOrderItemResponsesFromOrderItems(List<OrderItem> orderItems) {
        List<OrderItemResponse> orderItemResponses = new ArrayList<>();

        for (OrderItem orderItem : orderItems) {
            OrderResponse orderResponse = new OrderResponse(orderItem.getOrder().getId(), orderItem.getOrder().getDatePlaced(), orderItem.getOrder().getStatus());
            orderItemResponses.add(new OrderItemResponse(orderItem.getId(), orderResponse, orderItem.getProduct(), orderItem.getQty(), orderItem.getCreatedAt()));
        }

        return orderItemResponses;
    }

    public List<OrderItem> getOrderItemsByUserId(Long userId) throws IllegalArgumentException {
        Order order = orderService.getOrderByUserId(userId);

        return this.getOrderItemsByOrder(order);
    }

    @Transactional
    public OrderItem createOrderItem(OrderItemRequest orderItemRequest) throws IllegalArgumentException {
        OrderItem orderItem = this.getOrderItemByUserIdAndProductId(orderItemRequest.userId(), orderItemRequest.productId());
        Product product = productService.getProductById(orderItemRequest.productId());
        if (orderItem != null) {
            if (orderItem.getQty() + orderItemRequest.qty() > product.getStockQty()) {
                throw new IllegalArgumentException("OrderItem qty is greater than product stock");
            }
            orderItem.setQty(orderItem.getQty() + orderItemRequest.qty());
            return orderItem;
        } else {
            if (orderItemRequest.qty() > product.getStockQty()) {
                throw new IllegalArgumentException("OrderItem qty is greater than product stock");
            }

            Order order = orderService.getOrderByUserId(orderItemRequest.userId());

            OrderItem newOrderItem = new OrderItem(order, product, orderItemRequest.qty());

            orderItemRepository.save(newOrderItem);
            return newOrderItem;
        }
    }

    public void deleteOrderItem(Long orderItemId) {
        Optional<OrderItem> optionalOrderItem = orderItemRepository.findById(orderItemId);

        if (optionalOrderItem.isEmpty()) {
            System.out.println("Error 0_0");
            throw new IllegalArgumentException("OrderItem not found");
        }

        System.out.println("Deleting yay!");
        orderItemRepository.delete(optionalOrderItem.get());
    }

    public OrderItem getOrderItemByUserIdAndProductId(Long userId, Long productId) {
        Order order = orderService.getOrderByUserId(userId);
        Product product = productService.getProductById(productId);

        Optional<OrderItem> optionalOrderItem = orderItemRepository.findByOrderAndProduct(order, product);

        return optionalOrderItem.orElse(null);

    }
}
