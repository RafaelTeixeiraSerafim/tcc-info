package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.model.ProductItem;
import com.rafaelteixeiraserafim.tcc.repository.ProductItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductItemService {
    private final ProductItemRepository productItemRepository;

    @Autowired
    public ProductItemService(ProductItemRepository productItemRepository) {
        this.productItemRepository = productItemRepository;
    }

    public void createProductItem(ProductItem productItem) {
        productItemRepository.save(productItem);
    }

    public List<ProductItem> getProductItems() {
        return productItemRepository.findAll();
    }

    public ProductItem getProductItemById(Long productItemId) {
        Optional<ProductItem> productItemOptional = productItemRepository.findById(productItemId);

        if (productItemOptional.isEmpty()) {
            throw new IllegalArgumentException("productItem with id " + productItemId + " does not exist");
        }

        return productItemOptional.get();
    }

//    public List<ProductItem> getProductItemsByProduct(Product product) {
//        Optional<List<ProductItem>> productItems = productItemRepository.findProductItemsByProduct(product);
//
//        if (productItems.isEmpty()) {
//            throw new IllegalStateException("productItems that reference this product do not exist");
//        }
//
//        return productItems.get();
//    }
}
