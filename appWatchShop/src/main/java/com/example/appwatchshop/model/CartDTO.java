package com.example.appwatchshop.model;

import lombok.Data;

@Data
public class CartDTO {
    private Long cartId;
    private Long userId;
    private Long productId;
    private Long quantity;
}
