package com.rafaelteixeiraserafim.tcc.utils;

import com.rafaelteixeiraserafim.tcc.model.Order;
import com.rafaelteixeiraserafim.tcc.model.OrderItem;

import java.math.BigDecimal;

public final class OrderUtils {
    public static BigDecimal getOrderTotal(Order order) {
        BigDecimal total = order.getShippingFee();
        for (OrderItem orderItem : order.getOrderItems()) {
            total = total.add(
                    orderItem.getPrice()
            );
        }
        return total;
    }
}
