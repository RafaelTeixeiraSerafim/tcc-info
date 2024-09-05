package com.rafaelteixeiraserafim.tcc.config;

import com.rafaelteixeiraserafim.tcc.model.Category;
import com.rafaelteixeiraserafim.tcc.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("POST", "GET", "PUT", "DELETE", "PATCH");
            }
        };
    }

    @Bean
    public CommandLineRunner commandLineRunner(CategoryRepository categoryRepository) {
        return args ->  {
            Category category = new Category(
                    "Comida",
                    "sopd"
            );

            categoryRepository.save(category);
        };
    }
}