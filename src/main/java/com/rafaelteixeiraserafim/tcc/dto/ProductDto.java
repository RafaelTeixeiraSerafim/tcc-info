package com.rafaelteixeiraserafim.tcc.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    private String name;
    private String about;
    private String description;
    private Long categoryId;
    private BigDecimal origPrice;
    private BigDecimal salePrice;
    private int stockQty;
    private List<ImageDto> images;
}
