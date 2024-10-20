package com.rafaelteixeiraserafim.tcc.dto;

public record AddressFromPostal(
        String postalCode,
        String state,
        String city,
        String neighbourhood,
        String street
) {
}
