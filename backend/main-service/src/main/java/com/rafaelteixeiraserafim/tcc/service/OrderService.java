package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;
import com.rafaelteixeiraserafim.tcc.model.Order;
import com.rafaelteixeiraserafim.tcc.model.User;
import com.rafaelteixeiraserafim.tcc.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserService userService;
    private final ProductService productService;

    @Autowired
    public OrderService(OrderRepository orderRepository, UserService userService, ProductService productService) {
        this.orderRepository = orderRepository;
        this.userService = userService;
        this.productService = productService;
    }

    public void createOrder(Order order) {
        orderRepository.save(order);
    }

    public Order getOrderById(Long orderId) throws IllegalArgumentException {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);

        if (optionalOrder.isEmpty()) {
            throw new IllegalArgumentException("Order with id " + orderId + " not found");
        }

        return optionalOrder.get();
    }

    public Order getActiveOrder(Long userId) throws IllegalArgumentException {
        Optional<Order> optionalOrder = orderRepository.findOrderByUserIdAndStatus(userId, OrderStatus.IN_PROGRESS);

        if (optionalOrder.isEmpty()) {
            throw new IllegalArgumentException("Order with userId " + userId + " not found");
        }

        return optionalOrder.get();
    }

    @Transactional
    public void updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = this.getOrderById(orderId);

        order.setStatus(status);
    }

    public void updateOrder(Order order, OrderStatus status, Date datePlaced) {
        order.setStatus(status);
        order.setDatePlaced(datePlaced);
    }

    public Order getOrderByUserIdAndStatus(Long userId, OrderStatus orderStatus) throws IllegalArgumentException {
        Optional<Order> optionalOrder = orderRepository.findOrderByUserIdAndStatus(userId, orderStatus);

        if (optionalOrder.isEmpty()) {
            throw new IllegalArgumentException("Order with userId " + userId + " orderStatus " + orderStatus.getStatus() + " not found");
        }

        return optionalOrder.get();
    }

    public List<Order> getOrders() {
        List<Order> orders = orderRepository.findAll();

        List<Order> filteredOrders = new ArrayList<>();

        for (Order order : orders) {
            if (order.getStatus() != OrderStatus.IN_PROGRESS) {
                filteredOrders.add(order);
            }
        }

        return filteredOrders;
    }

    public OrderStatus[] getOrderStatus() {
        return OrderStatus.values();
    }

    @Transactional
    public void checkoutOrder(Long userId) {
        User user = userService.getUserById(userId);
        Order order = getActiveOrder(userId);
        productService.updateStockQtys(order.getOrderItems());
        updateOrder(order, OrderStatus.PENDING, Date.from(Instant.now()));
        createOrder(new Order(user, OrderStatus.IN_PROGRESS));
    }
}
