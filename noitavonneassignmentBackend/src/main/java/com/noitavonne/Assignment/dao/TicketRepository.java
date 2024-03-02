package com.noitavonne.Assignment.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.noitavonne.Assignment.pojo.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
List<Ticket> findByCreated(String name);

}
