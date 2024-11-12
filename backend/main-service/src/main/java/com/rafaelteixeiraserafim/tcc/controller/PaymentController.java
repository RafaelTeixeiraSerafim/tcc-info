package com.rafaelteixeiraserafim.tcc.controller;

import com.mercadopago.resources.payment.Payment;
import com.rafaelteixeiraserafim.tcc.dto.AddressDto;
import com.rafaelteixeiraserafim.tcc.dto.PreferenceDto;
import com.rafaelteixeiraserafim.tcc.model.User;
import com.rafaelteixeiraserafim.tcc.service.*;
import com.rafaelteixeiraserafim.tcc.utils.MapUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {
    private final PaymentService paymentService;
    private final UserService userService;
    private final AddressService addressService;
    private final OrderService orderService;
    private final OrderItemService orderItemService;

    @Autowired
    public PaymentController(PaymentService paymentService, UserService userService, AddressService addressService, OrderService orderService, OrderItemService orderItemService) {
        this.paymentService = paymentService;
        this.userService = userService;
        this.addressService = addressService;
        this.orderService = orderService;
        this.orderItemService = orderItemService;
    }

    @PostMapping("/preferences")
    public ResponseEntity<String> createPreference(@RequestBody PreferenceDto preferenceDto) {
        User user = userService.getUser(preferenceDto.userId());
        AddressDto address = addressService.getAddress(preferenceDto.addressId());
        String preferenceId = paymentService.createPreference(user, address, preferenceDto.shippingFee(), preferenceDto.deliveryMinDays(), preferenceDto.deliveryMaxDays());
        return ResponseEntity.ok(preferenceId);
    }

    @PostMapping("/notifications")
    public ResponseEntity<?> getPaymentNotifications(@RequestBody Map<String, Object> data) {
        MapUtils.printMap(data);

        Object action = data.get("action");
        if (action instanceof String && action.equals("payment.created")) {
            Map<String, Object> innerData = (Map<String, Object>) data.get("data");
            MapUtils.printMap(innerData);
            Payment payment = paymentService.getPayment(Long.parseLong((String) innerData.get("id")));

            if (payment != null && payment.getStatus().equals("approved")) {
                Map<String, Object> metadata = payment.getMetadata();
                MapUtils.printMap(metadata);

                Long userId = (long) Double.parseDouble(metadata.get("user_id").toString());
                System.out.println("UserId: " + userId);
                Long addressId = (long) Double.parseDouble(metadata.get("address_id").toString());
                System.out.println("AddressId: " + addressId);
                BigDecimal shippingFee = BigDecimal.valueOf(Double.parseDouble(metadata.get("shipping_fee").toString()));
                System.out.println("ShippingFee: " + shippingFee);
                int deliveryMinDays = Integer.parseInt(metadata.get("delivery_min_days").toString());
                System.out.println("DeliveryMinDays: " + deliveryMinDays);
                int deliveryMaxDays = Integer.parseInt(metadata.get("delivery_max_days").toString());
                System.out.println("DeliveryMaxDays: " + deliveryMaxDays);

                orderItemService.createPrices(orderItemService.getOrderItems(userId));
                System.out.println("After createPrices");
                orderService.checkoutOrder(userId, addressId, shippingFee, deliveryMinDays, deliveryMaxDays);
                System.out.println("After checkoutOrder");
            }
        }
        return ResponseEntity.ok(data);
    }
}
