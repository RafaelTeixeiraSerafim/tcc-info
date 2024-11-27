package com.rafaelteixeiraserafim.tcc.repository;

import com.rafaelteixeiraserafim.tcc.model.Notification;
import com.rafaelteixeiraserafim.tcc.model.NotificationObject;
import com.rafaelteixeiraserafim.tcc.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByNotified(User notified);
    List<Notification> findByNotifiedAndRead(User notified, boolean read);
    Optional<Notification> findByNotifiedAndNotificationObject(User notified, NotificationObject notificationObject);
}
