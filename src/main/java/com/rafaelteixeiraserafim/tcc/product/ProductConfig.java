package com.rafaelteixeiraserafim.tcc.product;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class ProductConfig {

    @Bean
    CommandLineRunner commandLineRunner(ProductRepository repository) {
        return args -> {
            Product mel = new Product(
                    "Mel",
                    "yum",
                    "aasdfasdf",
                    12.99f,
                    10f
            );

            Product cera = new Product(
                    "Cera",
                    "yum",
                    "aasdfasdf",
                    12.99f,
                    10f
            );

            repository.saveAll(List.of(mel, cera));
        };
    }
}
