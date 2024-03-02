package com.noitavonne.Assignment.pojo;


import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Entity
@Table(name="Users")
public class Users {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
private String fullName;
private String email;
private String mobile;
private String password;
@Enumerated(EnumType.STRING)
private Role role;
}
