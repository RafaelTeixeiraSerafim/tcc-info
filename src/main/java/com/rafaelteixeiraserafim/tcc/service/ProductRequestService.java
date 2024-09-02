package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.model.Category;
import com.rafaelteixeiraserafim.tcc.product_request.ProductRequest;
import com.rafaelteixeiraserafim.tcc.repository.CategoryRepository;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.product.ProductDTO;
import com.rafaelteixeiraserafim.tcc.model.ProductItem;
import com.rafaelteixeiraserafim.tcc.model.Weight;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.transfer.s3.S3TransferManager;
import software.amazon.awssdk.transfer.s3.model.CompletedFileUpload;
import software.amazon.awssdk.transfer.s3.model.FileUpload;
import software.amazon.awssdk.transfer.s3.model.UploadFileRequest;

import java.net.URI;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

@Service
public class ProductRequestService {
    private final ProductService productService;
    private final ProductItemService productItemService;
    private final WeightService weightService;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ProductRequestService(ProductService productService, ProductItemService productItemService, WeightService weightService, CategoryRepository categoryRepository) {
        this.productService = productService;
        this.productItemService = productItemService;
        this.weightService = weightService;
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public void createProductRequest(ProductRequest productRequest) {
        S3TransferManager transferManager = S3TransferManager.create();

        ProductDTO productDTO = productRequest.getProductDTO();
        ProductItem productItem = productRequest.getProductItem();
        List<Weight> weights = productRequest.getWeights();

        Category category = categoryRepository.findById(productDTO.getCategory())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Product product = new Product();
        product.setName(productDTO.getName());
        product.setAbout(productDTO.getAbout());
        product.setDescription(productDTO.getDescription());
        product.setCategory(category);

        productService.createProduct(product);
        productItem.setProduct(product);

        productItemService.createProductItem(productItem);

        for (Weight weight : weights) {
            weight.setProductItem(productItem);
            weightService.createWeight(weight);
        }
    }

    public String uploadFile(S3TransferManager transferManager, String bucketName,
                             String key, URI filePathURI) {
        UploadFileRequest uploadFileRequest = UploadFileRequest.builder()
                .putObjectRequest(b -> b.bucket(bucketName).key(key))
                .source(Paths.get(filePathURI))
                .build();

        FileUpload fileUpload = transferManager.uploadFile(uploadFileRequest);

        CompletedFileUpload uploadResult = fileUpload.completionFuture().join();
        return uploadResult.response().eTag();
    }

    public List<String> getProductRequest() {
        List<String> strings = Arrays.asList("1", "2");

        return strings;
    }

//    @Transactional
//    public void createProductRequest(ProductDTO productDTO, ProductItem productItem, List<Weight> weights) {
//        Category category = categoryRepository.findById(productDTO.getCategory())
//                .orElseThrow(() -> new RuntimeException("Category not found"));
//
//        Product product = new Product();
//        product.setName(productDTO.getName());
//        product.setAbout(productDTO.getAbout());
//        product.setDescription(productDTO.getDescription());
//        product.setCategory(category);
//
//        productService.createProduct(product);
//        productItem.setProduct(product);
//
//        productItemService.createProductItem(productItem);
//
//        for (Weight weight : weights) {
//            weight.setProductItem(productItem);
//            weightService.createWeight(weight);
//        }
//    }
}
