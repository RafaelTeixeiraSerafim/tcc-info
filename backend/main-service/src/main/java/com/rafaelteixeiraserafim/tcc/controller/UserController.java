package com.rafaelteixeiraserafim.tcc.controller;

import com.rafaelteixeiraserafim.tcc.dto.ChangePasswordRequest;
import com.rafaelteixeiraserafim.tcc.dto.UserResponse;
import com.rafaelteixeiraserafim.tcc.model.User;
import com.rafaelteixeiraserafim.tcc.service.UserService;
import com.rafaelteixeiraserafim.tcc.utils.ModelDtoConversion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/clients")
    public List<UserResponse> getClients() {
        List<User> clients =  userService.getClients();

        return ModelDtoConversion.createUserResponses(clients);
    }

    @GetMapping("/admins")
    public List<UserResponse> getAdmins() {
        List<User> admins = userService.getAdmins();

        return ModelDtoConversion.createUserResponses(admins);
    }

    @PatchMapping("/{userId}/password")
    public ResponseEntity<?> changePassword(@PathVariable Long userId, @RequestBody ChangePasswordRequest changePasswordRequest) {
        userService.changePassword(userId, changePasswordRequest.curPassword(), changePasswordRequest.newPassword());

        return ResponseEntity.ok("Password changed successfully");
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);

        return ResponseEntity.noContent().build();
    }
}
