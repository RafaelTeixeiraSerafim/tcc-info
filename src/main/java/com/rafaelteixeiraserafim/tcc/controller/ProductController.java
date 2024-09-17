package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.dto.ProductDto;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/products")
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public String createProductRequest(@ModelAttribute ProductDto productDTO) {
        productService.createProductRequest(productDTO);

        return "Data added successfully";
    }

    @GetMapping
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    @GetMapping("/{productId}")
    public Product getProductById(@PathVariable Long productId) {
        return productService.getProductById(productId);
    }

    @DeleteMapping("/{productId}")
    public String deleteProductById(@PathVariable Long productId) {
        productService.deleteProductById(productId);

        return "Product deleted successfully";
    }

    @DeleteMapping("/batch-delete")
    public String deleteProductsById(@RequestBody List<Long> productIds) {
        productService.deleteProductsById(productIds);

        return "Products deleted successfully";
    }

    @PutMapping("/{productId}")
    public String updateProductById(@PathVariable Long productId, @ModelAttribute ProductDto productDTO) {
        productService.updateProductById(productId, productDTO);

        return "Product altered successfully";
    }
}
