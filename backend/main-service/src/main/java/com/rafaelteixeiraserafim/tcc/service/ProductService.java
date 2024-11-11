package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.dto.ImageDto;
import com.rafaelteixeiraserafim.tcc.dto.ProductRequest;
import com.rafaelteixeiraserafim.tcc.model.Category;
import com.rafaelteixeiraserafim.tcc.model.OrderItem;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.model.ProductImage;
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
    private final ProductImageService productImageService;

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryService categoryService, ProductImageService productImageService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
        this.productImageService = productImageService;
    }

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Product getProduct(Long productId) {
        Optional<Product> product = productRepository.findById(productId);

        if (product.isEmpty()) {
            throw new IllegalStateException("product with id " + productId + " does not exist");
        }

        return product.get();
    }

    public void deleteProduct(Long productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isEmpty()) {
            throw new IllegalStateException("product with id " + productId + " does not exist");
        }

        Product product = optionalProduct.get();

        for (ProductImage productImage : product.getImages()) {
            productImageService.handleDeleteImage(productImage);
        }

        productRepository.delete(product);
    }

    @Transactional
    public Product createProductRequest(ProductRequest productRequest) {
        Product newProduct = new Product();
        Product product = populateProductFromDto(productRequest, newProduct);

        productRepository.save(product);

        List<ImageDto> images = productRequest.getImages();

        if (images != null) {
            Instant currentTimestamp = Instant.now();
            for (int i = 0; i < images.size(); i++) {
                MultipartFile file = images.get(i).getFile();
                if (file != null) {
                    productImageService.handleCreateImage(currentTimestamp, file, String.valueOf(i), product);
                }
            }
        }

        return product;
    }

    @Transactional
    public Product updateProduct(Long productId, ProductRequest productRequest) {
        Product product = getProduct(productId);
        populateProductFromDto(productRequest, product);

        List<ImageDto> images = productRequest.getImages();

        if (images == null) return productRepository.save(product);

        Instant currentTimestamp = Instant.now();
        for (int i = 0; i < images.size(); i++) {
            ImageDto imageDto = images.get(i);
            String imageUrl = imageDto.getUrl();
            MultipartFile imageFile = imageDto.getFile();

            if (imageUrl == null) {
                productImageService.handleCreateImage(currentTimestamp, imageFile, String.valueOf(i), product);
            } else if (imageUrl.isEmpty()) {
                ProductImage productImage = productImageService.getImageById(imageDto.getId());
                productImageService.handleDeleteImage(productImage);
            } else if (imageFile != null) {
                productImageService.handleUpdateImage(imageUrl, imageFile);
            }
        }

        return productRepository.save(product);
    }

    private Product populateProductFromDto(ProductRequest productRequest, Product product) {
        Category category = categoryService.getCategory(productRequest.getCategoryId());

        product.setName(productRequest.getName());
        product.setAbout(productRequest.getAbout());
        product.setDescription(productRequest.getDescription());
        product.setCategory(category);
        product.setOrigPrice(productRequest.getOrigPrice());
        product.setSalePrice(productRequest.getSalePrice());
        product.setStockQty(productRequest.getStockQty());
        product.setLength(productRequest.getLength());
        product.setHeight(productRequest.getHeight());
        product.setWidth(productRequest.getWidth());
        product.setWeight(productRequest.getWeight());

        return product;
    }

    public void deleteProductsById(List<Long> productIds) {
        for (Long productId : productIds) {
            deleteProduct(productId);
        }
    }

    public void updateStockQtys(List<OrderItem> orderItems) {
        for (OrderItem orderItem : orderItems) {
            Product product = orderItem.getProduct();
            int stockQty = product.getStockQty() - orderItem.getQty();

            if (stockQty < 0) {
                throw new IllegalArgumentException("OrderItem with id " + orderItem.getId() + " has a quantity greater than the stock quantity");
            }

            product.setStockQty(stockQty);
        }
    }
}
