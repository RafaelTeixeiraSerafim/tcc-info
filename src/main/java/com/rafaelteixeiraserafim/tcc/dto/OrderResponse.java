package com.rafaelteixeiraserafim.tcc.dto;

import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private Long id;
    private Date datePlaced;
    private OrderStatus status;
}
