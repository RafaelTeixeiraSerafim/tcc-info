package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.dto.NotificationResponse;
import com.rafaelteixeiraserafim.tcc.dto.NotificationUpdateRequest;
import com.rafaelteixeiraserafim.tcc.dto.ProductResponse;
import com.rafaelteixeiraserafim.tcc.model.Notification;
import com.rafaelteixeiraserafim.tcc.model.Product;
import com.rafaelteixeiraserafim.tcc.model.User;
import com.rafaelteixeiraserafim.tcc.service.NotificationService;
import com.rafaelteixeiraserafim.tcc.service.ProductService;
import com.rafaelteixeiraserafim.tcc.service.UserService;
import com.rafaelteixeiraserafim.tcc.utils.ModelDtoConversion;
import jakarta.validation.constraints.Min;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("api/v1")
@Validated
public class NotificationController {
    private final NotificationService notificationService;
    private final UserService userService;
    private final ProductService productService;

    public NotificationController(NotificationService notificationService, UserService userService, ProductService productService) {
        this.notificationService = notificationService;
        this.userService = userService;
        this.productService = productService;
    }

    @GetMapping("/users/{userId}/notifications/read")
    public ResponseEntity<Map<String, Object>> getReadNotifications(@PathVariable Long userId) {
        User user = userService.getUser(userId);
        List<Notification> notifications = notificationService.getUserNotifications(user, true);
        List<NotificationResponse> notificationResponses = notificationService.createNotificationResponses(notifications);
        return ResponseEntity.ok().body(Map.of("notifications", notificationResponses, "user", user));
    }

    @GetMapping("/users/{userId}/notifications/unread")
    public ResponseEntity<Map<String, Object>> getUnreadNotifications(@PathVariable Long userId) {
        User user = userService.getUser(userId);
        List<Notification> notifications = notificationService.getUserNotifications(user, false);
        List<NotificationResponse> notificationResponses = notificationService.createNotificationResponses(notifications);
        return ResponseEntity.ok().body(Map.of("notifications", notificationResponses, "user", user));
    }

    @PostMapping("/users/notifications") // TODO: delete this
    public ResponseEntity<?> createNotification() {
        notificationService.createNotificationsIfStockLessThan5(productService.getProducts());

        return ResponseEntity.ok().build();
    }

    @PatchMapping("/users/notifications")
    public ResponseEntity<?> updateNotification(@RequestBody NotificationUpdateRequest notificationUpdateRequest) {
        notificationService.updateNotifications(notificationUpdateRequest.ids(), notificationUpdateRequest.read());

        return ResponseEntity.ok().build();
    }
}
