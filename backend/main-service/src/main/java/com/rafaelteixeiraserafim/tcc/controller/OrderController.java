package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.dto.OrderRequest;
import com.rafaelteixeiraserafim.tcc.dto.OrderResponse;
import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;
import com.rafaelteixeiraserafim.tcc.model.Order;
import com.rafaelteixeiraserafim.tcc.service.OrderService;
import com.rafaelteixeiraserafim.tcc.utils.ModelDtoConversion;
import jakarta.validation.constraints.Min;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("api/v1")
@Validated
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/orders")
    public List<OrderResponse> getOrders() {
        List<Order> orders = orderService.getPlacedOrders();

        return orderService.createPlacedOrderResponses(orders);
    }

    @GetMapping("/orders/{orderId}")
    public OrderResponse getOrder(@PathVariable @Min(1) Long orderId) {
        Order order = orderService.getOrderById(orderId);

        return orderService.createPlacedOrderResponses(List.of(order)).get(0);
    }

    @GetMapping("/users/{userId}/orders/active")
    public OrderResponse getOrderByUserId(@PathVariable @Min(1) Long userId) {
        Order order = orderService.getActiveOrder(userId);

        return ModelDtoConversion.createActiveOrderResponse(order);
    }

    @GetMapping("/orders/status")
    public OrderStatus[] getOrderStatus() {
        return orderService.getOrderStatus();
    }

    @PatchMapping("/orders/{orderId}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable @Min(1) Long orderId, @RequestBody OrderRequest orderRequest) {
        orderService.updateOrderStatus(orderId, orderRequest.status());

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/orders/sales")
    public ResponseEntity<?> getMonthlySales() {
        List<BigDecimal> sales = orderService.getMonthlySales();

        return ResponseEntity.ok(sales);
    }

    @GetMapping("/users/{userId}/orders")
    public ResponseEntity<?> getPlacedUserOrders(@PathVariable @Min(1) Long userId) {
        List<Order> orders = orderService.getPlacedOrders(userId);
        List<OrderResponse> orderResponses = orderService.createPlacedOrderResponses(orders);

        return ResponseEntity.ok(orderResponses);
    }
}
