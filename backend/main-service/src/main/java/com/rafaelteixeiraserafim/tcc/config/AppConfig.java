package com.rafaelteixeiraserafim.tcc.config;

import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;
import com.rafaelteixeiraserafim.tcc.enums.UserRole;
import com.rafaelteixeiraserafim.tcc.model.*;
import com.rafaelteixeiraserafim.tcc.repository.*;
import com.rafaelteixeiraserafim.tcc.service.OrderService;
import com.rafaelteixeiraserafim.tcc.utils.ProductUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.Calendar;

@Configuration
public class AppConfig {
    @Bean
//    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public CommandLineRunner commandLineRunner(CategoryRepository categoryRepository, UserRepository userRepository, ProductRepository productRepository, ProductImageRepository productImageRepository, OrderRepository orderRepository, OrderItemRepository orderItemRepository, OrderService orderService) {
        return args -> {
            if (categoryRepository.findAll().isEmpty()) {
                Category category = new Category(
                        "Mel",
                        "sopd",
                        false
                );
                categoryRepository.save(category);

                String name = "Kit Beeva Masterchef - Mel Flores de Juazeiro da Caatinga 560g + Mel Silvestre da Caatinga 560g";
                String description = "Kit  Masterchef Brasil Beeva - Mel Flores de Juazeiro da Caatinga 560g + Mel Silvestre da Caatinga 560g\n" +
                        "\n" +
                        "Este kit reúne duas floradas de sabores incríveis!\n" +
                        "Mel Beeva - Bioma Caatinga Silvestre 560g - MasterChef\n" +
                        "Mel puro com origem no néctar de flores de diferentes espécies da caatinga brasileira, o Mel Silvestre da Caatinga traz nas suas propriedades a riqueza da diversidade do bioma exclusivamente brasileiro.\n" +
                        "\n" +
                        "De coloração clara porém com um sabor intenso, proporciona uma experiência marcante para quem o consome. Além de ser uma fonte natural de energia, possui propriedades que fortalecem o sistema imunológico e auxiliam na capacidade digestiva.\n" +
                        "Harmoniza bem com... bem estar!\n" +
                        "\n" +
                        "Para trazer um equilíbrio entre o sabor suave dos alimentos e marcante do mel, utilize no dia a dia com ingredientes leves como queijos brancos e frutas ou em momentos especiais com carnes brancas dando um toque agridoce às receitas.\n" +
                        "\n" +
                        "+\n" +
                        "Mel Beeva - Bioma Caatinga Flor de Juazeiro 560g - MasterChef\n" +
                        "A marca Beeva, em parceria com a Endemol Shine Brasil, orgulhosamente apresenta a linha de mel MasterChef Brasil. Essa colaboração única combina o melhor da culinária com um compromisso ambiental e social, marcando um novo capítulo na indústria alimentícia brasileira. \n" +
                        "\n" +
                        "Este é um Mel puro com origem predominante no néctar das flores de Juazeiro presente na Caatinga brasileira, não possui nenhuma adição de ingredientes ou conservantes, valorizando o sabor e propriedades.\n" +
                        "\n" +
                        "De coloração dourada e com um aroma floral, proporciona uma experiência de sabor de mel equilibrado e refrescante, ideal para adoçar seu dia a dia com leveza e naturalidade. Além de ser uma fonte natural de energia, possui propriedades que fortalecem o sistema imunológico e auxiliam na capacidade digestiva.\n" +
                        "\n" +
                        "Misture com frutas, iogurtes, queijos e utilize em receitas de pratos leves como peixes e molhos de salada. Indicado também para adoçar sucos e chás por trazer a harmonia entre o sabor e a doçura.\n" +
                        " \n" +
                        "O Mel Masterchef Beeva é:\n" +
                        "\n" +
                        "    Puro\n" +
                        "    Sem aditivos nem conservantes\n" +
                        "    Sem modificação genética\n" +
                        "    Sem aromas artificiais\n" +
                        "    Sem glúten\n" +
                        "    Sem lactose\n" +
                        "    Preserva a denominação de origem\n" +
                        "\n" +
                        "O Bioma\n" +
                        "\n" +
                        "Único Bioma 100% Brasileiro, o Bioma Caatinga oferece riquezas naturais subestimadas. E é nesse bioma diversificado e que tanto acreditamos, que está a origem dos nossos produtos da linha de Méis Caatinga. Respeitando a sazonalidade desse ambiente, suas floradas especificas e sabores únicos.\n" +
                        "Importante\n" +
                        "\n" +
                        "Mel puro cristaliza. Para liquidificá-lo, aqueça em “banho maria” com água quente (máximo 45°C). Esse produto não deve ser consumido por crianças menores de 01 (um) ano de idade.";
                Product product = new Product(category, name, description, new BigDecimal("94.52"), new BigDecimal("75.83"), 7, new BigDecimal(10), new BigDecimal(5), new BigDecimal(7), new BigDecimal(2), false);
                productRepository.save(product);

                ProductImage productImage1 = new ProductImage("https://images.tcdn.com.br/img/img_prod/761170/kit_beeva_masterchef_mel_flores_de_juazeiro_da_caatinga_560g_mel_silvestre_da_caatinga_560g_1737_1_92e411091a3aa9100c2035d02d45028c.jpg", product);
                ProductImage productImage2 = new ProductImage("https://images.tcdn.com.br/img/img_prod/761170/kit_beeva_masterchef_mel_flores_de_juazeiro_da_caatinga_560g_mel_silvestre_da_caatinga_560g_1737_2_7d0610febf51ce1d31d7b072861a1183.jpg", product);
                ProductImage productImage3 = new ProductImage("https://images.tcdn.com.br/img/img_prod/761170/kit_beeva_masterchef_mel_flores_de_juazeiro_da_caatinga_560g_mel_silvestre_da_caatinga_560g_1737_3_f31fbabb7c47447f416986fbbabe5fe1.jpg", product);

                productImageRepository.save(productImage1);
                productImageRepository.save(productImage2);
                productImageRepository.save(productImage3);

                String adminPassword = "admin";
                String encryptedAdminPassword = new BCryptPasswordEncoder().encode(adminPassword);
                User admin = new User(
                        "admin",
                        "rafael.teixeiraserafim@gmail.com",
                        encryptedAdminPassword,
                        UserRole.ADMIN,
                        true
                );

                String password = "123";
                String encryptedPassword = new BCryptPasswordEncoder().encode(password);
                User user = new User(
                        "rafaelT",
                        "rafael@gmail.com",
                        encryptedPassword,
                        UserRole.CLIENT,
                        true
                );

                userRepository.save(admin);
                userRepository.save(user);

                Order order = new Order(user, OrderStatus.IN_PROGRESS);

                orderRepository.save(order);

                OrderItem orderItem = new OrderItem(order, product, 2, ProductUtils.getActivePrice(product).multiply(BigDecimal.valueOf(2)));
                orderItemRepository.save(orderItem);


                Order order2 = orderService.checkoutOrder(user.getId(), 1L, BigDecimal.valueOf(13.68), 4, 5);

                OrderItem orderItem2 = new OrderItem(order2, product, 1,ProductUtils.getActivePrice(product).multiply(BigDecimal.valueOf(1)));
                orderItemRepository.save(orderItem2);

                Calendar calendar = Calendar.getInstance();
                calendar.set(2024, Calendar.OCTOBER, 7, 18, 49, 23);
                orderService.checkoutOrder(user.getId(), 1L, BigDecimal.valueOf(13.68), 5, 7, calendar.getTime());
            }
        };
    }
}
