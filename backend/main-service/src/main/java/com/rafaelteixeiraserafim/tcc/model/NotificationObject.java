package com.rafaelteixeiraserafim.tcc.model;

import com.rafaelteixeiraserafim.tcc.enums.NotificationEntity;
import com.rafaelteixeiraserafim.tcc.enums.NotificationSeverity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class NotificationObject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(nullable = false)
    private Long entityId;

    @NonNull
    @Column(nullable = false)
    @Enumerated(EnumType.STRING) // Adicionar lido, notificação sem estoque, checagem antes de criar
    private NotificationEntity entity;

    @NonNull
    @Column(nullable = false)
    private String entityType;

    @NonNull
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private NotificationSeverity severity;

    @NonNull
    private String description;

    @CreatedDate
    @Column(nullable = false)
    private Date createdAt;
}
