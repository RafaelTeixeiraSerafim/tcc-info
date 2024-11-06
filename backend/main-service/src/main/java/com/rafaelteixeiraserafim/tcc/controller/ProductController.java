package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.dto.ProductDto;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.service.BoughtProductService;
import com.rafaelteixeiraserafim.tcc.service.ProductService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "api/v1/products")
@Validated
public class ProductController {
    private final ProductService productService;
    private final BoughtProductService boughtProductService;

    @Autowired
    public ProductController(ProductService productService, BoughtProductService boughtProductService) {
        this.productService = productService;
        this.boughtProductService = boughtProductService;
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@ModelAttribute @Valid ProductDto productDTO) {
        Product product = productService.createProductRequest(productDTO);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(product.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    @GetMapping("/{productId}")
    public Product getProductById(@PathVariable @Min(1) Long productId) {
        return productService.getProduct(productId);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<?> deleteProductById(@PathVariable @Min(1) Long productId) {
        productService.deleteProduct(productId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/batch-delete")
    public ResponseEntity<?> deleteProductsById(@RequestBody List<Long> productIds) {
        productService.deleteProductsById(productIds);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/{productId}")
    public String updateProductById(@PathVariable @Min(1) Long productId, @ModelAttribute @Valid ProductDto productDTO) {
        productService.updateProduct(productId, productDTO);

        return "Product altered successfully";
    }

    @GetMapping("/most-bought")
    public ResponseEntity<?> getMostBoughtProducts() {
        return ResponseEntity.ok(Map.of("mostBoughtProducts", boughtProductService.getMostBoughtProducts()));
    }

    @GetMapping("/{productId}/check-purchased")
    public ResponseEntity<?> checkPurchased(@PathVariable @Min(1) Long productId, @RequestParam @Min(1) Long userId) {
        return ResponseEntity.ok(boughtProductService.getBoughtProductElseNull(userId, productId));
    }
}
