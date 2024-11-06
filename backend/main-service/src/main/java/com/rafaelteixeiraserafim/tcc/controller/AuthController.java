package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.config.auth.SecurityFilter;
import com.rafaelteixeiraserafim.tcc.config.auth.TokenProvider;
import com.rafaelteixeiraserafim.tcc.dto.LoginDto;
import com.rafaelteixeiraserafim.tcc.dto.SignUpDto;
import com.rafaelteixeiraserafim.tcc.dto.UpdateUserDto;
import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;
import com.rafaelteixeiraserafim.tcc.enums.UserRole;
import com.rafaelteixeiraserafim.tcc.model.Order;
import com.rafaelteixeiraserafim.tcc.model.User;
import com.rafaelteixeiraserafim.tcc.service.AuthService;
import com.rafaelteixeiraserafim.tcc.service.OrderService;
import com.rafaelteixeiraserafim.tcc.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/api/v1/auth")
@Validated
public class AuthController {
    private final AuthService authService;
    private final UserService userService;
    private final SecurityFilter securityFilter;
    private final TokenProvider tokenProvider;
    private final OrderService orderService;

    @Autowired
    public AuthController(AuthService authService, UserService userService, SecurityFilter securityFilter, TokenProvider tokenProvider, OrderService orderService) {
        this.authService = authService;
        this.userService = userService;
        this.securityFilter = securityFilter;
        this.tokenProvider = tokenProvider;
        this.orderService = orderService;
    }

    @PostMapping("/signup/{role}")
    public ResponseEntity<User> signUpUser(@RequestBody @Valid SignUpDto data, @PathVariable("role") String role) {
        for (UserRole userRole : UserRole.values()) {
            if (Objects.equals(userRole.getRole(), role)) {
                User user = authService.signUpByRole(data, userRole);
                ResponseCookie jwtCookie = this.generateJwtCookie(data.email(), data.password());

                if (Objects.equals(role, UserRole.CLIENT.getRole())) {
                    orderService.createOrder(new Order(user, OrderStatus.IN_PROGRESS));
                }

                return ResponseEntity.status(HttpStatus.CREATED)
                        .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                        .body(user);
            }
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @PostMapping("/login/{role}")
    public ResponseEntity<User> loginUser(@RequestBody @Valid LoginDto data, @PathVariable("role") String role) {
        for (UserRole userRole : UserRole.values()) {
            if (Objects.equals(userRole.getRole(), role)) {
                ResponseCookie jwtCookie = this.generateJwtCookie(data.email(), data.password());
                User user = userService.getUserByEmailAndRole(data.email(), userRole);

                if (authService.isValidPassword(user.getPassword(), data.password())) {
                    return ResponseEntity.ok()
                            .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                            .body(user);
                }
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .build();
            }
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@ModelAttribute @Valid UpdateUserDto updateUserDto) {
        User user = authService.updateUser(updateUserDto);

        ResponseCookie jwtCookie = this.generateJwtCookie(user.getEmail(), null);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(user);
    }

    @PostMapping("/check-token")
    public ResponseEntity<?> checkToken(HttpServletRequest request) {
        String token = securityFilter.recoverToken(request);
        if (token != null) {
            String email = tokenProvider.validateToken(token);
            User user = userService.getUserByEmail(email);
            if (user != null) {
                return ResponseEntity.ok(user);
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("User not found");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        // Create an empty cookie with the same name and set maxAge to 0 to delete it
        ResponseCookie deleteCookie = authService.deleteCookie();

        // Respond with the Set-Cookie header to delete the token
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, deleteCookie.toString())
                .body("Logged out successfully");
    }

    public ResponseCookie generateJwtCookie(String email, String password) {
        try {
            System.out.println("Email: " + email);
            var emailPassword = new UsernamePasswordAuthenticationToken(email, password);
//            authenticationManager.authenticate(emailPassword);
            SecurityContextHolder.getContext().setAuthentication(emailPassword);
            String accessToken = tokenProvider.generateAccessToken(email);
            return authService.createCookie(accessToken);
        } catch (Exception e) {
            System.out.println("Exception: " + e);
            throw new RuntimeException("Authentication failed", e);
        }
    }
}
