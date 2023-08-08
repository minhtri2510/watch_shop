package com.example.appwatchshop.repository;

import com.example.appwatchshop.model.Cart;
import com.example.appwatchshop.model.Product;
import com.example.appwatchshop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICartDAO extends JpaRepository<Cart,Long> {
    List<Cart> findAllByUser(User user);

    Cart findByIdCart(Long id);
    Cart findByUserAndProduct(User user, Product product);
}
