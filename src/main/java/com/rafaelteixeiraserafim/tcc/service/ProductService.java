package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.dto.ImageDto;
import com.rafaelteixeiraserafim.tcc.dto.ProductDto;
import com.rafaelteixeiraserafim.tcc.model.Category;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final ImageService imageService;

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryService categoryService, ImageService imageService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
        this.imageService = imageService;
    }

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long productId) {
        Optional<Product> product = productRepository.findById(productId);

        if (product.isEmpty()) {
            throw new IllegalStateException("product with id " + productId + " does not exist");
        }

        return product.get();
    }

    public void createProduct(Product product) {
        productRepository.save(product);
    }

    public void deleteProductById(Long productId) {
        Optional<Product> product = productRepository.findById(productId);

        if (product.isEmpty()) {
            throw new IllegalStateException("product with id " + productId + " does not exist");
        }

        productRepository.delete(product.get());
    }

    @Transactional
    public void createProductRequest(ProductDto productDTO) {
        Category category = categoryService.getCategoryById(productDTO.getCategory());

        Product product = new Product();
        product.setName(productDTO.getName());
        product.setAbout(productDTO.getAbout());
        product.setDescription(productDTO.getDescription());
        product.setCategory(category);
        product.setOrigPrice(productDTO.getOrigPrice());
        product.setSalePrice(productDTO.getSalePrice());
        product.setStockQty(productDTO.getStockQty());

        createProduct(product);

        List<ImageDto> images = productDTO.getImages();

        Instant currentTimestamp = Instant.now();

        for (int i = 0; i < images.size(); i++) {
            if (images.get(i).getFile() != null) {
                imageService.handleImageCreation(currentTimestamp, images.get(i).getFile(), String.valueOf(i), product);
            }
        }
    }

    @Transactional
    public void updateProductById(Long productId, ProductDto productDTO) {
        Product product = getProductById(productId);
        Category category = categoryService.getCategoryById(productDTO.getCategory());

        product.setName(productDTO.getName());
        product.setAbout(productDTO.getAbout());
        product.setDescription(productDTO.getDescription());
        product.setCategory(category);

        product.setOrigPrice(productDTO.getOrigPrice());
        product.setSalePrice(productDTO.getSalePrice());
        product.setStockQty(productDTO.getStockQty());

        List<ImageDto> images = productDTO.getImages();

        Instant currentTimestamp = Instant.now();

        for (int i = 0; i < images.size(); i++) {
            String imageUrl = images.get(i).getUrl();
            MultipartFile imageFile = images.get(i).getFile();

            if (imageUrl.isEmpty()) {
                imageService.handleImageCreation(currentTimestamp, images.get(i).getFile(), String.valueOf(i), product);
            } else if (imageFile != null) {
                imageService.handleImageUpdate(imageUrl, imageFile);
            }
        }
    }
}
