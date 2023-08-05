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
}
