package com.rafaelteixeiraserafim.tcc.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {
    @NotNull
    private String name;
    private String about;
    @NotNull
    private String description;
    @NotNull
    private Long categoryId;
    @NotNull
    private BigDecimal origPrice;
    private BigDecimal salePrice;
    @NotNull
    private int stockQty;
    @NotNull
    private BigDecimal length;
    @NotNull
    private BigDecimal width;
    @NotNull
    private BigDecimal height;
    @NotNull
    private BigDecimal weight;
    private List<ImageDto> images;
}
