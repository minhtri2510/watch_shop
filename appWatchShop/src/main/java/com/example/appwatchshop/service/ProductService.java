package com.example.appwatchshop.service;

import com.example.appwatchshop.model.Product;
import com.example.appwatchshop.repository.IProductDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ProductService implements IProductService{

    @Autowired
    private IProductDAO iProductDAO;

    @Override
    public Product saveProduct(Product product) {
        return iProductDAO.save(product);
    }

    @Override
    public List<Product> fetchProducttList() {
        return iProductDAO.findAll();
    }

    @Override
    public Product updateProduct(Product product, Long productId) {
        Product prodDB = iProductDAO.findById(productId).get();

        if (Objects.nonNull(product.getProductName()) && !"".equalsIgnoreCase(product.getProductName())) {
            prodDB.setProductName(product.getProductName());
        }

        if (Objects.nonNull(product.getBaoHanh()) && !"".equalsIgnoreCase(product.getBaoHanh())) {
            prodDB.setBaoHanh(product.getBaoHanh());
        }

        if (Objects.nonNull(product.getCategory()) && !"".equalsIgnoreCase(product.getCategory())) {
            prodDB.setCategory(product.getCategory());
        }

        if (Objects.nonNull(product.getChatLieuDay()) && !"".equalsIgnoreCase(product.getChatLieuDay())) {
            prodDB.setChatLieuVo(product.getChatLieuDay());
        }

        if (Objects.nonNull(product.getChatLieuVo()) && !"".equalsIgnoreCase(product.getChatLieuVo())) {
            prodDB.setChatLieuVo(product.getChatLieuVo());
        }

        if (Objects.nonNull(product.getDuongKinh()) && !"".equalsIgnoreCase(product.getDuongKinh())) {
            prodDB.setDuongKinh(product.getDuongKinh());
        }

        if (Objects.nonNull(product.getImg()) && !"".equalsIgnoreCase(product.getImg())) {
            prodDB.setImg(product.getImg());
        }

        if (Objects.nonNull(product.getKieuDang()) && !"".equalsIgnoreCase(product.getKieuDang())) {
            prodDB.setKieuDang(product.getKieuDang());
        }

        if (Objects.nonNull(product.getKinh()) && !"".equalsIgnoreCase(product.getKinh())) {
            prodDB.setKinh(product.getKinh());
        }

        if (Objects.nonNull(product.getPrice())) {
            prodDB.setPrice(product.getPrice());
        }

        if (Objects.nonNull(product.getQuantity())) {
            prodDB.setQuantity(product.getQuantity());
        }

        if (Objects.nonNull(product.getLoaiMay()) && !"".equalsIgnoreCase(product.getLoaiMay())) {
            prodDB.setLoaiMay(product.getLoaiMay());
        }

        return iProductDAO.save(prodDB);
    }

    @Override
    public void deleteProductById(Long productId) {
        iProductDAO.deleteById(productId);
    }

    @Override
    public Optional<Product> findById(Long id) {
        return iProductDAO.findById(id);
    }

    @Override
    public Product save(Product product) {
        return iProductDAO.save(product);
    }
}
