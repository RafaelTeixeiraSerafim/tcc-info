package com.rafaelteixeiraserafim.tcc.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.time.Instant;

@Service
public class S3Service {
    S3Client s3 = S3Client.create();
    private final String bucketName = "tcc-info-backend";

    private void uploadFile(String key, byte[] bytes) {
        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            s3.putObject(putObjectRequest, RequestBody.fromBytes(bytes));
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

            s3.deleteObjects(multiObjectDeleteRequest);
            System.out.println("Objects deletion successful");
        } catch (S3Exception e) {
            System.err.println(e.getMessage());
            System.exit(1);
        }
    }

    public String createImageKey(Instant timestamp, String name) {
        return "images/" + timestamp + "/" + name + ".png";
    }

    public String getImageKeyFromUrl(String url) {
        return url.split("com/")[1];
    }

    public String getImageUrl(Instant timestamp, String name) {
        String key = createImageKey(timestamp, name);
        String s3Url = "https://tcc-info-backend.s3.amazonaws.com/";

        return s3Url + key;
    }

    public String getImageUrl(String key) {
        String s3Url = "https://tcc-info-backend.s3.amazonaws.com/";

        return s3Url + key;
    }

    public void uploadNewFile(Instant timestamp, String name, MultipartFile imageFile) {
        try {
            String key = createImageKey(timestamp, name);

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
