package com.rafaelteixeiraserafim.tcc.repository;

import com.rafaelteixeiraserafim.tcc.enums.NotificationEntity;
import com.rafaelteixeiraserafim.tcc.model.NotificationObject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NotificationObjectRepository extends JpaRepository<NotificationObject, Long> {
    Optional<NotificationObject> findByEntityIdAndEntityAndEntityType(Long entityId, NotificationEntity entity, String entityType);
}
