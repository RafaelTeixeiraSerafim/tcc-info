package com.rafaelteixeiraserafim.tcc.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserDto {
    @NotNull
    private String username;
    @NotNull
    private String email;
    private ImageDto profilePic;
}
