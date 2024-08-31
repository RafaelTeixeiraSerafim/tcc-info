package com.rafaelteixeiraserafim.tcc.product;

import com.rafaelteixeiraserafim.tcc.category.Category;
import com.rafaelteixeiraserafim.tcc.category.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class ProductConfig {

    @Bean
    CommandLineRunner commandLineRunner(ProductRepository productRepository, CategoryRepository categoryRepository) {
        return args -> {
            Category category = new Category(
                    "Comida",
                    "çlkjsfd"
            );

            categoryRepository.save(category);

            Product product = new Product(
                    category,
                    "Mel",
                    "aasdfasdf",
                    "sdfl"
            );

            productRepository.saveAll(List.of(product));
        };
    }
}
