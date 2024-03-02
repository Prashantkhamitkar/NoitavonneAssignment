package com.noitavonne.Assignment.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.noitavonne.Assignment.dao.UserDao;
import com.noitavonne.Assignment.pojo.Role;
import com.noitavonne.Assignment.pojo.Users;

@Service
public class UserService {

	@Autowired
	private UserDao dao;
	public Users findByEmailAndPassword(String email,String password) {
	return dao.findByEmailAndPassword(email,password);	
	}
	
	public String registerUser(Users user) {
		user.setRole(Role.USER);
		Users users=dao.save(user);
		
		if(users!=null)
			return "Success";
		return "Failed";
	}
	public Users getUserByname(String name) {
		Users u=dao.findByEmail(name);
		if(u!=null)
			return u;
		return null;
	}
	
}
