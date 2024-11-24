package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.dto.ShippingFromToDto;
import com.rafaelteixeiraserafim.tcc.dto.ShippingOptionRequestProduct;
import com.rafaelteixeiraserafim.tcc.dto.ShippingOptionsRequest;
import com.rafaelteixeiraserafim.tcc.dto.ShippingOptionsResponseDto;
import com.rafaelteixeiraserafim.tcc.model.OrderItem;
import com.rafaelteixeiraserafim.tcc.model.Product;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class ShippingService {
    private final ProductService productService;
    @Value("${owner.postal-code}")
    private String ownerPostalCode;
    @Value("${postal-service.base-uri}")
    private String postalBaseUri;

    private final OrderItemService orderItemService;
    private final RestTemplate restTemplate;

    public ShippingService(OrderItemService orderItemService, RestTemplate restTemplate, ProductService productService) {
        this.orderItemService = orderItemService;
        this.restTemplate = restTemplate;
        this.productService = productService;
    }

    public ShippingOptionsResponseDto calculateShipping(Long userId, String userPostalCode) {
        List<OrderItem> orderItems = orderItemService.getOrderItems(userId);

        List<ShippingOptionRequestProduct> shippingOptionRequestProducts = new ArrayList<>();
        for (OrderItem orderItem : orderItems) {
            Product product = orderItem.getProduct();

            shippingOptionRequestProducts.add(new ShippingOptionRequestProduct(
                    product.getId(),
                    product.getWidth(),
                    product.getHeight(),
                    product.getLength(),
                    product.getWeight(),
                    product.getOrigPrice(),
                    orderItem.getQty()
            ));
        }

        return restTemplate.postForObject(postalBaseUri + "/api/v1/shipping/calculate", new ShippingOptionsRequest(new ShippingFromToDto(ownerPostalCode), new ShippingFromToDto(userPostalCode), shippingOptionRequestProducts), ShippingOptionsResponseDto.class);
    }

    public ShippingOptionsResponseDto calculateShipping(Long productId, String userPostalCode, int qty) {
        Product product = productService.getProduct(productId);

        List<ShippingOptionRequestProduct> shippingOptionRequestProducts = List.of(new ShippingOptionRequestProduct(
            product.getId(),
            product.getWidth(),
            product.getHeight(),
            product.getLength(),
            product.getWeight(),
            product.getOrigPrice(),
            qty
        ));

        return restTemplate.postForObject(postalBaseUri + "/api/v1/shipping/calculate", new ShippingOptionsRequest(new ShippingFromToDto(ownerPostalCode), new ShippingFromToDto(userPostalCode), shippingOptionRequestProducts), ShippingOptionsResponseDto.class);
    }
}
