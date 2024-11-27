package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.dto.NotificationResponse;
import com.rafaelteixeiraserafim.tcc.dto.ProductResponse;
import com.rafaelteixeiraserafim.tcc.enums.NotificationEntity;
import com.rafaelteixeiraserafim.tcc.enums.NotificationSeverity;
import com.rafaelteixeiraserafim.tcc.enums.ProductNotificationType;
import com.rafaelteixeiraserafim.tcc.enums.UserRole;
import com.rafaelteixeiraserafim.tcc.model.*;
import com.rafaelteixeiraserafim.tcc.repository.NotificationObjectRepository;
import com.rafaelteixeiraserafim.tcc.repository.NotificationRepository;
import com.rafaelteixeiraserafim.tcc.utils.ModelDtoConversion;
import jakarta.validation.constraints.Min;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {
    private final NotificationObjectRepository notificationObjectRepository;
    private final UserService userService;
    private final NotificationRepository notificationRepository;
    private final ProductService productService;

    public NotificationService(NotificationObjectRepository notificationObjectRepository, UserService userService, NotificationRepository notificationRepository, ProductService productService) {
        this.notificationObjectRepository = notificationObjectRepository;
        this.userService = userService;
        this.notificationRepository = notificationRepository;
        this.productService = productService;
    }

    public void createNotificationIfStockLessThan5(Product product) {
        if (product.getStockQty() < 5) {
            NotificationObject notificationObject = notificationObjectRepository.findByEntityIdAndEntityAndEntityType(product.getId(), NotificationEntity.PRODUCT, ProductNotificationType.STOCK_LESS_THAN_5.name()).orElse(null);
            if (notificationObject != null) {
                Notification notification = notificationRepository.findByNotifiedAndNotificationObject(userService.getAdmins().get(0), notificationObject).orElse(null);

                if (notification != null && !notification.getRead()) {
                    return;
                }
            }

            NotificationObject newNotificationObject = new NotificationObject(product.getId(), NotificationEntity.PRODUCT, ProductNotificationType.STOCK_LESS_THAN_5.name(), NotificationSeverity.MEDIUM, "Produto possui menos de 5 unidades no estoque");
            notificationObjectRepository.save(newNotificationObject);

            for (User admin : userService.getAdmins()) {
                notificationRepository.save(new Notification(newNotificationObject, admin, false));
            }
        }
    }

    public void createNotificationsIfStockLessThan5(List<Product> products) {
        for (Product product : products) {
            createNotificationIfStockLessThan5(product);
        }
    }

    public Optional<Notification> createNotificationIfEmptyStock(Product product) {
        if (product.getStockQty() == 0) {
            NotificationObject notificationObject = notificationObjectRepository.findByEntityIdAndEntityAndEntityType(product.getId(), NotificationEntity.PRODUCT, ProductNotificationType.EMPTY_STOCK.name()).orElse(null);
            if (notificationObject != null) {
                Notification notification = notificationRepository.findByNotifiedAndNotificationObject(userService.getAdmins().get(0), notificationObject).orElse(null);

                if (notification != null && !notification.getRead()) {
                    return Optional.empty();
                }
            }

            NotificationObject newNotificationObject = new NotificationObject(product.getId(), NotificationEntity.PRODUCT, ProductNotificationType.EMPTY_STOCK.name(), NotificationSeverity.HIGH, "O estoque deste produto está vazio");
            notificationObjectRepository.save(newNotificationObject);

            for (User admin : userService.getAdmins()) {
                return Optional.of(notificationRepository.save(new Notification(newNotificationObject, admin, false)));
            }
        }

        return Optional.empty();
    }

    public List<Optional<Notification>> createNotificationsIfEmptyStock(List<Product> products) {
        List<Optional<Notification>> notifications = new ArrayList<>();
        for (Product product : products) {
            notifications.add(createNotificationIfEmptyStock(product));
        }

        return notifications;
    }

    public List<Notification> getUserNotifications(User user) {
        return notificationRepository.findByNotified(user);
    }

    public List<Notification> getUserNotifications(User user, boolean read) {
        return notificationRepository.findByNotifiedAndRead(user, read);
    }

    public List<NotificationResponse> createNotificationResponses(List<Notification> notifications) {
        List<NotificationResponse> notificationResponses = new ArrayList<>();
        for (Notification notification : notifications) {
            Product product = productService.getProduct(notification.getNotificationObject().getEntityId());
            ProductResponse productResponse = ModelDtoConversion.createProductResponse(product);
            notificationResponses.add(ModelDtoConversion.createNotificationResponse(notification, productResponse));
        }

        return notificationResponses;
    }

    public Notification getNotification(Long notificationId) {
        Optional<Notification> optionalNotification = notificationRepository.findById(notificationId);

        if (optionalNotification.isEmpty()) {
            throw new IllegalArgumentException("Notification not found");
        }

        return optionalNotification.get();
    }

    public void updateNotification(@Min(1) Long notificationId, boolean read) {
        Notification notification = this.getNotification(notificationId);
        if (notification.getNotified().getRole().equals(UserRole.ADMIN)) {
            for (User admin : userService.getAdmins()) {
                Notification adminNotification = notificationRepository.findByNotifiedAndNotificationObject(admin, notification.getNotificationObject()).orElse(null);
                if (adminNotification != null) {
                    adminNotification.setRead(read);
                    notificationRepository.save(adminNotification);
                }
            }
        }

        notification.setRead(read);
        notificationRepository.save(notification);
    }

    public void updateNotifications(List<Long> ids, boolean read) {
        for (Long id : ids) {
            updateNotification(id, read);
        }
    }
}
