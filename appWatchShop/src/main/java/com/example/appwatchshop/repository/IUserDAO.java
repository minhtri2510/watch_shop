package com.example.appwatchshop.repository;

import com.example.appwatchshop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserDAO extends JpaRepository<User,Long> {
    User findByUserName(String userName);
    User findByIdUser(Long id);
}
