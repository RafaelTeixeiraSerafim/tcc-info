package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.dto.ImageDTO;
import com.rafaelteixeiraserafim.tcc.dto.ProductDTO;
import com.rafaelteixeiraserafim.tcc.dto.ProductItemDTO;
import com.rafaelteixeiraserafim.tcc.dto.ProductRequest;
import com.rafaelteixeiraserafim.tcc.model.Category;
import com.rafaelteixeiraserafim.tcc.model.Image;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.model.ProductItem;
import com.rafaelteixeiraserafim.tcc.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final ProductItemService productItemService;
    private final ImageService imageService;

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryService categoryService, ProductItemService productItemService, ImageService imageService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
        this.productItemService = productItemService;
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
    public void createProductRequest(ProductRequest productRequest) {
        ProductDTO productDTO = productRequest.getProductDTO();
        List<ProductItemDTO> productItemDTOs = productRequest.getProductItemDTOs();

        Category category = categoryService.getCategoryById(productDTO.getCategory());

        Product product = new Product();
        product.setName(productDTO.getName());
        product.setAbout(productDTO.getAbout());
        product.setDescription(productDTO.getDescription());
        product.setCategory(category);

        createProduct(product);

        for (ProductItemDTO productItemDTO : productItemDTOs) {
            ProductItem productItem = new ProductItem();
            productItem.setOrigPrice(productItemDTO.getOrigPrice());
            productItem.setSalePrice(productItemDTO.getSalePrice());
            productItem.setStockQty(productItemDTO.getStockQty());
            productItem.setWeight(productItemDTO.getWeight());
            productItem.setWeightUnit(productItemDTO.getWeightUnit());
            productItem.setProduct(product);

            productItemService.createProductItem(productItem);

            List<ImageDTO> images = productItemDTO.getImages();

                Instant currentTimestamp = Instant.now();

                for (int i = 0; i < images.size(); i++) {
                    imageService.handleImageCreation(currentTimestamp, images.get(i).getFile(), String.valueOf(i), productItem);
                }
        }
    }

    @Transactional
    public void updateProductById(Long productId, ProductRequest productRequest) {
        Product product = getProductById(productId);
        ProductDTO productDTO = productRequest.getProductDTO();
        List<ProductItemDTO> productItemDTOs = productRequest.getProductItemDTOs();
        Category category = categoryService.getCategoryById(productDTO.getCategory());

        product.setName(productDTO.getName());
        product.setAbout(productDTO.getAbout());
        product.setDescription(productDTO.getDescription());
        product.setCategory(category);

        for (ProductItemDTO productItemDTO : productItemDTOs) {
            ProductItem productItem = productItemService.getProductItemById(productItemDTO.getId());

            productItem.setOrigPrice(productItemDTO.getOrigPrice());
            productItem.setSalePrice(productItemDTO.getSalePrice());
            productItem.setStockQty(productItemDTO.getStockQty());
            productItem.setWeight(productItemDTO.getWeight());
            productItem.setWeightUnit(productItemDTO.getWeightUnit());
            productItem.setProduct(product);

            List<ImageDTO> images = productItemDTO.getImages();

            Instant currentTimestamp = Instant.now();

            for (int i = 0; i < images.size(); i++) {
                String imageUrl = images.get(i).getUrl();
                MultipartFile imageFile = images.get(i).getFile();

                if (imageUrl.isEmpty()) {
                    imageService.handleImageCreation(currentTimestamp, images.get(i).getFile(), String.valueOf(i), productItem);
                } else if (!imageFile.isEmpty()) {
                    imageService.handleImageUpdate(imageUrl, imageFile);
                }
            }
        }


    }
}
