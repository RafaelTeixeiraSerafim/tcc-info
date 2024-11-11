package com.rafaelteixeiraserafim.tcc.service;

import com.mercadopago.client.common.AddressRequest;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.client.preference.*;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.payment.Payment;
import com.mercadopago.resources.preference.Preference;
import com.rafaelteixeiraserafim.tcc.dto.AddressDto;
import com.rafaelteixeiraserafim.tcc.model.OrderItem;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class PaymentService {
    private final OrderItemService orderItemService;
    @Value("${main-service.base-url}")
    private String mainServiceBaseUrl;
    @Value("${frontend.base-url}")
    private String frontendBaseUrl;


    public PaymentService(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

    public Payment getPayment(Long paymentId) {
        try {
            PaymentClient client = new PaymentClient();

            return client.get(paymentId);
        } catch (MPApiException ex) {
            System.out.printf(
                    "MercadoPago Error. Status: %s, Content: %s%n",
                    ex.getApiResponse().getStatusCode(), ex.getApiResponse().getContent());
        } catch (MPException ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public String createPreference(User user, AddressDto address, BigDecimal shippingFee, int deliveryMinDays, int deliveryMaxDays) {
        List<OrderItem> orderItems = orderItemService.getOrderItems(user.getId());

        PreferenceClient client = new PreferenceClient();

        List<PreferenceItemRequest> items = new ArrayList<>();

        for (OrderItem orderItem : orderItems) {
            System.out.println(orderItem);
            Product product = orderItem.getProduct();

            BigDecimal price = product.getSalePrice();
            if (price == null) price = product.getOrigPrice();

            PreferenceItemRequest item = PreferenceItemRequest.builder()
                    .id(orderItem.getId().toString())
                    .title(product.getName())
                    .pictureUrl(product.getImages().get(0).getUrl())
                    .categoryId(product.getCategory().getId().toString())
                    .quantity(orderItem.getQty())
                    .currencyId("BRL")
                    .unitPrice(price)
                    .build();

            System.out.println(item);
            items.add(item);
        }

        System.out.println(items);

        PreferencePayerRequest payer = PreferencePayerRequest.builder()
                .name(address.fullName())
                .email(user.getEmail())
                .address(
                        AddressRequest.builder()
                                .zipCode(address.postalCode())
                                .streetName(address.street())
                                .streetNumber(address.houseNumber())
                                .build()
                ).build();

        PreferenceRequest request =
                PreferenceRequest.builder()
                        .items(items)
                        .payer(payer)
                        .notificationUrl(mainServiceBaseUrl + "/api/v1/payments/notifications")
                        .backUrls(
                                PreferenceBackUrlsRequest.builder()
                                        .success(frontendBaseUrl + "/tcc-info/checkout/success")
                                        .build()
                        )
                        .paymentMethods(
                                PreferencePaymentMethodsRequest.builder()
                                        .defaultPaymentMethodId("master")
                                        .installments(6)
                                        .defaultInstallments(1)
                                        .build()
                        )
                        .shipments(
                                PreferenceShipmentsRequest.builder()
                                        .cost(shippingFee)
                                        .build()
                        )
                        .metadata(
                                Map.of("user_id", user.getId(),
                                        "address_id", address.id(),
                                        "shipping_fee", shippingFee,
                                        "delivery_min_days", deliveryMinDays,
                                        "delivery_max_days", deliveryMaxDays)
                        )
                        .build();

        try {
            Preference preference = client.create(request);
            System.out.println(preference);
            return preference.getId();
        } catch (MPApiException ex) {
            System.out.printf(
                    "MercadoPago Error. Status: %s, Content: %s%n",
                    ex.getApiResponse().getStatusCode(), ex.getApiResponse().getContent());
        } catch (MPException ex) {
            ex.printStackTrace();
        }
        return null;
    }
}
