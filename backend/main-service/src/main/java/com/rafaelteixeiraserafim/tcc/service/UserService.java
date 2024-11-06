package com.rafaelteixeiraserafim.tcc.service;

import com.rafaelteixeiraserafim.tcc.enums.UserRole;
import com.rafaelteixeiraserafim.tcc.model.User;
import com.rafaelteixeiraserafim.tcc.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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

    public User getUser(String email, UserRole role) throws IllegalArgumentException {
        Optional<User> optionalUser = userRepository.findByEmailAndRole(email, role);

        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("User with email " + email + " and role " + role + " not found");
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
}
