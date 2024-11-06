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
        String preferenceId = paymentService.createPreference(user, address, preferenceDto.shippingFee());
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
                MapUtils.printMap(payment.getMetadata());
                Long userId = (long) Double.parseDouble(payment.getMetadata().get("user_id").toString());
                Long addressId = (long) Double.parseDouble(payment.getMetadata().get("address_id").toString());
                BigDecimal shippingFee = BigDecimal.valueOf(Double.parseDouble(payment.getMetadata().get("user_id").toString()));

                orderItemService.createPrices(orderItemService.getOrderItems(userId));
                orderService.checkoutOrder(userId, addressId, shippingFee);
            }
        }
        return ResponseEntity.ok(data);
    }
}
