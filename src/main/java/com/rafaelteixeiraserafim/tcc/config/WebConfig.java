package com.rafaelteixeiraserafim.tcc.config;

import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;
import com.rafaelteixeiraserafim.tcc.enums.UserRole;
import com.rafaelteixeiraserafim.tcc.model.*;
import com.rafaelteixeiraserafim.tcc.repository.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.math.BigDecimal;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Value("${frontend.base_url}")
    private String frontendBaseUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        System.out.println(frontendBaseUrl);
        registry.addMapping("/api/**")
                .allowedOrigins(frontendBaseUrl)
                .allowedMethods("POST", "GET", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowCredentials(true)
                .allowedHeaders("*"); // TODO - Add maxAge in prod
    }

//    @Bean
//    public CommandLineRunner commandLineRunner(CategoryRepository categoryRepository, UserRepository userRepository, OrderRepository orderRepository, ProductRepository productRepository, ImageRepository imageRepository) {
//        return args ->  {
//            Category category = new Category(
//                    "Comida",
//                    "sopd"
//            );
//            categoryRepository.save(category);
//
//            Product product = new Product(category, "Mel Sivestre", "slkdjfçlj", "sçdjkfsljsçl", new BigDecimal(100), new BigDecimal(90), 4);
//            productRepository.save(product);
//
//            Image image1 = new Image("https://images.tcdn.com.br/img/img_prod/761170/kit_beeva_masterchef_mel_flores_de_juazeiro_da_caatinga_560g_mel_silvestre_da_caatinga_560g_1737_1_92e411091a3aa9100c2035d02d45028c.jpg", product);
//            Image image2 = new Image("https://images.tcdn.com.br/img/img_prod/761170/kit_beeva_masterchef_mel_flores_de_juazeiro_da_caatinga_560g_mel_silvestre_da_caatinga_560g_1737_2_7d0610febf51ce1d31d7b072861a1183.jpg", product);
//            Image image3 = new Image("https://images.tcdn.com.br/img/img_prod/761170/kit_beeva_masterchef_mel_flores_de_juazeiro_da_caatinga_560g_mel_silvestre_da_caatinga_560g_1737_3_f31fbabb7c47447f416986fbbabe5fe1.jpg", product);
//
//            String password = "admin";
//            String encryptedPassword = new BCryptPasswordEncoder().encode(password);
//            User user = new User(
//                    "admin",
//                    "rafael.teixeiraserafim@gmail.com",
//                    encryptedPassword,
//                    UserRole.ADMIN
//            );
//
//            userRepository.save(user);
//            Order order = new Order(user, OrderStatus.IN_PROGRESS);
//            orderRepository.save(order);
//            imageRepository.save(image1);
//            imageRepository.save(image2);
//            imageRepository.save(image3);
//        };
//    }
}