package com.rafaelteixeiraserafim.tcc.controller;

import com.mercadopago.resources.payment.Payment;
import com.rafaelteixeiraserafim.tcc.dto.AddressDto;
import com.rafaelteixeiraserafim.tcc.dto.PreferenceDto;
import com.rafaelteixeiraserafim.tcc.model.User;
import com.rafaelteixeiraserafim.tcc.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {
    private final PaymentService paymentService;
    private final UserService userService;
    private final AddressService addressService;
    private final OrderService orderService;
    private final BoughtProductService boughtProductService;

    @Autowired
    public PaymentController(PaymentService paymentService, UserService userService, AddressService addressService, OrderService orderService, BoughtProductService boughtProductService) {
        this.paymentService = paymentService;
        this.userService = userService;
        this.addressService = addressService;
        this.orderService = orderService;
        this.boughtProductService = boughtProductService;
    }

    @PostMapping("/preferences")
    public ResponseEntity<String> createPreference(@RequestBody PreferenceDto preferenceDto) {
        User user = userService.getUserById(preferenceDto.userId());
        AddressDto address = addressService.getAddress(preferenceDto.addressId());
        String preferenceId = paymentService.createPreference(user, address, preferenceDto.shippingFee());
        return ResponseEntity.ok(preferenceId);
    }

    @PostMapping("/notifications")
    public ResponseEntity<?> getPaymentNotifications(@RequestBody Map<String, Object> data) {
        printMap(data, 0);

        Object action = data.get("action");
        if (action instanceof String && action.equals("payment.created")) {
            Map<String, Object> innerData = (Map<String, Object>) data.get("data");
            printMap(innerData, 0);
            Payment payment = paymentService.getPayment(Long.parseLong((String) innerData.get("id")));

            if (payment != null && payment.getStatus().equals("approved")) {
                printMap(payment.getMetadata(), 0);
                double temp = Double.parseDouble(payment.getMetadata().get("user_id").toString());
                Long userId = (long) temp;
                boughtProductService.createBoughtProducts(userId);
                orderService.checkoutOrder(userId);
            }
        }
        return ResponseEntity.ok(data);
    }

    // Helper method to print each key-value pair, handling nested maps
    private void printMap(Map<String, Object> map, int indent) {
        String indentSpace = " ".repeat(indent * 2); // Indentation for readability
        map.forEach((key, value) -> {
            if (value instanceof Map) {
                System.out.println(indentSpace + key + ":");
                printMap((Map<String, Object>) value, indent + 1); // Recurse for nested map
            } else {
                System.out.println(indentSpace + key + ": " + value);
            }
        });
    }
}
