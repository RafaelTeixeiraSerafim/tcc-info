package com.rafaelteixeiraserafim.tcc.dto;

import java.util.List;

public record UserAddresses(
        List<AddressDto> addresses
) {
}
