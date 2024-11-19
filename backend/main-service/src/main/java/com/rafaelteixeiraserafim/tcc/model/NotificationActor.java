package com.rafaelteixeiraserafim.tcc.model;

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
public class NotificationActor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "notification_object_id")
    private NotificationObject notificationObject;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "actor_id")
    private User actor;

    @CreatedDate
    @Column(nullable = false)
    private Date createdAt;
}
