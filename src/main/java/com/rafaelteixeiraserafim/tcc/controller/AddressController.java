package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.dto.AddressDto;
import com.rafaelteixeiraserafim.tcc.dto.AddressFromPostal;
import com.rafaelteixeiraserafim.tcc.service.AddressService;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
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
    private final AddressService addressService;

    @Autowired
    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PostMapping
    public String createAddress(@RequestBody AddressDto addressDto) {
        return addressService.createAddress(addressDto);
    }

    @GetMapping("/{addressId}")
    public AddressDto getAddress(@PathVariable @Min(1) Long addressId) {
        return addressService.getAddress(addressId);
    }

    @GetMapping()
    public List<AddressDto> getUserAddresses(@RequestParam(required = true) Long userId) {
        return addressService.getUserAddresses(userId);
    }

    @GetMapping("/postal/{postalCode}")
    public AddressFromPostal getAddressFromPostal(@PathVariable("postalCode") String postalCode) {
        AddressService.validatePostalCode(postalCode);
        return addressService.getAddressFromPostal(postalCode);
    }

    @DeleteMapping("/{addressId}")
    public String deleteAddress(@PathVariable("addressId") @Min(1) Long addressId) {
        addressService.deleteAddress(addressId);
        return "Address deleted successfully";
    }

    @PutMapping("/{addressId}")
    public String updateAddress(@PathVariable("addressId") @Min(1) Long addressId, @RequestBody AddressDto addressDto) {
        addressService.updateAddress(addressId, addressDto);

        return "Address updated successfully";
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
