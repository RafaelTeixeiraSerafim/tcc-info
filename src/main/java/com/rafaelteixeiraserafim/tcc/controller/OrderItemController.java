package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.dto.OrderItemRequest;
import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;
import com.rafaelteixeiraserafim.tcc.model.Order;
import com.rafaelteixeiraserafim.tcc.service.OrderItemService;
import com.rafaelteixeiraserafim.tcc.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/order-items")
public class OrderItemController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderItemService orderItemService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getOrderItemsByUserId(@PathVariable Long userId) {
        try {
            Order order = orderService.getOrderByUserIdAndStatus(userId, OrderStatus.IN_PROGRESS);
            return ResponseEntity.ok(orderItemService.getOrderItemsByOrder(order));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<String> createOrderItem(@RequestBody OrderItemRequest orderItemRequest) {
        try {
            orderItemService.createOrderItem(orderItemRequest);
            return ResponseEntity.ok("OrderItem created successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{orderItemId}")
    public String createOrderItem(@PathVariable Long orderItemId) {
        orderItemService.deleteOrderItem(orderItemId);

        return "OrderItem create successfully";
    }
}
