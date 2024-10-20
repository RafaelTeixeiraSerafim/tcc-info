package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.dto.OrderRequest;
import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;
import com.rafaelteixeiraserafim.tcc.model.Order;
import com.rafaelteixeiraserafim.tcc.model.OrderItem;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

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

    public Order getOrderByUserId(Long userId) throws IllegalArgumentException {
        Optional<Order> optionalOrder = orderRepository.findOrderByUserIdAndStatus(userId, OrderStatus.IN_PROGRESS);

        if (optionalOrder.isEmpty()) {
            throw new IllegalArgumentException("Order with userId " + userId + " not found");
        }

        return optionalOrder.get();
    }

    @Transactional
    public void updateOrderById(Long orderId, OrderRequest orderRequest) throws IllegalArgumentException {
        Order order = this.getOrderById(orderId);
        OrderStatus prevStatus = order.getStatus();

        if (orderRequest.status() != null) {
            order.setStatus(orderRequest.status());
        }
        if (orderRequest.datePlaced() != null) {
            order.setDatePlaced(orderRequest.datePlaced());
        }

        if (prevStatus == OrderStatus.IN_PROGRESS && order.getStatus() == OrderStatus.PENDING) {
            for (OrderItem orderItem : order.getOrderItems()) {
                Product product = orderItem.getProduct();
                int stockQty = product.getStockQty() - orderItem.getQty();

                if (stockQty < 0) {
                    throw new IllegalArgumentException("OrderItem with id " + orderItem.getId() + " has a quantity greater than the stock quantity");
                }

                product.setStockQty(stockQty);
            }
        }
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

}
