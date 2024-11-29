package com.rafaelteixeiraserafim.tcc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rafaelteixeiraserafim.tcc.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity(name = "\"user\"")
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(of = "id")
@ToString
@EntityListeners(AuditingEntityListener.class)
public class User implements UserDetails {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @NonNull
    private String username;

    @NonNull
    private String email;

    @NonNull
    private String password;

    private String profilePic;

    @NonNull
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @NonNull
    private Boolean enabled;

    @CreatedDate
//    @Column(updatable = false)
    private Date createdAt;

    @LastModifiedDate
    private Date updatedAt;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public boolean isEnabled() {
        System.out.println("Is enabled: " + this.enabled);
        return this.enabled;
    }

    @JsonIgnore
    @OneToMany(mappedBy = "notified", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Notification> notifications;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<WishlistItem> wishlistItems;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews;

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Order> orders;

    @PreRemove
    private void preRemove() {
        for (Order order : orders) {
            order.setUser(null);
        }
    }
}
