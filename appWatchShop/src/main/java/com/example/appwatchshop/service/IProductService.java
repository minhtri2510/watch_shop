package com.example.appwatchshop.service;

import com.example.appwatchshop.model.Product;

import java.util.List;
import java.util.Optional;

public interface IProductService {
    Product saveProduct(Product product);

    // read operation
    List<Product> fetchProducttList();

    // update operation
    Product updateProduct(Product product, Long productId);

    // delete operation
    void deleteProductById(Long productId);

    Optional<Product> findById(Long id);

    Product save(Product product);
}
