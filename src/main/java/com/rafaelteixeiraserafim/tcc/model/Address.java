package com.rafaelteixeiraserafim.tcc.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Address {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private String fullName;
    private String postalCode;
    private String state;
    private String city;
    private String neighbourhood;
    private String street;
    private String houseNumber;
    private String apartmentNumber; // Complemento

}
