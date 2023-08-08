package com.example.appwatchshop.controller;

import com.example.appwatchshop.model.Product;
import com.example.appwatchshop.repository.IProductDAO;
import com.example.appwatchshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping({"/api/product"})
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired IProductDAO iProductDAO;


    @GetMapping("/list")
    public ResponseEntity<List<Product>> getProduct(){
        List<Product> list = productService.fetchProducttList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@ModelAttribute Product product , @RequestParam("imgFile") MultipartFile imgFile ) throws IOException {
        System.out.println(imgFile);
        if (!imgFile.isEmpty()) {
            byte[] bytes = imgFile.getBytes();
            Path path = Paths.get("src/main/resources/" + imgFile.getOriginalFilename());
            Files.write(path, bytes);
            product.setImg(imgFile.getOriginalFilename());
        }

        Product savedProduct = iProductDAO.save(product);
        return ResponseEntity.ok(savedProduct);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<Product> updateProduct( @ModelAttribute Product product,@PathVariable Long id,
                                                  @RequestParam(value = "imageFile", required = false) MultipartFile imageFile) throws IOException {
        System.out.println(imageFile);
        Product existingProduct = iProductDAO.findByIdProduct(id);
        if (!(existingProduct == null)) {
            Product existingProductData = existingProduct;
            existingProductData.setProductName(product.getProductName());
            existingProductData.setPrice(product.getPrice());
            existingProductData.setCategory(product.getCategory());
            existingProductData.setBaoHanh(product.getBaoHanh());
            existingProductData.setChatLieuVo(product.getChatLieuVo());
            existingProductData.setDuongKinh(product.getDuongKinh());
            existingProductData.setKieuDang(product.getKieuDang());
            existingProductData.setLoaiMay(product.getLoaiMay());
            existingProductData.setChatLieuDay(product.getChatLieuDay());
            existingProductData.setKinh(product.getKinh());
            existingProductData.setQuantity(product.getQuantity());

            // Xử lý cập nhật ảnh mới nếu có
            if (imageFile != null && !imageFile.isEmpty()) {
                byte[] bytes = imageFile.getBytes();
                Path path = Paths.get("src/main/resources/" + imageFile.getOriginalFilename());
                Files.write(path, bytes);
                existingProductData.setImg(imageFile.getOriginalFilename());
            }

            Product updatedProduct = iProductDAO.save(existingProductData);
            System.out.println(updatedProduct.getImg());
            return ResponseEntity.ok(updatedProduct);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(path = "/get-image/{imageName}")
    public ResponseEntity<ByteArrayResource> getImage(@PathVariable("imageName") String imageName) {
        if (imageName != null || "".equals(imageName)) {
            Path fileName = Paths.get("src/main/resources", imageName);
            try {
                byte[] buffer = Files.readAllBytes(fileName);
                ByteArrayResource bytes = new ByteArrayResource(buffer);
                return ResponseEntity.ok().contentLength(buffer.length)
                        .contentType(MediaType.parseMediaType("image/png")).body(bytes);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping(path = "/getProduct/{id}")
    public ResponseEntity<?> getProductById(@PathVariable("id") Long id){
        Product product = iProductDAO.findByIdProduct(id);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<?> deleteProductById(@PathVariable("id") Long id){
        iProductDAO.deleteById(id);
        return ResponseEntity.ok("delete success");
    }
}
