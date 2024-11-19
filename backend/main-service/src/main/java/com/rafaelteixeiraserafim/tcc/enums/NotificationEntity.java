package com.rafaelteixeiraserafim.tcc.enums;

import lombok.Getter;

@Getter
public enum NotificationEntity {
    PRODUCT("product");

    private final String entity;

    NotificationEntity(String entity) {
        this.entity = entity;
    }
}
