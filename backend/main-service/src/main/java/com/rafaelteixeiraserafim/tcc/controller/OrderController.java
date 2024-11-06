package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.dto.OrderRequest;
import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;
import com.rafaelteixeiraserafim.tcc.model.Order;
import com.rafaelteixeiraserafim.tcc.service.OrderService;
import jakarta.validation.constraints.Min;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("api/v1/orders")
@Validated
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
    public Order getOrder(@PathVariable @Min(1) Long orderId) {
        return orderService.getOrderById(orderId);
    }

    @GetMapping("/user/{userId}")
    public Order getOrderByUserId(@PathVariable @Min(1) Long userId) {
        return orderService.getActiveOrder(userId);
    }

    @GetMapping("/status")
    public OrderStatus[] getOrderStatus() {
        return orderService.getOrderStatus();
    }

    @PatchMapping("/{orderId}")
    public String updateOrderStatus(@PathVariable @Min(1) Long orderId, @RequestBody OrderRequest orderRequest) {
        orderService.updateOrderStatus(orderId, orderRequest.status());

        return "Order updated successfully"; // TODO: return a ResponseEntity with a corresponding status code
    }

    @GetMapping("/sales")
    public ResponseEntity<?> getMonthlySales() {
        List<BigDecimal> sales = orderService.getMonthlySales();

        return ResponseEntity.status(HttpStatus.OK).body(sales);
    }
}
