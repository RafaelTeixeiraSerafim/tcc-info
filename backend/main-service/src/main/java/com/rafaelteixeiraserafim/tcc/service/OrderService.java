package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;
import com.rafaelteixeiraserafim.tcc.model.Order;
import com.rafaelteixeiraserafim.tcc.model.OrderItem;
import com.rafaelteixeiraserafim.tcc.model.User;
import com.rafaelteixeiraserafim.tcc.repository.OrderRepository;
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

    @Autowired
    public OrderService(OrderRepository orderRepository, UserService userService, ProductService productService) {
        this.orderRepository = orderRepository;
        this.userService = userService;
        this.productService = productService;
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
        return orderRepository.save(order);
    }

    public void updateOrder(Order order, OrderStatus status, Date datePlaced, Long addressId, BigDecimal shippingFee) {
        order.setStatus(status);
        order.setDatePlaced(datePlaced);
        order.setAddressId(addressId);
        order.setShippingFee(shippingFee);
    }

    public Order getOrderByUserIdAndStatus(Long userId, OrderStatus orderStatus) throws IllegalArgumentException {
        Optional<Order> optionalOrder = orderRepository.findOrderByUserIdAndStatus(userId, orderStatus);

        if (optionalOrder.isEmpty()) {
            throw new IllegalArgumentException("Order with userId " + userId + " orderStatus " + orderStatus.getStatus() + " not found");
        }

        return optionalOrder.get();
    }

    public List<Order> getOrders() {
        List<Order> orders = orderRepository.findAll();

        List<Order> filteredOrders = new ArrayList<>();

        for (Order order : orders) {
            if (order.getStatus() != OrderStatus.IN_PROGRESS) {
                filteredOrders.add(order);
            }
        }

        return filteredOrders;
    }

    public OrderStatus[] getOrderStatus() {
        return OrderStatus.values();
    }

    @Transactional
    public Order checkoutOrder(Long userId, Long addressId, BigDecimal shippingFee) {
        User user = userService.getUser(userId);
        Order order = getActiveOrder(userId);
        productService.updateStockQtys(order.getOrderItems());
        updateOrder(order, OrderStatus.PENDING, Date.from(Instant.now()), addressId, shippingFee);
        return createOrder(new Order(user, OrderStatus.IN_PROGRESS));
    }

    @Transactional
    public Order checkoutOrder(Long userId, Long addressId, BigDecimal shippingFee, Date datePlaced) {
        User user = userService.getUser(userId);
        Order order = getActiveOrder(userId);
        productService.updateStockQtys(order.getOrderItems());
        updateOrder(order, OrderStatus.PENDING, datePlaced, addressId, shippingFee);
        return createOrder(new Order(user, OrderStatus.IN_PROGRESS));
    }

    public List<BigDecimal> getMonthlySales() {
        List<Order> orders = this.getNonInProgressOrders();

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
                    total = total.add(getOrderTotal(order));
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

    private BigDecimal getOrderTotal(Order order) {
        BigDecimal total = order.getShippingFee();
        for (OrderItem orderItem : order.getOrderItems()) {
            total = total.add(
                    orderItem.getPrice()
            );
        }
        return total;
    }

    public List<Order> getNonInProgressOrders() {
        return orderRepository.findByStatusIsNot(OrderStatus.IN_PROGRESS);
    }

    public List<Order> getNonInProgressOrders(Long userId) {
        return orderRepository.findByStatusIsNotAndUserId(OrderStatus.IN_PROGRESS, userId);
    }
}
