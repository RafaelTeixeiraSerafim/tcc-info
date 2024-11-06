package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.service.BoughtProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("api/v1/bought-products")
public class BoughtProductController {
    private final BoughtProductService boughtProductService;

    @Autowired
    public BoughtProductController(BoughtProductService boughtProductService) {
        this.boughtProductService = boughtProductService;
    }

    @GetMapping
    public ResponseEntity<?> getBoughtProducts(@RequestParam Long userId, @RequestParam(required = false) Long productId) {
        if (productId != null) {
            return ResponseEntity.ok(boughtProductService.getBoughtProductByOrderId(userId, productId));
        }
        return ResponseEntity.ok(boughtProductService.getBoughtProducts(userId));
    }

    @GetMapping("/most-bought")
    public ResponseEntity<?> getMostBoughtProducts() {
        return ResponseEntity.ok(Map.of("mostBoughtProducts", boughtProductService.getMostBoughtProducts()));
    }
}
