package com.rafaelteixeiraserafim.tcc.config;

import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;
import com.rafaelteixeiraserafim.tcc.enums.UserRole;
import com.rafaelteixeiraserafim.tcc.model.*;
import com.rafaelteixeiraserafim.tcc.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;

@Configuration
public class AppConfig {
    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public CommandLineRunner commandLineRunner(CategoryRepository categoryRepository, UserRepository userRepository, ProductRepository productRepository, ProductImageRepository productImageRepository, OrderRepository orderRepository) {
        return args -> {
            if (categoryRepository.findAll().isEmpty()) {
                Category category = new Category(
                        "Mel",
                        "sopd"
                );
                categoryRepository.save(category);

                Product product = new Product(category, "Mel Sivestre", "slkdjfçlj", "sçdjkfsljsçl", new BigDecimal(40), new BigDecimal(30), 4, new BigDecimal(10), new BigDecimal(5), new BigDecimal(7), new BigDecimal(2));
                productRepository.save(product);

                ProductImage productImage1 = new ProductImage("https://images.tcdn.com.br/img/img_prod/761170/kit_beeva_masterchef_mel_flores_de_juazeiro_da_caatinga_560g_mel_silvestre_da_caatinga_560g_1737_1_92e411091a3aa9100c2035d02d45028c.jpg", product);
                ProductImage productImage2 = new ProductImage("https://images.tcdn.com.br/img/img_prod/761170/kit_beeva_masterchef_mel_flores_de_juazeiro_da_caatinga_560g_mel_silvestre_da_caatinga_560g_1737_2_7d0610febf51ce1d31d7b072861a1183.jpg", product);
                ProductImage productImage3 = new ProductImage("https://images.tcdn.com.br/img/img_prod/761170/kit_beeva_masterchef_mel_flores_de_juazeiro_da_caatinga_560g_mel_silvestre_da_caatinga_560g_1737_3_f31fbabb7c47447f416986fbbabe5fe1.jpg", product);

                productImageRepository.save(productImage1);
                productImageRepository.save(productImage2);
                productImageRepository.save(productImage3);
            }
            if (userRepository.findAll().isEmpty()) {
                String adminPassword = "admin";
                String encryptedAdminPassword = new BCryptPasswordEncoder().encode(adminPassword);
                User admin = new User(
                        "admin",
                        "rafael.teixeiraserafim@gmail.com",
                        encryptedAdminPassword,
                        UserRole.ADMIN
                );

                String password = "123";
                String encryptedPassword = new BCryptPasswordEncoder().encode(password);
                User user = new User(
                        "rafaelT",
                        "rafael@gmail.com",
                        encryptedPassword,
                        UserRole.CLIENT
                );

                userRepository.save(user);

                Order order = new Order(user, OrderStatus.IN_PROGRESS);

                orderRepository.save(order);
                userRepository.save(admin);
            }
        };
    }
}
