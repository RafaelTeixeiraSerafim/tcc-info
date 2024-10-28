package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.dto.OrderRequest;
import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;
import com.rafaelteixeiraserafim.tcc.model.Order;
import com.rafaelteixeiraserafim.tcc.service.BoughtProductService;
import com.rafaelteixeiraserafim.tcc.service.OrderService;
import com.rafaelteixeiraserafim.tcc.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping()
    public List<Order> getOrders() {
        return orderService.getOrders();
    }

    @GetMapping("/{orderId}")
    public Order getOrder(@PathVariable Long orderId) {
        return orderService.getOrderById(orderId);
    }

    @GetMapping("/user/{userId}")
    public Order getOrderByUserId(@PathVariable Long userId) {
        return orderService.getActiveOrder(userId);
    }

    @GetMapping("/status")
    public OrderStatus[] getOrderStatus() {
        return orderService.getOrderStatus();
    }

    @PatchMapping("/{orderId}")
    public String updateOrderStatus(@PathVariable Long orderId, @RequestBody OrderRequest orderRequest) {
        orderService.updateOrderStatus(orderId, orderRequest.status());

        return "Order updated successfully";
    }
}
