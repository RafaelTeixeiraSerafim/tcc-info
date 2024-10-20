package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.dto.ProductDto;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.service.ProductService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/products")
@Validated
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<String> createProductRequest(@ModelAttribute @Valid ProductDto productDTO) {
        Long productId = productService.createProductRequest(productDTO);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(productId)
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    @GetMapping("/{productId}")
    public Product getProductById(@PathVariable @Min(1) Long productId) {
        return productService.getProductById(productId);
    }

    @DeleteMapping("/{productId}")
    public String deleteProductById(@PathVariable @Min(1) Long productId) {
        productService.deleteProductById(productId);

        return "Product deleted successfully";
    }

    @DeleteMapping("/batch-delete")
    public String deleteProductsById(@RequestBody List<Long> productIds) {
        productService.deleteProductsById(productIds);

        return "Products deleted successfully";
    }

    @PutMapping("/{productId}")
    public String updateProductById(@PathVariable @Min(1) Long productId, @ModelAttribute @Valid ProductDto productDTO) {
        productService.updateProductById(productId, productDTO);

        return "Product altered successfully";
    }
}
