package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.dto.ProductRequest;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping(path = "api/v1/product")
    public String createProductRequest(@ModelAttribute ProductRequest productRequest) {
        productService.createProductRequest(productRequest);

        return "Data added successfully";
    }

    @GetMapping(path = "api/v1/products")
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    @GetMapping(path = "api/v1/product/{productId}")
    public Product getProductById(@PathVariable Long productId) {
        return productService.getProductById(productId);
    }

    @DeleteMapping(path = "api/v1/product/{productId}")
    public String deleteProductById(@PathVariable Long productId) {
        productService.deleteProductById(productId);

        return "Product deleted successfully";
    }

    @PutMapping(path = "api/v1/product/{productId}")
    public String alterProductById(@PathVariable Long productId, @ModelAttribute ProductRequest productRequest) {
        productService.updateProductById(productId, productRequest);

        return "Product altered successfully";
    }
}
