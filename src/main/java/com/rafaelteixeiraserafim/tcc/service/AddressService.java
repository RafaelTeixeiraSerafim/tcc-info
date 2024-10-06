package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.dto.AddressDto;
import com.rafaelteixeiraserafim.tcc.dto.AddressFromPostal;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AddressService {
    RestTemplate restTemplate = new RestTemplate();
    @Value("${postal_service.base_url}")
    private String postalBaseUrl;

    public String createAddress(AddressDto addressDto) {
        return restTemplate.postForObject(postalBaseUrl + "api/v1/addresses", addressDto, String.class);
    }

    public AddressDto getAddress(@Min(1) Long addressId) {
        return restTemplate.getForObject(postalBaseUrl + "api/v1/addresses/" + addressId.toString(), AddressDto.class);
    }

    public List<AddressDto> getUserAddresses(Long userId) {
        ResponseEntity<List<AddressDto>> response = restTemplate.exchange(
                postalBaseUrl + "api/v1/addresses?userId=" + userId,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<AddressDto>>() {
                }
        );

        return response.getBody();
    }

    public AddressFromPostal getAddressFromPostal(String postalCode) {
        System.out.println(postalBaseUrl + "api/v1/postal/" + postalCode);
        return restTemplate.getForObject(postalBaseUrl + "api/v1/postal/" + postalCode, AddressFromPostal.class);
    }

    public static void validatePostalCode(String postalCode) throws ResponseStatusException {
        if (postalCode.length() != 8 || !postalCode.chars().allMatch(Character::isDigit)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid postal code format. Postal code needs to have exactly 8 numeric digits.");
        }
    }

    public void deleteAddress(@Min(1) Long addressId) {
        restTemplate.delete(postalBaseUrl + "api/v1/addresses/" + addressId.toString());
    }

    public void updateAddress(@Min(1) Long addressId, AddressDto addressDto) {
        restTemplate.put(postalBaseUrl + "api/v1/addresses/" + addressId.toString(), addressDto);
    }
}
