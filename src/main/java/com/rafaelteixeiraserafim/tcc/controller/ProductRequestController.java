package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.product_request.ProductRequest;
import com.rafaelteixeiraserafim.tcc.service.ProductRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/product")
public class ProductRequestController {
    private final ProductRequestService productRequestService;

    @Autowired
    public ProductRequestController(ProductRequestService productRequestService) {
        this.productRequestService = productRequestService;
    }

    @PostMapping
    public ResponseEntity<String> createProductRequest(@ModelAttribute ProductRequest productRequest) {
        productRequestService.createProductRequest(productRequest);

        return ResponseEntity.ok("Data added successfully");
    }

    @GetMapping
    public List<String> getProductRequest() {
        return productRequestService.getProductRequest();
    }

//    @PostMapping
//    public ResponseEntity<String> registerProductRequest(@RequestBody ProductRequest productRequest) {
//        ProductDTO productDTO = productRequest.getProductDTO();
//        ProductItem productItem = productRequest.getProductItem();
//        List<Weight> weights = productRequest.getWeights();
//
//        productRequestService.createProductRequest(productDTO, productItem, weights);
//
//        return ResponseEntity.ok("Data added successfully");
//    }
}
