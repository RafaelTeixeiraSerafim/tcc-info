package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.service.BoughtProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/bought-products")
public class BoughtProductController {
    @Autowired
    private BoughtProductService boughtProductService;

    @GetMapping
    public ResponseEntity<?> getBoughtProducts(@RequestParam Long userId, @RequestParam Long productId) {
        if (userId != null) {
            if (productId != null) {
                return ResponseEntity.ok(boughtProductService.getBoughtProduct(userId, productId));
            }
            return ResponseEntity.ok(boughtProductService.getBoughtProducts(userId));
        }
        return ResponseEntity.badRequest().body("No request parameters sent");
    }
}
