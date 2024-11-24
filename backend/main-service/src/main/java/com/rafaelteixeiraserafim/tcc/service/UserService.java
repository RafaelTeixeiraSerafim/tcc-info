package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.enums.UserRole;
import com.rafaelteixeiraserafim.tcc.model.User;
import com.rafaelteixeiraserafim.tcc.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getClients() {
        return userRepository.findByRole(UserRole.CLIENT);
    }

    public List<User> getAdmins() {
        return userRepository.findByRole(UserRole.ADMIN);
    }

    public User getUser(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("User with email " + email + " not found");
        }

        return optionalUser.get();
    }

    public User getUser(String email, UserRole role) throws BadCredentialsException {
        Optional<User> optionalUser = userRepository.findByEmailAndRole(email, role);

        if (optionalUser.isEmpty()) {
            throw new BadCredentialsException("User with email " + email + " and role " + role + " not found");
        }

        return optionalUser.get();
    }

    public User getUser(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("User with id " + userId + " not found");
        }

        return optionalUser.get();
    }

    @Transactional
    public User disableUser(Long userId) {
        User user = this.getUser(userId);
        user.setEnabled(false);
        return userRepository.save(user);
    }

    @Transactional
    public void disableUsers(List<Long> ids) {
        for (Long id : ids) {
            disableUser(id);
        }
    }

    public void deleteAdmins(List<Long> ids) {
        if (ids.size() == this.getAdmins().size()) {
            throw new IllegalArgumentException("All admins cannot be deleted at once. At least one admin needs to exist");
        }

        userRepository.deleteAllById(ids);
    }

    @Transactional
    public User enableUser(Long userId) {
        User user = this.getUser(userId);
        user.setEnabled(true);
        return userRepository.save(user);
    }

    @Transactional
    public void enableUsers(List<Long> ids) {
        for (Long id : ids) {
            enableUser(id);
        }
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    @Transactional
    public void changePassword(Long userId, String curPassword, String newPassword) {
        User user = this.getUser(userId);
        if (passwordEncoder.matches(curPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newPassword));
        } else {
            throw new IllegalArgumentException("Invalid password");
        }

        userRepository.save(user);
    }
}
