package com.rafaelteixeiraserafim.tcc.product;

import jakarta.persistence.*;

@Entity
@Table
public class Product {
    @Id
    @SequenceGenerator(
            name = "product_sequence",
            sequenceName = "product_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "product_sequence"
    )
    private Long id;
    private String name;
    private String about;
    private String description;
    private float orig_price;
    private float sale_price;

    public Product() {
    }

    public Product(Long id,
                   String name,
                   String about,
                   String description,
                   float orig_price,
                   float sale_price) {
        this.id = id;
        this.name = name;
        this.about = about;
        this.description = description;
        this.orig_price = orig_price;
        this.sale_price = sale_price;
    }

    public Product(String name,
                   String about,
                   String description,
                   float orig_price,
                   float sale_price) {
        this.name = name;
        this.about = about;
        this.description = description;
        this.orig_price = orig_price;
        this.sale_price = sale_price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getOrig_price() {
        return orig_price;
    }

    public void setOrig_price(float orig_price) {
        this.orig_price = orig_price;
    }

    public float getSale_price() {
        return sale_price;
    }

    public void setSale_price(float sale_price) {
        this.sale_price = sale_price;
    }
}
