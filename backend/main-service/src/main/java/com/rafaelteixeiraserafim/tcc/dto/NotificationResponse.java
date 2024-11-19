package com.rafaelteixeiraserafim.tcc.dto;

import com.rafaelteixeiraserafim.tcc.enums.NotificationSeverity;

import java.util.Date;

public record NotificationResponse(
        Long id,
        ProductResponse product,
        String type,
        NotificationSeverity severity,
        String description,
        Boolean read,
        Date createdAt
) {
}
