package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.dto.AddressDto;
import com.rafaelteixeiraserafim.tcc.dto.AddressFromPostal;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("api/v1/addresses")
public class AddressController {
    RestTemplate restTemplate = new RestTemplate();
    @Value("${postal_service.base_url}")
    private String postalBaseUrl;
    private final String apiBaseUrl = postalBaseUrl + "api/v1";

    @PostMapping
    public String createAddress(@RequestBody AddressDto addressDto) {
        return restTemplate.postForObject(apiBaseUrl + "/addresses", addressDto, String.class);
    }

    @GetMapping("/{addressId}")
    public AddressDto getAddress(@PathVariable @Min(1) Long addressId) {
        return restTemplate.getForObject(apiBaseUrl + "/addresses/" + addressId.toString(), AddressDto.class);
    }

    @GetMapping()
    public List<AddressDto> getUserAddresses(@RequestParam(required = true) Long userId) {
        ResponseEntity<List<AddressDto>> response = restTemplate.exchange(
                apiBaseUrl + "/addresses?userId=" + userId,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<AddressDto>>() {
                }
        );

        return response.getBody();
    }

    @GetMapping("/postal/{postalCode}")
    public AddressFromPostal getAddressFromPostal(@PathVariable("postalCode") String postalCode) {
        validatePostalCode(postalCode);
        System.out.println(apiBaseUrl + "/postal/" + postalCode);
        return restTemplate.getForObject(apiBaseUrl + "/postal/" + postalCode, AddressFromPostal.class);
    }

    @DeleteMapping("/{addressId}")
    public String deleteAddress(@PathVariable("addressId") @Min(1) Long addressId) {
        restTemplate.delete(apiBaseUrl + "/addresses/" + addressId.toString());
        return "Address deleted successfully";
    }

    @PutMapping("/{addressId}")
    public String updateAddress(@PathVariable("addressId") @Min(1) Long addressId, @RequestBody AddressDto addressDto) {
        restTemplate.put(apiBaseUrl + "/addresses/" + addressId.toString(), addressDto);

        return "Address updated successfully";
    }

    private static void validatePostalCode(String postalCode) throws ResponseStatusException {
        if (postalCode.length() != 8 || !postalCode.chars().allMatch(Character::isDigit)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid postal code format. Postal code needs to have exactly 8 numeric digits.");
        }
    }

//    @GetMapping
//    public List<AddressDto> getAllAddresses() {
//        ResponseEntity<List<AddressDto>> response = restTemplate.exchange(
//                "http://localhost:5000/api/v1/addresses",
//                HttpMethod.GET,
//                null,
//                new ParameterizedTypeReference<List<AddressDto>>() {
//                }
//        );
//
//        return response.getBody();
//    }
}
