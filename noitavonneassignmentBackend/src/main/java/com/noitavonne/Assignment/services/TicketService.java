package com.noitavonne.Assignment.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.noitavonne.Assignment.dao.TicketRepository;
import com.noitavonne.Assignment.pojo.Ticket;
import com.noitavonne.Assignment.pojo.TicketEnum;

@Service
public class TicketService {

	@Autowired
	private TicketRepository ticketrepo;
	
	public List<Ticket> getAllTickets() {
        return ticketrepo.findAll();
    }
	public Ticket createTicket(Ticket ticket){
		
		ticket.setStatus(TicketEnum.OPEN);
        return ticketrepo.save(ticket);
    }
	public List<Ticket> getByuser(String name){
		return ticketrepo.findByCreated(name);
	}
	
	 public Ticket updateTicket(Long ticketId, Ticket updatedTicket) {
	        Ticket existingTicket = ticketrepo.findById(ticketId).orElse(null);
	        if (existingTicket != null) {
	            // Update ticket properties
	            existingTicket.setTitle(updatedTicket.getTitle());
	            existingTicket.setDescription(updatedTicket.getDescription());
	            existingTicket.setStatus(updatedTicket.getStatus());
	            // Update other properties as needed
	            return ticketrepo.save(existingTicket);
	        }
	        return null;
	    }
	 public String closeticket(Long id) {
		 Ticket ticket=ticketrepo.findById(id).get();
		 if(ticket!=null) {
		 ticket.setStatus(TicketEnum.CLOSED);
		 ticketrepo.save(ticket);
		 return "success";
		 }
		 return "Failed";
	 }
}
