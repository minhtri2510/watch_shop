package com.example.appwatchshop.controller;

import com.example.appwatchshop.model.User;
import com.example.appwatchshop.repository.IUserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/userManagerment")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private IUserDAO userRepository;

    @GetMapping("/")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Lấy thông tin của một người dùng bằng id
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserByIdUser(@PathVariable Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Tạo một người dùng mới
    @PostMapping("/")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // Cập nhật thông tin của một người dùng
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long idUser, @RequestBody User updatedUser) {
        Optional<User> userOptional = userRepository.findById(idUser);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setUserName(updatedUser.getUserName());
            user.setPassWork(updatedUser.getPassWork());
            user.setAge(updatedUser.getAge());
            userRepository.save(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Xoá một người dùng bằng id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long idUser) {
        Optional<User> userOptional = userRepository.findById(idUser);
        if (userOptional.isPresent()) {
            userRepository.deleteById(idUser);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
