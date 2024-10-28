package com.rafaelteixeiraserafim.tcc.enums;

import lombok.Getter;

@Getter
public enum ImageCategory {
    PRODUCT("products"),
    USER("users");

    private final String category;

    ImageCategory(String category) {this.category = category;}
}
