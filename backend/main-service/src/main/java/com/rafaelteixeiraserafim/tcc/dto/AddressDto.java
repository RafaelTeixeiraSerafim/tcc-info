package com.rafaelteixeiraserafim.tcc.dto;

public record AddressDto(
        Long id,
        Long userId,
        String fullName,
        String postalCode,
        String state,
        String city,
        String neighbourhood,
        String street,
        String houseNumber,
        String apartmentNumber,
        String contactPhone,
        boolean deactivated
) {
}
