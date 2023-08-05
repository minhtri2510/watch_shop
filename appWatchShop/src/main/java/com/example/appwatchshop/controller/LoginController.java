package com.example.appwatchshop.controller;

import com.example.appwatchshop.model.User;
import com.example.appwatchshop.repository.IUserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private IUserDAO userRepository;

    // API xác thực thông tin đăng nhập
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User user1 = userRepository.findByUserName(user.getUserName());
//        System.out.println(user.getPassWork());
        if (user1 == null || !user1.getPassWork().equals(user.getPassWork())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        // Xác thực thành công, có thể thực hiện các tác vụ bổ sung (tạo token, lưu thông tin đăng nhập vào session, v.v.)
        // Trả về thông tin đăng nhập (hoặc token) cho client
        return ResponseEntity.ok("Login successful");
    }

    // Các API CRUD khác (Create, Read, Update, Delete) cho entity User
    // Ví dụ:
//
//    @PostMapping
//    public ResponseEntity<?> createUser(@RequestBody User user) {
//        User user1 = userRepository.findByUserName(user.getUserName());
//        if (user1 == null){
//        User savedUser = userRepository.save(user);
//            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
//        }
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Username already exists");
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<User> getUserById(@PathVariable Long id) {
//        User user = userRepository.findByIdUser(id);
//        if (user == null) {
//            return ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok(user);
//    }

}
