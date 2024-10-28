package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.dto.ImageDto;
import com.rafaelteixeiraserafim.tcc.dto.SignUpDto;
import com.rafaelteixeiraserafim.tcc.dto.UpdateUserDto;
import com.rafaelteixeiraserafim.tcc.enums.ImageCategory;
import com.rafaelteixeiraserafim.tcc.enums.UserRole;
import com.rafaelteixeiraserafim.tcc.model.User;
import com.rafaelteixeiraserafim.tcc.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.Optional;

@Service
public class AuthService implements UserDetailsService {
    private final UserRepository userRepository;
    private final UserService userService;
    private final S3Service s3Service;

    @Value("${is_https}")
    private boolean isHttps;

    @Autowired
    public AuthService(UserRepository userRepository, UserService userService, S3Service s3Service) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.s3Service = s3Service;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
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

    @Transactional
    public User updateUser(@Valid UpdateUserDto updateUserDto) {
        String contextEmail = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println(contextEmail);
        User user = userService.getUserByEmail(contextEmail);

        System.out.println(updateUserDto.getEmail());
        Optional<User> existingUser = userRepository.findByEmail(updateUserDto.getEmail());

        if (existingUser.isEmpty()) {
            user.setEmail(updateUserDto.getEmail());
        } else if (!existingUser.get().getEmail().equals(user.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already in use");
        }

        user.setUsername(updateUserDto.getUsername());

        ImageDto profilePic = updateUserDto.getProfilePic();

        if (profilePic == null) return user;

        String imageUrl = profilePic.getUrl();
        MultipartFile imageFile = profilePic.getFile();

        Instant currentTimestamp = Instant.now();
        if (imageUrl == null && imageFile != null) {
            s3Service.uploadNewFile(currentTimestamp, user.getUsername(), imageFile, ImageCategory.USER);
            user.setProfilePic(s3Service.getImageUrl(currentTimestamp, user.getUsername(), ImageCategory.USER));
        } else if (imageUrl != null && imageUrl.isEmpty() && imageFile == null) {
            s3Service.deleteFile(s3Service.getImageKeyFromUrl(user.getProfilePic()));
            user.setProfilePic(null);
        } else if (imageUrl != null && !imageUrl.isEmpty() && imageFile != null) {
            String key = s3Service.getImageKeyFromUrl(imageUrl);
            s3Service.deleteFile(key);
            s3Service.uploadNewFile(key, imageFile);
            user.setProfilePic(s3Service.getImageUrl(key));
        }

        return user;
    }
}
