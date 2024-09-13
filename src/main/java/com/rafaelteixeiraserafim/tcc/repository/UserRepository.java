package com.rafaelteixeiraserafim.tcc.repository;

import com.rafaelteixeiraserafim.tcc.enums.UserRole;
import com.rafaelteixeiraserafim.tcc.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email); // TODO - change to optional
    List<User> findByRole(UserRole role);
}
