package com.example.appwatchshop.controller;

import com.example.appwatchshop.model.Cart;
import com.example.appwatchshop.model.CartDTO;
import com.example.appwatchshop.model.Product;
import com.example.appwatchshop.model.User;
import com.example.appwatchshop.repository.ICartDAO;
import com.example.appwatchshop.repository.IProductDAO;
import com.example.appwatchshop.repository.IUserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private ICartDAO iCartDAO;

    @Autowired
    private IUserDAO iUserDAO;

    @Autowired
    private IProductDAO iProductDAO;

    @GetMapping("/list/{id}")
    public ResponseEntity<List<Cart>> getAllCart(@PathVariable("id") String id){
        System.out.println(id);
        User user = iUserDAO.findByIdUser(Long.parseLong(id));
        List<Cart> carts =iCartDAO.findAllByUser(user);
        return ResponseEntity.ok(carts);
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> createCart(@RequestBody CartDTO cartImport) {
        System.out.println(cartImport.getProductId());
        Product addedProduct = iProductDAO.findById(cartImport.getProductId()).get();
        User user = iUserDAO.findById( cartImport.getUserId()).get();

        Optional<Cart> cartFind = Optional.ofNullable(iCartDAO.findByUserAndProduct(user, addedProduct));

        Cart cart;
        if (cartFind.isPresent()) {
            cart = cartFind.get();
            cart.setQuantity(cart.getQuantity() + cartImport.getQuantity());
        } else {
            cart = new Cart();
            cart.setUser(user);
            cart.setProduct(addedProduct);
            cart.setQuantity(cartImport.getQuantity());
        }

        iCartDAO.save(cart);
        return ResponseEntity.ok(cart);
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
    public ResponseEntity<Void> deleteCart(@PathVariable("id") String id) {
        Cart cart = iCartDAO.findByIdCart(Long.parseLong(id));
        if (cart == null) {
            System.out.println("Phong " + id);
            return ResponseEntity.notFound().build();
        }
            System.out.println("TRi " + id);
        iCartDAO.delete(cart);
        return ResponseEntity.noContent().build();
    }

}
