package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.dto.OrderItemRequest;
import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;
import com.rafaelteixeiraserafim.tcc.model.Order;
import com.rafaelteixeiraserafim.tcc.model.OrderItem;
import com.rafaelteixeiraserafim.tcc.service.OrderItemService;
import com.rafaelteixeiraserafim.tcc.service.OrderService;
import com.rafaelteixeiraserafim.tcc.utils.ModelDtoConversion;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@Validated
@RestController
@RequestMapping("api/v1/order-items")
public class OrderItemController {
    private final OrderItemService orderItemService;

    @Autowired
    public OrderItemController(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

//    @GetMapping("/{userId}")
//    public ResponseEntity<?> getOrderItemsByUserId(@PathVariable @Min(1) Long userId) {
//        try {
//            Order order = orderService.getOrderByUserIdAndStatus(userId, OrderStatus.IN_PROGRESS);
//
//            return ResponseEntity.ok(orderItemService.createOrderItemResponses(order.getOrderItems()));
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

    @PostMapping
    public ResponseEntity<?> createOrderItem(@RequestBody @Valid OrderItemRequest orderItemRequest) {
        try {
            OrderItem orderItem = orderItemService.createOrderItem(orderItemRequest);

            URI uri = ServletUriComponentsBuilder
                    .fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(orderItem.getId())
                    .toUri();

            return ResponseEntity.created(uri).body(ModelDtoConversion.createOrderItemResponse(orderItem));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{orderItemId}")
    public ResponseEntity<?> deleteOrderItem(@PathVariable @Min(1) Long orderItemId) {
        orderItemService.deleteOrderItem(orderItemId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
