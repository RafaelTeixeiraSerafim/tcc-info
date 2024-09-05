package com.rafaelteixeiraserafim.tcc.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductItemDTO {
    private Long id;
    private float origPrice;
    private float salePrice;
    private int stockQty;
    private int weight;
    private String weightUnit;
    private List<ImageDTO> images;
}
