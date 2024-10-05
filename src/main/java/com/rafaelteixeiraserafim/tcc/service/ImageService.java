package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.model.Image;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;

@Service
public class ImageService {
    private final ImageRepository imageRepository;
    private final S3Service s3Service;

    @Autowired
    public ImageService(ImageRepository imageRepository, S3Service s3Service) {
        this.imageRepository = imageRepository;
        this.s3Service = s3Service;
    }

    public Image getImageById(Long id) {
        Image image = imageRepository.findById(id).orElse(null);

        if (image == null) {
            throw new IllegalArgumentException("Image not found");
        }

        return image;
    }

    public void createImage(Image image) {
        imageRepository.save(image);
    }

//    public List<Image> getImages() {
//        return imageRepository.findAll();
//    }

    public void handleImageCreation(Instant currentTimestamp, MultipartFile file, String imageName, Product product) {
        s3Service.uploadNewFile(currentTimestamp, imageName, file);

        Image image = new Image();
        image.setProduct(product);
        image.setUrl(s3Service.getImageUrl(currentTimestamp, imageName));
        createImage(image);
    }

    public void handleImageUpdate(Image image, MultipartFile file) {
        String key = s3Service.getImageKeyFromUrl(image.getUrl());

        s3Service.deleteFile(key);
        s3Service.uploadNewFile(key, file);
        image.setUrl(s3Service.getImageUrl(key));
    }

    public void deleteImage(Image image) {
        imageRepository.delete(image);
    }

    @Transactional
    public void handleDeleteImage(Image image) {
        String key = s3Service.getImageKeyFromUrl(image.getUrl());

        s3Service.deleteFile(key);
        this.deleteImage(image);
    }
}
