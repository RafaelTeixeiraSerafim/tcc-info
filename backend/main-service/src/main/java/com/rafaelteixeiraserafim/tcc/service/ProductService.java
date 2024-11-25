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
    private final ProductImageService productImageService;

    @Autowired
    public ProductService(ProductRepository productRepository, ProductImageService productImageService) {
        this.productRepository = productRepository;
        this.productImageService = productImageService;
    }

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public List<Product> getActiveProducts() {
        return productRepository.findByDeactivated(false);
    }

    public List<Product> getProducts(Category category) {
        return productRepository.findByCategory(category);
    }

    public Product getProduct(Long productId) {
        Optional<Product> product = productRepository.findById(productId);

        if (product.isEmpty()) {
            throw new IllegalStateException("product with id " + productId + " does not exist");
        }

        return product.get();
    }

    public static boolean hasBeenBought(Product product) {
        for (OrderItem orderItem : product.getOrderItems()) {
            if (orderItem.getPrice() != null) {
            System.out.println("Já foi comprado: " + product.getName() + orderItem.getPrice());
                return true;
            }
        }

        return false;
    }

    @Transactional
    public void deleteProduct(Long productId) {
        Product product = getProduct(productId);

        if (hasBeenBought(product)) {
            product.setDeactivated(true);
            productRepository.save(product);
            return;
        }

        for (ProductImage productImage : product.getImages()) {
            productImageService.handleDeleteImage(productImage);
        }

        System.out.println("Deleting product: " + product.getName());
        productRepository.delete(product);
    }

    @Transactional
    public Product createProduct(ProductRequest productRequest, Category category) {
        Product newProduct = new Product();
        Product product = populateProductFromDto(productRequest, newProduct, category);

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
    public Product updateProduct(Long productId, ProductRequest productRequest, Category category) {
        Product product = getProduct(productId);
        populateProductFromDto(productRequest, product, category);

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

    private Product populateProductFromDto(ProductRequest productRequest, Product product, Category category) {
//        Category category = categoryService.getCategory(productRequest.getCategoryId());

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
        product.setDeactivated(false);

        return product;
    }

    @Transactional
    public void deleteProducts(List<Long> productIds) {
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
            productRepository.save(product);
        }
    }

    @Transactional
    public void deactivate(Long productId) {
        Product product = getProduct(productId);
        product.setDeactivated(true);
        productRepository.save(product);
    }

    @Transactional
    public void deactivate(List<Long> productIds) {
        for (Long productId : productIds) {
            deactivate(productId);
        }
    }

    @Transactional
    public void reactivate(Long productId) {
        Product product = getProduct(productId);
        if (!product.getCategory().getDeactivated()) {
            product.setDeactivated(false);
            productRepository.save(product);
        }
    }

    @Transactional
    public void reactivate(List<Long> productIds) {
        for (Long productId : productIds) {
            reactivate(productId);
        }
    }
}
