package com.rafaelteixeiraserafim.tcc.dto;

import java.util.List;

public record NotificationUpdateRequest(
        List<Long> ids,
        boolean read
) {
}
