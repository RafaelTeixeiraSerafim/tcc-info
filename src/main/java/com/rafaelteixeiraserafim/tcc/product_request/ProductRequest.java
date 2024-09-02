package com.rafaelteixeiraserafim.tcc.product_request;

import com.rafaelteixeiraserafim.tcc.product.ProductDTO;
import com.rafaelteixeiraserafim.tcc.model.ProductItem;
import com.rafaelteixeiraserafim.tcc.model.Weight;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {
    private ProductDTO productDTO;
    private ProductItem productItem;
    private List<Weight> weights;
//    private List<MultipartFile> images;
}
