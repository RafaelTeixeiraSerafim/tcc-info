package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.dto.ImageDto;
import com.rafaelteixeiraserafim.tcc.dto.ProductDto;
import com.rafaelteixeiraserafim.tcc.model.Category;
import com.rafaelteixeiraserafim.tcc.model.Image;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isEmpty()) {
            throw new IllegalStateException("product with id " + productId + " does not exist");
        }

        Product product = optionalProduct.get();

        for (Image image : product.getImages()) {
            imageService.handleDeleteImage(image);
        }

        productRepository.delete(product);
    }

    @Transactional
    public Long createProductRequest(ProductDto productDTO) {
        Product newProduct = new Product();
        Product product = populateProductFromDto(productDTO, newProduct);

        createProduct(product);

        List<ImageDto> images = productDTO.getImages();

        if (images != null) {
            Instant currentTimestamp = Instant.now();
            for (int i = 0; i < images.size(); i++) {
                MultipartFile file = images.get(i).getFile();
                if (file != null) {
                    imageService.handleImageCreation(currentTimestamp, file, String.valueOf(i), product);
                }
            }
        }

        return product.getId();
    }

    @Transactional
    public void updateProductById(Long productId, ProductDto productDTO) {
        Product product = getProductById(productId);
        populateProductFromDto(productDTO, product);

        List<ImageDto> images = productDTO.getImages();

        if (images == null) return;

        Instant currentTimestamp = Instant.now();
        for (int i = 0; i < images.size(); i++) {
            String imageUrl = images.get(i).getUrl();
            MultipartFile imageFile = images.get(i).getFile();

            if (imageUrl.isEmpty()) {
                imageService.handleImageCreation(currentTimestamp, imageFile, String.valueOf(i), product);
            } else if (imageFile != null) {
                imageService.handleImageUpdate(imageUrl, imageFile);
            }
        }
    }

    private Product populateProductFromDto(ProductDto productDTO, Product product) {
        Category category = categoryService.getCategoryById(productDTO.getCategoryId());

        product.setName(productDTO.getName());
        product.setAbout(productDTO.getAbout());
        product.setDescription(productDTO.getDescription());
        product.setCategory(category);
        product.setOrigPrice(productDTO.getOrigPrice());
        product.setSalePrice(productDTO.getSalePrice());
        product.setStockQty(productDTO.getStockQty());
        product.setLength(productDTO.getLength());
        product.setHeight(productDTO.getHeight());
        product.setWidth(productDTO.getWidth());
        product.setWeight(productDTO.getWeight());

        return product;
    }

    public void deleteProductsById(List<Long> productIds) {
        for (Long productId : productIds) {
            deleteProductById(productId);
        }
    }
}
