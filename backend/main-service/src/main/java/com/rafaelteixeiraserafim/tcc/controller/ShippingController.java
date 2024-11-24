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
    public ResponseEntity<?> calculateShipping(@RequestParam(value = "userId", required = false) Long userId, @RequestParam(value = "productId", required = false) Long productId, @RequestParam(value = "qty", required = false) Integer qty, @RequestParam("postalCode") String postalCode) {
        ShippingOptionsResponseDto response;

        if (userId != null) {
            response = shippingService.calculateShipping(userId, postalCode);
        } else if (productId != null && qty != null) {
            response = shippingService.calculateShipping(productId, postalCode, qty);
        } else {
            return ResponseEntity.badRequest().body("Missing required parameters");
        }

        return ResponseEntity.ok(response);
    }
}
