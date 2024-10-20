package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.dto.OrderItemRequest;
import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;
import com.rafaelteixeiraserafim.tcc.model.Order;
import com.rafaelteixeiraserafim.tcc.model.OrderItem;
import com.rafaelteixeiraserafim.tcc.service.OrderItemService;
import com.rafaelteixeiraserafim.tcc.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("api/v1/order-items")
public class OrderItemController {
    private final OrderService orderService;
    private final OrderItemService orderItemService;

    public OrderItemController(OrderService orderService, OrderItemService orderItemService) {
        this.orderService = orderService;
        this.orderItemService = orderItemService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getOrderItemsByUserId(@PathVariable Long userId) {
        try {
            Order order = orderService.getOrderByUserIdAndStatus(userId, OrderStatus.IN_PROGRESS);
            List<OrderItem> orderItems = orderItemService.getOrderItemsByOrder(order);

            return ResponseEntity.ok(orderItemService.createOrderItemResponsesFromOrderItems(orderItems));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createOrderItem(@RequestBody OrderItemRequest orderItemRequest) {
        try {
            OrderItem orderItem = orderItemService.createOrderItem(orderItemRequest);

            URI uri = ServletUriComponentsBuilder
                    .fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(orderItem.getId())
                    .toUri();

            return ResponseEntity.created(uri).body(orderItem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{orderItemId}")
    public ResponseEntity<?> deleteOrderItem(@PathVariable Long orderItemId) {
        orderItemService.deleteOrderItem(orderItemId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
