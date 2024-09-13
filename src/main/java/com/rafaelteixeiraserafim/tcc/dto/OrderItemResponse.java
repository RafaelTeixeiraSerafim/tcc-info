package com.rafaelteixeiraserafim.tcc.dto;

import com.rafaelteixeiraserafim.tcc.model.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemResponse {
    private Long id;
    private OrderResponse order;
    private Product product;
    private int qty;
    private Date createdAt;
}
