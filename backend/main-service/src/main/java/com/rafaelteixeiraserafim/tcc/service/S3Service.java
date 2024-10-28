package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.enums.ImageCategory;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.time.Instant;

@Service
public class S3Service {
    private final S3Client s3Client;
    @Value("${aws.bucket-name}")
    private String bucketName;
    @Getter
    @Value("${aws.url}")
    private String s3Url;

    @Autowired
    public S3Service(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    private void uploadFile(String key, byte[] bytes) {
        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(bytes));
            System.out.println("File upload successful");
        } catch (S3Exception e) {
            System.err.println(e.getMessage());
            System.exit(1);
        }
    }

    public void deleteFile(String key) {
        ObjectIdentifier objectId = ObjectIdentifier.builder()
                .key(key)
                .build();

        Delete delete = Delete.builder().objects(objectId).build();

        try {
            DeleteObjectsRequest multiObjectDeleteRequest = DeleteObjectsRequest.builder()
                    .bucket(bucketName)
                    .delete(delete)
                    .build();

            s3Client.deleteObjects(multiObjectDeleteRequest);
            System.out.println("Objects deletion successful");
        } catch (S3Exception e) {
            System.err.println(e.getMessage());
            System.exit(1);
        }
    }

    public String createImageKey(Instant timestamp, String name, ImageCategory category) {
        return "images/" + category.getCategory() + "/" + timestamp + "/" + name + ".png";
    }

    public String getImageKeyFromUrl(String url) {
        return url.split("com/")[1];
    }

    public String getImageUrl(Instant timestamp, String name, ImageCategory category) {
        String key = createImageKey(timestamp, name, category);

        return s3Url + key;
    }

    public String getImageUrl(String key) {
        return s3Url + key;
    }

    public void uploadNewFile(Instant timestamp, String name, MultipartFile imageFile, ImageCategory category) {
        try {
            String key = createImageKey(timestamp, name, category);

            uploadFile(key, imageFile.getBytes());
        } catch (IOException e) {
            System.err.println(e.getMessage());
            System.exit(1);
        }
    }

    public void uploadNewFile(String key, MultipartFile imageFile) {
        try {
            uploadFile(key, imageFile.getBytes());
        } catch (IOException e) {
            System.err.println(e.getMessage());
            System.exit(1);
        }
    }
}
