package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.dto.AddressDto;
import com.rafaelteixeiraserafim.tcc.dto.OrderItemResponse;
import com.rafaelteixeiraserafim.tcc.dto.OrderResponse;
import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;
import com.rafaelteixeiraserafim.tcc.model.Order;
import com.rafaelteixeiraserafim.tcc.model.User;
import com.rafaelteixeiraserafim.tcc.repository.OrderRepository;
import com.rafaelteixeiraserafim.tcc.utils.ModelDtoConversion;
import com.rafaelteixeiraserafim.tcc.utils.OrderUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.Month;
import java.time.ZoneId;
import java.util.*;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserService userService;
    private final ProductService productService;
    private final AddressService addressService;

    @Autowired
    public OrderService(OrderRepository orderRepository, UserService userService, ProductService productService, AddressService addressService) {
        this.orderRepository = orderRepository;
        this.userService = userService;
        this.productService = productService;
        this.addressService = addressService;
    }

    public Order createOrder(Order order) {
        orderRepository.save(order);
        return order;
    }

    public Order getOrderById(Long orderId) throws IllegalArgumentException {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);

        if (optionalOrder.isEmpty()) {
            throw new IllegalArgumentException("Order with id " + orderId + " not found");
        }

        return optionalOrder.get();
    }

    public Order getActiveOrder(Long userId) throws IllegalArgumentException {
        Optional<Order> optionalOrder = orderRepository.findOrderByUserIdAndStatus(userId, OrderStatus.IN_PROGRESS);

        if (optionalOrder.isEmpty()) {
            throw new IllegalArgumentException("Order with userId " + userId + " not found");
        }

        return optionalOrder.get();
    }

    @Transactional
    public Order updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = this.getOrderById(orderId);

        order.setStatus(status);
        if (status == OrderStatus.DELIVERED) {
            order.setDateDelivered(Date.from(Instant.now()));
        }
        return orderRepository.save(order);
    }

    @Transactional
    public void updateOrder(Order order, OrderStatus status, Date datePlaced, Long addressId, BigDecimal shippingFee, int deliveryMinDays, int deliveryMaxDays) {
        order.setStatus(status);
        order.setDatePlaced(datePlaced);
        order.setAddressId(addressId);
        order.setShippingFee(shippingFee);
        order.setDeliveryMinDays(deliveryMinDays);
        order.setDeliveryMaxDays(deliveryMaxDays);

        orderRepository.save(order);
    }

    public OrderStatus[] getOrderStatus() {
        return OrderStatus.values();
    }

    @Transactional
    public Order checkoutOrder(Long userId, Long addressId, BigDecimal shippingFee, int deliveryMinDays, int deliveryMaxDays) {
        User user = userService.getUser(userId);
        Order order = getActiveOrder(userId);
        productService.updateStockQtys(order.getOrderItems());
        updateOrder(order, OrderStatus.PENDING, Date.from(Instant.now()), addressId, shippingFee, deliveryMinDays, deliveryMaxDays);
        return createOrder(new Order(user, OrderStatus.IN_PROGRESS));
    }

    @Transactional
    public Order checkoutOrder(Long userId, Long addressId, BigDecimal shippingFee, int deliveryMinDays, int deliveryMaxDays, Date datePlaced) {
        User user = userService.getUser(userId);
        Order order = getActiveOrder(userId);
        productService.updateStockQtys(order.getOrderItems());
        updateOrder(order, OrderStatus.PENDING, datePlaced, addressId, shippingFee, deliveryMinDays, deliveryMaxDays);
        return createOrder(new Order(user, OrderStatus.IN_PROGRESS));
    }

    public List<BigDecimal> getMonthlySales() {
        List<Order> orders = this.getPlacedOrders();

        System.out.println(orders);
        orders.sort(Comparator.comparing(Order::getDatePlaced));
        System.out.println(orders);

        List<BigDecimal> sales = new ArrayList<>();

        Month[] months = Month.values();
        Month curMonth = Instant.now().atZone(ZoneId.systemDefault()).toLocalDate().getMonth();
        int nextMonth = Arrays.asList(months).indexOf(curMonth) + 1;

        BigDecimal total = BigDecimal.ZERO;
        int monthIdx = 0;
        int orderIdx = 0;
        while (monthIdx < months.length) {
            if (monthIdx == nextMonth) break;
            if (orderIdx < orders.size()) {
                Order order = orders.get(orderIdx);
                LocalDate localDate = order.getDatePlaced().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

                if (months[monthIdx] == localDate.getMonth()) {
                    total = total.add(OrderUtils.getOrderTotal(order));
                    orderIdx++;
                    continue;
                }
            }
            sales.add(total);
            total = BigDecimal.ZERO;
            monthIdx++;
        }

        return sales;
    }

    public List<Order> getPlacedOrders() {
        return orderRepository.findByStatusIsNot(OrderStatus.IN_PROGRESS);
    }

    public List<Order> getPlacedOrders(Long userId) {
        return orderRepository.findByStatusIsNotAndUserId(OrderStatus.IN_PROGRESS, userId);
    }

    public List<OrderResponse> createPlacedOrderResponses(List<Order> orders) {
        List<OrderResponse> orderResponses = new ArrayList<>();

        for (Order order : orders) {
            BigDecimal total = OrderUtils.getOrderTotal(order);
            AddressDto addressDto = addressService.getAddress(order.getAddressId());
            List<OrderItemResponse> orderItems = ModelDtoConversion.createOrderItemResponses(order.getOrderItems());
            orderResponses.add(new OrderResponse(order.getId(), order.getUser(), order.getDatePlaced(), order.getDateDelivered(), order.getStatus(), addressDto, order.getShippingFee(), order.getDeliveryMinDays(), order.getDeliveryMaxDays(), total, orderItems));
        }

        return orderResponses;
    }
}
