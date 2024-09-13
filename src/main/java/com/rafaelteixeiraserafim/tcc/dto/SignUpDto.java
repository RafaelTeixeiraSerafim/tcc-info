package com.rafaelteixeiraserafim.tcc.dto;

import com.rafaelteixeiraserafim.tcc.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDto {
    private String username;
    private String email;
    private String password;
    private UserRole role;
}
