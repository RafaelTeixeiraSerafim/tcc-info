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
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "notification_object_id")
    private NotificationObject notificationObject;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "notified_id")
    private User notified;

    @NonNull
    @Column(nullable = false)
    private Boolean read;

    @CreatedDate
    @Column(nullable = false)
    private Date createdAt;
}
