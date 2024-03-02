package com.noitavonne.Assignment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noitavonne.Assignment.pojo.Login;
import com.noitavonne.Assignment.pojo.Users;
import com.noitavonne.Assignment.services.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {
	@Autowired
    private UserService userService;

    @PostMapping("/signin")
    public Users getUser(@RequestBody Login data) {
        return userService.findByEmailAndPassword(data.getEmail(),data.getPassword());
    }
    @PostMapping("/signup")
    public String registernewuser(@RequestBody Users user) {
    	return userService.registerUser(user);
    }
    @GetMapping("/user/{name}")
    public Users getUser(@PathVariable String name) {
    	System.out.println(name);
    	return userService.getUserByname(name);
    }
}

