package com.example.appwatchshop.repository;

import com.example.appwatchshop.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductDAO extends JpaRepository<Product,Long> {
}
