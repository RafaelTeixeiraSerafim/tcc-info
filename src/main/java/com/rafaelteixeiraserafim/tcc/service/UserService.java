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
    @Autowired
    private UserRepository userRepository;

//    public List<User> getUsers() {
//        return userRepository.findAll();
//    }

    public List<User> getClients() {
        return userRepository.findByRole(UserRole.USER);
    }

    public List<User> getAdmins() {
        return userRepository.findByRole(UserRole.ADMIN);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User getUserById(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("User with id " + userId + " not found");
        }

        return optionalUser.get();
    }
}
