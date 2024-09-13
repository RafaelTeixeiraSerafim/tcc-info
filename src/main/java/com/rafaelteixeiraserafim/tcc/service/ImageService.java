package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.model.Image;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

    public void handleImageUpdate(String imageUrl, MultipartFile file) {
        String key = imageUrl.split("com/")[1];

        s3Service.deleteFile(key);
        s3Service.uploadNewFile(key, file);
    }
}
