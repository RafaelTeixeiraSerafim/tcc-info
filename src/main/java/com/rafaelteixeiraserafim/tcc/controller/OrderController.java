package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.dto.OrderRequest;
import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;
import com.rafaelteixeiraserafim.tcc.model.Order;
import com.rafaelteixeiraserafim.tcc.service.BoughtProductService;
import com.rafaelteixeiraserafim.tcc.service.OrderService;
import com.rafaelteixeiraserafim.tcc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;
    @Autowired
    private BoughtProductService boughtProductService;

    @GetMapping("api/v1/orders")
    public List<Order> getOrders() {
        return orderService.getOrders();
    }

    @GetMapping("api/v1/orders/{orderId}")
    public Order getOrder(@PathVariable Long orderId) {
        return orderService.getOrderById(orderId);
    }

    @GetMapping("api/v1/orders/status")
    public OrderStatus[] getOrderStatus() {
        return orderService.getOrderStatus();
    }

    @PatchMapping("api/v1/orders/{orderId}")
    public String updateOrderStatus(@PathVariable Long orderId, @RequestBody OrderRequest orderRequest) {
        orderService.updateOrderById(orderId, orderRequest);

        return "Order updated successfully";
    }

    @PutMapping(path = "api/v1/place-order/{orderId}")
    public String placeOrder(@PathVariable Long orderId, @RequestBody OrderRequest orderRequest) {
        Order order = orderService.getOrderById(orderId);
        orderService.updateOrderById(orderId, orderRequest);
        orderService.createOrder(new Order(userService.getUserById(order.getUser().getId()), OrderStatus.IN_PROGRESS));
        boughtProductService.createBoughtProductsWithOrderItems(order.getOrderItems());

        return "Order updated successfully";
    }
}
