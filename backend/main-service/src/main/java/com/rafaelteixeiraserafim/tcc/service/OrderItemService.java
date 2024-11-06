package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.dto.OrderItemRequest;
import com.rafaelteixeiraserafim.tcc.dto.OrderItemResponse;
import com.rafaelteixeiraserafim.tcc.dto.OrderResponse;
import com.rafaelteixeiraserafim.tcc.model.Order;
import com.rafaelteixeiraserafim.tcc.model.OrderItem;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.repository.OrderItemRepository;
import com.rafaelteixeiraserafim.tcc.utils.ProductUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

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

    public List<OrderItemResponse> createOrderItemResponses(List<OrderItem> orderItems) {
        List<OrderItemResponse> orderItemResponses = new ArrayList<>();

        for (OrderItem orderItem : orderItems) {
            OrderResponse orderResponse = new OrderResponse(orderItem.getOrder().getId(), orderItem.getOrder().getDatePlaced(), orderItem.getOrder().getStatus());
            orderItemResponses.add(new OrderItemResponse(orderItem.getId(), orderResponse, orderItem.getProduct(), orderItem.getQty(), orderItem.getCreatedAt()));
        }

        return orderItemResponses;
    }

    public List<OrderItem> getOrderItems(Long userId) throws IllegalArgumentException {
        Order order = orderService.getActiveOrder(userId);

        return order.getOrderItems();
    }

    @Transactional
    public OrderItem createOrderItem(OrderItemRequest orderItemRequest) throws IllegalArgumentException {
        OrderItem orderItem = this.getOrderItem(orderItemRequest.userId(), orderItemRequest.productId());
        Product product = productService.getProduct(orderItemRequest.productId());
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

            Order order = orderService.getActiveOrder(orderItemRequest.userId());

            OrderItem newOrderItem = new OrderItem(order, product, orderItemRequest.qty());

            orderItemRepository.save(newOrderItem);
            return newOrderItem;
        }
    }

    public void deleteOrderItem(Long orderItemId) {
        OrderItem orderItem = orderItemRepository.findById(orderItemId).orElseThrow(() -> new IllegalArgumentException("OrderItem not found"));

        orderItemRepository.delete(orderItem);
    }

    public OrderItem getOrderItem(Long userId, Long productId) {
        Order order = orderService.getActiveOrder(userId);
        Product product = productService.getProduct(productId);

        return orderItemRepository.findByOrderAndProduct(order, product).orElseThrow(() -> new IllegalArgumentException("OrderItem not found"));
    }

    public void createPrices(List<OrderItem> orderItems) {
        for (OrderItem orderItem : orderItems) {
            Product product = orderItem.getProduct();
            orderItem.setPrice(ProductUtils.getActivePrice(product).multiply(BigDecimal.valueOf(orderItem.getQty())));
        }
    }

    public List<OrderItem> getNonInProgressOrderItems() {
        List<Order> orders = orderService.getNonInProgressOrders();
        List<OrderItem> orderItems = new ArrayList<>();
        for (Order order : orders) {
            orderItems.addAll(order.getOrderItems());
        }

        return orderItems;
    }

    public List<OrderItem> getNonInProgressOrderItems(Long userId) {
        List<Order> orders = orderService.getNonInProgressOrders(userId);
        List<OrderItem> orderItems = new ArrayList<>();
        for (Order order : orders) {
            orderItems.addAll(order.getOrderItems());
        }

        return orderItems;
    }
}
