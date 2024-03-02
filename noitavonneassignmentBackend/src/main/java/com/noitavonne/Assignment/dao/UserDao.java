package com.noitavonne.Assignment.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.noitavonne.Assignment.pojo.Users;

public interface UserDao extends JpaRepository<Users, Long>{
Users findByEmailAndPassword(String email,String Password);
Users findByEmail(String name);
}
