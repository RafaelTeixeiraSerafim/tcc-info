package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.config.auth.SecurityFilter;
import com.rafaelteixeiraserafim.tcc.config.auth.TokenProvider;
import com.rafaelteixeiraserafim.tcc.dto.LoginDto;
import com.rafaelteixeiraserafim.tcc.dto.SignUpDto;
import com.rafaelteixeiraserafim.tcc.enums.OrderStatus;
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
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    private UserService userService;
    @Autowired
    private SecurityFilter securityFilter;
    @Autowired
    private TokenProvider tokenProvider;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private OrderService orderService;


    @PostMapping("/signup")
    public ResponseEntity<User> signUp(@RequestBody @Valid SignUpDto data) {
        User user = authService.signUp(data);
        ResponseCookie jwtCookie = this.generateJwtCookie(data.getEmail(), data.getPassword());
        orderService.createOrder(new Order(user, OrderStatus.IN_PROGRESS));
        return ResponseEntity.status(HttpStatus.CREATED)
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(user);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody @Valid LoginDto data) {
        ResponseCookie jwtCookie = this.generateJwtCookie(data.getEmail(), data.getPassword());
        User user = userService.getUserByEmail(data.getEmail());
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
    public ResponseEntity<String> logout(HttpServletRequest request) {
        // Create an empty cookie with the same name and set maxAge to 0 to delete it
        ResponseCookie deleteCookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(true) // TODO - Set to true in prod
                .path("/")
                .maxAge(0)     // Immediately expires the cookie
                .sameSite("None")  // If using cross-origin requests
                .build();

        // Respond with the Set-Cookie header to delete the token
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, deleteCookie.toString())
                .body("Logged out successfully");
    }

    public ResponseCookie generateJwtCookie(String email, String password) {
        try {
            var emailPassword = new UsernamePasswordAuthenticationToken(email, password);
            var authUser = authenticationManager.authenticate(emailPassword);
            var accessToken = tokenProvider.generateAccessToken((User) authUser.getPrincipal());
            System.out.println(accessToken);
            return ResponseCookie.from("token", accessToken)
                    .httpOnly(true)
                    .secure(false) // Ensure it's sent over HTTPS
                    .path("/")
                    .maxAge(7 * 24 * 60 * 60) // 7 days
                    .sameSite("None") // CSRF protection
                    .build();
        } catch (Exception e) {
            System.out.println("Exception: " + e);
            throw new RuntimeException("Authentication failed", e);
        }
    }
}
