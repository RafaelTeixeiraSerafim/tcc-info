package com.rafaelteixeiraserafim.tcc.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {
    private ProductDTO productDTO;
    private List<ProductItemDTO> productItemDTOs;
}
