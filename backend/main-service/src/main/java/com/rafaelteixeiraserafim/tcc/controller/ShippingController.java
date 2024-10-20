package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.dto.ShippingOptionsResponseDto;
import com.rafaelteixeiraserafim.tcc.service.ShippingService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/shipping")
@Validated
public class ShippingController {
    private final ShippingService shippingService;

    public ShippingController(ShippingService shippingService) {
        this.shippingService = shippingService;
    }

    @GetMapping("/calculate")
    public ResponseEntity<?> calculateShipping(@RequestParam("userId") Long userId, @RequestParam("postalCode") String postalCode) {
        ShippingOptionsResponseDto response = shippingService.calculateShipping(userId, postalCode);
        return ResponseEntity.ok(response);
    }
}
