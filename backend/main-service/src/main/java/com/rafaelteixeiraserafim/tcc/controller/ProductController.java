package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.dto.ProductRequest;
import com.rafaelteixeiraserafim.tcc.dto.ProductResponse;
import com.rafaelteixeiraserafim.tcc.model.Category;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.service.BoughtProductService;
import com.rafaelteixeiraserafim.tcc.service.CategoryService;
import com.rafaelteixeiraserafim.tcc.service.ProductService;
import com.rafaelteixeiraserafim.tcc.utils.ModelDtoConversion;
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
    private final CategoryService categoryService;

    @Autowired
    public ProductController(ProductService productService, BoughtProductService boughtProductService, CategoryService categoryService) {
        this.productService = productService;
        this.boughtProductService = boughtProductService;
        this.categoryService = categoryService;
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@ModelAttribute @Valid ProductRequest productRequest) {
        Category category = categoryService.getCategory(productRequest.getCategoryId());
        Product product = productService.createProduct(productRequest, category);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(product.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping
    public List<ProductResponse> getProducts() {
        List<Product> products = productService.getProducts();

        return ModelDtoConversion.createProductResponses(products);
    }

    @GetMapping("/active")
    public List<ProductResponse> getActiveProducts() {
        List<Product> products = productService.getActiveProducts();

        return ModelDtoConversion.createProductResponses(products);
    }

    @GetMapping("/{productId}")
    public ProductResponse getProductById(@PathVariable @Min(1) Long productId) {
        Product product = productService.getProduct(productId);

        return ModelDtoConversion.createProductResponse(product);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<?> deleteProductById(@PathVariable @Min(1) Long productId) {
        productService.deleteProduct(productId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/batch-delete")
    public ResponseEntity<?> deleteProducts(@RequestBody List<Long> productIds) {
        productService.deleteProducts(productIds);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/deactivate")
    public ResponseEntity<?> deactivateProducts(@RequestBody List<Long> productIds) {
        productService.deactivate(productIds);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/reactivate")
    public ResponseEntity<?> reactivateProducts(@RequestBody List<Long> productIds) {
        productService.reactivate(productIds);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{productId}")
    public ResponseEntity<?> updateProductById(@PathVariable @Min(1) Long productId, @ModelAttribute @Valid ProductRequest productRequest) {
        Category category = categoryService.getCategory(productRequest.getCategoryId());
        productService.updateProduct(productId, productRequest, category);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/most-bought")
    public ResponseEntity<?> getMostBoughtProducts() {
        return ResponseEntity.ok(Map.of("mostBoughtProducts", boughtProductService.getMostBoughtProducts()));
    }

    @GetMapping("/{productId}/check-purchased")
    public ResponseEntity<ProductResponse> checkPurchased(@PathVariable @Min(1) Long productId, @RequestParam @Min(1) Long userId) {
        Product product = boughtProductService.getBoughtProductElseNull(userId, productId);

        if (product != null) {
            return ResponseEntity.ok(ModelDtoConversion.createProductResponse(product));
        }
        return ResponseEntity.ok().build();
    }
}
