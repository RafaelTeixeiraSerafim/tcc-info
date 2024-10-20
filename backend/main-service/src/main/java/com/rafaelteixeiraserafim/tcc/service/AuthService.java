package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.dto.SignUpDto;
import com.rafaelteixeiraserafim.tcc.enums.UserRole;
import com.rafaelteixeiraserafim.tcc.model.User;
import com.rafaelteixeiraserafim.tcc.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService implements UserDetailsService {
    private final UserRepository userRepository;
    private final UserService userService;

    @Value("${is_https}")
    private boolean isHttps;

    @Autowired
    public AuthService(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) {
        return userService.getUserByEmail(email);
    }

    public User signUpByRole(SignUpDto data, UserRole userRole) throws ResponseStatusException {
        if (userRepository.findByEmail(data.email()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already in use");
        }
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.username(), data.email(), encryptedPassword, userRole);
        return userRepository.save(newUser);
    }

    public ResponseCookie deleteCookie() {
        return ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(isHttps) // TODO - Set to true in prod
                .path("/")
                .maxAge(0)     // Immediately expires the cookie
//                .sameSite("None")  // If using cross-origin requests
                .build();
    }

    public ResponseCookie createCookie(String accessToken) {
        System.out.println(isHttps);
        return ResponseCookie.from("token", accessToken)
                .httpOnly(true)
                .secure(isHttps) // Ensure it's sent over HTTPS
                .path("/")
                .maxAge(7 * 24 * 60 * 60) // 7 days
//                .sameSite("None") // CSRF protection
                .build();
    }
}
