package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.dto.OrderItemRequest;
import com.rafaelteixeiraserafim.tcc.dto.OrderItemResponse;
import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;
import com.rafaelteixeiraserafim.tcc.model.Order;
import com.rafaelteixeiraserafim.tcc.service.OrderItemService;
import com.rafaelteixeiraserafim.tcc.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/order-items")
public class OrderItemController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderItemService orderItemService;

    @GetMapping
    public List<OrderItemResponse> getOrderItems() {
        Order order = orderService.getOrderByStatus(OrderStatus.IN_PROGRESS);
        return orderItemService.getOrderItemsByOrder(order);
    }

    @PostMapping
    public String createOrderItem(@RequestBody OrderItemRequest orderItemRequest) {
        orderItemService.createOrderItem(orderItemRequest);

        return "OrderItem created successfully";
    }

    @DeleteMapping("/{orderItemId}")
    public String createOrderItem(@PathVariable Long orderItemId) {
        orderItemService.deleteOrderItem(orderItemId);

        return "OrderItem create successfully";
    }
}
