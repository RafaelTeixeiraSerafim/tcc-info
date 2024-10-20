package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.dto.OrderRequest;
import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;
import com.rafaelteixeiraserafim.tcc.model.Order;
import com.rafaelteixeiraserafim.tcc.service.BoughtProductService;
import com.rafaelteixeiraserafim.tcc.service.OrderService;
import com.rafaelteixeiraserafim.tcc.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/orders")
public class OrderController {
    private final OrderService orderService;
    private final UserService userService;
    private final BoughtProductService boughtProductService;

    public OrderController(OrderService orderService, UserService userService, BoughtProductService boughtProductService) {
        this.orderService = orderService;
        this.userService = userService;
        this.boughtProductService = boughtProductService;
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
        return orderService.getOrderByUserId(userId);
    }

    @GetMapping("/status")
    public OrderStatus[] getOrderStatus() {
        return orderService.getOrderStatus();
    }

    @PatchMapping("/{orderId}")
    public String updateOrderStatus(@PathVariable Long orderId, @RequestBody OrderRequest orderRequest) {
        orderService.updateOrderById(orderId, orderRequest);

        return "Order updated successfully";
    }

    @PutMapping(path = "/place-order/{userId}")
    public ResponseEntity<String> placeOrder(@PathVariable Long userId, @RequestBody OrderRequest orderRequest) {
        Order order = orderService.getOrderByUserId(userId);
        orderService.updateOrderById(order.getId(), orderRequest);
        orderService.createOrder(new Order(userService.getUserById(order.getUser().getId()), OrderStatus.IN_PROGRESS));
        boughtProductService.createBoughtProductsWithOrderItems(order.getOrderItems());

        return ResponseEntity.ok("Order placed successfully");
    }
}
