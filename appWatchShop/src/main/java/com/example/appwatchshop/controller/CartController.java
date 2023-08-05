package com.example.appwatchshop.controller;

import com.example.appwatchshop.model.Cart;
import com.example.appwatchshop.repository.ICartDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private ICartDAO iCartDAO;

    @GetMapping("/list/{id}")
    public ResponseEntity<List<Cart>> getAllCart(@PathVariable("id") Long id){
        List<Cart> carts =iCartDAO.findAllByUser(id);
        return ResponseEntity.ok(carts);
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> createCart(@RequestBody Cart cart) {
        Cart createdCart = iCartDAO.save(cart);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCart);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cart> updateCart(@PathVariable Long id, @RequestBody Cart updatedCart) {
        Cart cart = iCartDAO.findById(id).orElse(null);
        if (cart == null) {
            return ResponseEntity.notFound().build();
        }

        cart.setProduct(updatedCart.getProduct());
        cart.setUser(updatedCart.getUser());
        cart.setQuantity(updatedCart.getQuantity());
        // Cập nhật các trường thông tin khác của Cart (nếu có)

        Cart savedCart = iCartDAO.save(cart);
        return ResponseEntity.ok(savedCart);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCart(@PathVariable Long id) {
        Cart cart = iCartDAO.findById(id).orElse(null);
        if (cart == null) {
            return ResponseEntity.notFound().build();
        }

        iCartDAO.delete(cart);
        return ResponseEntity.noContent().build();
    }

}
