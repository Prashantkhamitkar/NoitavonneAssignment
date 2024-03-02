package com.noitavonne.Assignment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noitavonne.Assignment.pojo.Ticket;
import com.noitavonne.Assignment.services.TicketService;

@RestController
@RequestMapping("/api/ticket")
@CrossOrigin("*")
public class TicketController {

	@Autowired
	private TicketService services;
	@PostMapping("/create")
	public Ticket createnew(@RequestBody Ticket ticket) {
		return services.createTicket(ticket);
	}
	@GetMapping("/user/{name}")
	public List<Ticket> getByuser(@PathVariable String name){
		System.out.println(name);
		return services.getByuser(name);
	}
	@DeleteMapping("/close/{id}")
	public String Closeticket(@PathVariable Long id) {
		return services.closeticket(id);
	}
	@GetMapping("/alltickets")
	public List<Ticket> getAllTickets()
	{
		return services.getAllTickets();
	}
}
