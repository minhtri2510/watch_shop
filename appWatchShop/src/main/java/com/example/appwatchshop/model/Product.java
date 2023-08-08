package com.example.appwatchshop.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProduct;

    @Column(columnDefinition = "NVARCHAR(250)")
    private String productName;
    private Double price;
    private String img;
    private String category;
    private String loaiMay;
    private String kinh;
    @Column(columnDefinition = "NVARCHAR(250)")
    private String kieuDang;
    private String duongKinh;
    private String chatLieuVo;
    private String chatLieuDay;
    private String baoHanh;
    private Integer quantity;

}
