package com.rafaelteixeiraserafim.tcc.enums;

import lombok.Getter;

@Getter
public enum OrderStatus {
    IN_PROGRESS("inProgress"),
    PENDING("pending"),
    SHIPPED("shipped"),
    DELIVERED("delivered");

    private final String status;

    OrderStatus(String status) {
        this.status = status;
    }
}
