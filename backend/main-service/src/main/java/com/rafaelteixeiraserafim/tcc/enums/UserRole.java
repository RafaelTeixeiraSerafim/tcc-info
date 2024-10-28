package com.rafaelteixeiraserafim.tcc.enums;

import lombok.Getter;

@Getter
public enum UserRole {
    ADMIN("admin"),
    CLIENT("client");

    private final String role;

    UserRole(String role) {
        this.role = role;
    }
}
