package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.dto.AddressDto;
import com.rafaelteixeiraserafim.tcc.dto.AddressFromPostal;
import com.rafaelteixeiraserafim.tcc.dto.UserAddresses;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AddressService {
    @Value("${postal-service.base-uri}")
    private String postalBaseUri;

    private final RestTemplate restTemplate;

    @Autowired
    public AddressService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String createAddress(AddressDto addressDto) {
        return restTemplate.postForObject(
                postalBaseUri + "/api/v1/addresses",
                addressDto,
                String.class
        );
    }

    public AddressDto getAddress(@Min(1) Long addressId) {
        return restTemplate.getForObject(
                postalBaseUri + "/api/v1/addresses/" + addressId.toString(),
                AddressDto.class
        );
    }

    public UserAddresses getUserAddresses(@Min(1) Long userId) {
        return restTemplate.getForObject(
                postalBaseUri + "/api/v1/addresses?userId=" + userId,
                UserAddresses.class
        );
    }

    public AddressFromPostal getAddressFromPostal(String postalCode) {
        return restTemplate.getForObject(
                postalBaseUri + "/api/v1/addresses/postal-code/" + postalCode,
                AddressFromPostal.class
        );
    }

    public static void validatePostalCode(String postalCode) throws ResponseStatusException {
        if (postalCode.length() != 8 || !postalCode.chars().allMatch(Character::isDigit)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid postal code format. Postal code needs to have exactly 8 numeric digits."
            );
        }
    }

    public void deleteAddress(@Min(1) Long addressId) {
        restTemplate.delete(postalBaseUri + "/api/v1/addresses/" + addressId.toString());
    }

    public void updateAddress(@Min(1) Long addressId, AddressDto addressDto) {
        restTemplate.put(
                postalBaseUri + "/api/v1/addresses/" + addressId.toString(),
                addressDto
        );
    }
}
