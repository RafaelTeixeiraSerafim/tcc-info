package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.enums.ImageCategory;
import com.rafaelteixeiraserafim.tcc.model.ProductImage;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.repository.ProductImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.Optional;

@Service
public class ProductImageService {
    private final ProductImageRepository productImageRepository;
    private final S3Service s3Service;

    @Autowired
    public ProductImageService(ProductImageRepository productImageRepository, S3Service s3Service) {
        this.productImageRepository = productImageRepository;
        this.s3Service = s3Service;
    }

    public ProductImage getImageById(Long id) {
        Optional<ProductImage> image = productImageRepository.findById(id);

        if (image.isEmpty()) {
            throw new IllegalArgumentException("Image not found");
        }

        return image.get();
    }

    public void createImage(ProductImage productImage) {
        productImageRepository.save(productImage);
    }

//    public List<Image> getImages() {
//        return imageRepository.findAll();
//    }

    public void handleCreateImage(Instant currentTimestamp, MultipartFile file, String imageName, Product product) {
        s3Service.uploadNewFile(currentTimestamp, imageName, file, ImageCategory.PRODUCT);

        ProductImage productImage = new ProductImage();
        productImage.setProduct(product);
        productImage.setUrl(s3Service.getImageUrl(currentTimestamp, imageName, ImageCategory.PRODUCT));
        createImage(productImage);
    }

    public void handleUpdateImage(String url, MultipartFile file) {
        String key = s3Service.getImageKeyFromUrl(url);

        s3Service.deleteFile(key);
        s3Service.uploadNewFile(key, file);
    }

    public void deleteImage(ProductImage productImage) {
        productImageRepository.delete(productImage);
    }

    @Transactional
    public void handleDeleteImage(ProductImage productImage) {
        String s3Url = s3Service.getS3Url();
        if (productImage.getUrl().contains(s3Url)) {
            String key = s3Service.getImageKeyFromUrl(productImage.getUrl());
            s3Service.deleteFile(key);
        }

        this.deleteImage(productImage);
    }
}
